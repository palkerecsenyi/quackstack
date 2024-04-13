package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/github"
)

func main() {
	fmt.Println("Launching...")

	r := gin.Default()
	r.GET("/auth/start", github.StartAuthFlow)
	r.GET("/auth/callback", github.AuthCallback)
	//r.GET("/test", func(c *gin.Context) {
	//	github.Getrepos()
	//})
	r.Run()

}
