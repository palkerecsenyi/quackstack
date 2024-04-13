package files

import (
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/github"
)

type SaveFileRequest struct {
	ProjectId string
}

func SaveFile(c *gin.Context) {
	userId := github.GetUserId(c)
	
}
