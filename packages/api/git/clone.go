package git

import (
	"fmt"
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

	_, dir, _, err := ghClient.Repositories.GetContents(c.Request.Context(), req.Owner, req.Repo, ".github/workflows", &gh.RepositoryContentGetOptions{})
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	for _, file := range dir {
		fileDetail, _, _, err := ghClient.Repositories.GetContents(c.Request.Context(), req.Owner, req.Repo, *file.Path, &gh.RepositoryContentGetOptions{})
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("download file: %s", err))
			return
		}

		content, err := fileDetail.GetContent()
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("decode file: %s", err))
			return
		}

		err = files.SaveFilePorcelain(c.Request.Context(), req.Owner, req.Repo, *file.Name, content)
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("save file: %s", err))
			return
		}
	}
}
