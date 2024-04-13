package github

import "github.com/gin-gonic/gin"

func GetUserId(c *gin.Context) string {
	// TODO: read GitHub auth cookie, return what the user's GitHub user ID is
	return "palpal"
}
