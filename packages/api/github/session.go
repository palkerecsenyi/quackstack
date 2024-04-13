package github

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/go-github/github"
)

func GetUserId(c *gin.Context) (string, error) {
	client := GetGitHubClient(c)
	if client == nil {
		return "", nil
	}

	user, _, err := client.Users.Get(c.Request.Context(), "")
	if err != nil {
		return "", err
	}
	return *user.Login, nil
}

func GetGitHubClient(c *gin.Context) *github.Client {
	accessToken := getAccessToken(c)
	if accessToken == "" {
		return nil
	}
	return GetClientForToken(c.Request.Context(), accessToken)
}

func getAccessToken(c *gin.Context) string {
	cookie, err := c.Cookie("gh_token")
	if errors.Is(err, http.ErrNoCookie) {
		return ""
	}
	if err != nil {
		panic(fmt.Sprintf("failed to get access token: %s", err))
	}

	return cookie
}
