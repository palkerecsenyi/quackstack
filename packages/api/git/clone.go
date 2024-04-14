package git

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	gh "github.com/google/go-github/github"
	"quackstack.palk.me/api/v2/files"
	"quackstack.palk.me/api/v2/github"
)

type CloneRepoRequest struct {
	Owner string `json:"owner"`
	Repo  string `json:"repo"`
}

func CloneRepo(c *gin.Context) {
	var req CloneRepoRequest
	err := c.ShouldBind(&req)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}
	ghClient := github.GetGitHubClient(c)
	if ghClient == nil {
		c.String(http.StatusBadRequest, "no gh client")
		return
	}

	err = CloneRepoPorcelain(c.Request.Context(), ghClient, req.Owner, req.Repo)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
	}

	c.Status(http.StatusNoContent)
}

func CloneRepoPorcelain(ctx context.Context, ghClient *gh.Client, owner, repo string) error {
	_, dir, _, err := ghClient.Repositories.GetContents(ctx, owner, repo, ".github/workflows", &gh.RepositoryContentGetOptions{})
	if err != nil {
		return err
	}

	for _, file := range dir {
		fileDetail, _, _, err := ghClient.Repositories.GetContents(ctx, owner, repo, *file.Path, &gh.RepositoryContentGetOptions{})
		if err != nil {
			return err
		}

		content, err := fileDetail.GetContent()
		if err != nil {
			return err
		}

		fileName := *file.Name
		err = files.SaveFilePorcelain(ctx, owner, repo, fileName, content, *file.SHA)
		if err != nil {
			return err
		}
	}

	return nil
}
