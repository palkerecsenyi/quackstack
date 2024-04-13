package main

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/chatbot"
	"quackstack.palk.me/api/v2/files"
	"quackstack.palk.me/api/v2/git"
	"quackstack.palk.me/api/v2/github"
)

func main() {
	fmt.Println("Launching...")
	files.InitS3Client(context.Background())

	r := gin.Default()
	r.GET("/auth/start", github.StartAuthFlow)
	r.GET("/auth/callback", github.AuthCallback)
	r.GET("/test", func(c *gin.Context) {
		chatbot.CallPythonScript("What's wrong with my code?", "def mlit(); print(hello)")
	})
	r.PUT("/files/save", files.SaveFile)
	r.GET("/files", files.ListProjectFiles)

	r.POST("/git/clone", git.CloneRepo)
	r.POST("/git/push", git.PushRepo)

	r.Run()

}
