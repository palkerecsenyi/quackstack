package files

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/github"
)

func ListProjectFiles(c *gin.Context) {
	projectId := c.Query("projectId")
	userId := github.GetUserId(c)
	if projectId == "" {
		c.String(http.StatusBadRequest, "no project ID provided")
		return
	}
	if userId == "" {
		return
	}


}
