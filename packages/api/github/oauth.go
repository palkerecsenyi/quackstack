package github

import (
	"errors"
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/go-resty/resty/v2"
	"github.com/google/uuid"
	"quackstack.palk.me/api/v2/env"
)

func generateState() string {
	return uuid.Must(uuid.NewRandom()).String()
}

func StartAuthFlow(c *gin.Context) {
	u, err := url.Parse("https://github.com/login/oauth/authorize")
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	q := u.Query()
	q.Add("client_id", os.Getenv("QUACK_GITHUB_CLIENT"))
	q.Add("redirect_uri", env.GetGitHubRedirect())
	q.Add("scope", "user,contents:read")

	state := generateState()
	q.Add("state", state)
	c.SetCookie("gh_state", state, 5*60, "/", env.GetClientOrigin(), false, true)

	u.RawQuery = q.Encode()
	c.Redirect(http.StatusTemporaryRedirect, u.String())
}

func AuthCallback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state")

	cookieState, err := c.Cookie("gh_state")
	if err != nil {
		if errors.Is(err, http.ErrNoCookie) {
			c.String(http.StatusBadRequest, "missing state cookie")
		} else {
			c.String(http.StatusInternalServerError, err.Error())
		}
		return
	}

	if cookieState != state {
		c.String(http.StatusBadRequest, "state cookie incorrect")
		return
	}

	resp, err := resty.New().R().SetFormData(map[string]string{
		"client_id":     env.GetClientID(),
		"client_secret": env.GetClientSecret(),
		"code":          code,
		"redirect_url":  env.GetGitHubRedirect(),
	}).Post("https://github.com/login/oauth/access_token")
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	if resp.IsError() {
		c.String(http.StatusBadRequest, resp.String())
		return
	}

	q, err := url.ParseQuery(resp.String())
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	accessToken := q.Get("access_token")
	c.SetCookie("gh_token", accessToken, 1*60*60, "/", env.GetClientDomain(), false, true)
	c.Redirect(http.StatusTemporaryRedirect, env.GetClientOrigin())
}
