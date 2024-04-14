package main

import (
	"context"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/chatbot"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/files"
	"quackstack.palk.me/api/v2/git"
	"quackstack.palk.me/api/v2/github"
)

func main() {
	fmt.Println("Launching...")
	files.InitS3Client(context.Background())

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{env.GetClientOrigin()},
		AllowCredentials: true,
		AllowMethods:     []string{"GET", "POST", "PUT", "OPTIONS"},
		AllowHeaders:     []string{"Cookie"},
	}))

	r.GET("/auth/start", github.StartAuthFlow)
	r.GET("/auth/callback", github.AuthCallback)
	r.GET("/auth/check", github.IsSignedIn)
	r.PUT("/files/save", files.SaveFile)
	r.GET("/files", files.ListProjectFiles)
	r.GET("/file", files.GetFileContents)

	r.GET("/git/repos", github.GetRepos)
	r.POST("/git/clone", git.CloneRepo)
	r.POST("/git/push", git.PushRepo)

	r.POST("/chat", chatbot.ChatRoute)

	r.Run()

}
