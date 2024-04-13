package github

import (
	"context"
	"fmt"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// Define a struct to hold the repository details you want to return
type RepositoryInfo struct {
	FullName string
}

func GetRepos(token string) {
	// get github

	// Setup the OAuth2 configuration
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)

	// Create a new GitHub client with the OAuth2 client
	client := github.NewClient(tc)

	// Fetch all repositories for the authenticated user
	repos, _, err := client.Repositories.List(ctx, "", nil)
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

	// Print the repositories
	for _, repo := range myRepos {
		fmt.Printf("\nFull Name: %s",
			repo.FullName)
	}
}
