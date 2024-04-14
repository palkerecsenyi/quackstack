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
		return "", fmt.Errorf("no token provided")
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

func IsSignedIn(c *gin.Context) {
	x, err := GetUserId(c)
	if err != nil {
		c.JSON(http.StatusOK, false)
		return
	}

	fmt.Println(x)

	c.JSON(http.StatusOK, true)
}
