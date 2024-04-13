package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/github"
)

func main() {
	fmt.Println("Launching...")

	r := gin.Default()
	r.GET("/auth/start", github.StartAuthFlow)
	r.Run()
}
