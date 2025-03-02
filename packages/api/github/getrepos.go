package github

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Define a struct to hold the repository details you want to return
type RepositoryInfo struct {
	FullName string `json:"name"`
}

func GetRepos(c *gin.Context) {
	client := GetGitHubClient(c)
	if client == nil {
		c.String(http.StatusBadRequest, "client not initialised")
		return
	}

	// Fetch all repositories for the authenticated user
	repos, _, err := client.Repositories.List(c.Request.Context(), "", nil)
	if err != nil {
		fmt.Printf("Error fetching repositories: %s\n", err)
		return
	}

	// Convert fetched repos to your custom struct
	var myRepos []RepositoryInfo
	for _, repo := range repos {
		myRepos = append(myRepos, RepositoryInfo{
			FullName: *repo.FullName,
		})
	}

	c.JSON(http.StatusOK, myRepos)
}
