package github

import (
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"quackstack.palk.me/api/v2/env"
)

func getRedirectURL() string {
	return os.Getenv("QUACK_GITHUB_REDIRECT")
}

func generateState() string {
	return uuid.Must(uuid.NewRandom()).String()
}

func StartAuthFlow(c *gin.Context) {
	u, err := url.Parse("https://github.com/login/oauth/authorize")
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	u.Query().Add("client_id", os.Getenv("QUACK_GITHUB_CLIENT"))
	u.Query().Add("redirect_uri", getRedirectURL())

	state := generateState()
	u.Query().Add("state", state)
	c.SetCookie("gh_state", state, 5 * 60, "/", env.GetClientOrigin(), false, true)

	c.Redirect(http.StatusTemporaryRedirect, u.String())
}
