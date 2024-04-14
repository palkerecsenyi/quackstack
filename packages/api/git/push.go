package git

import (
	"fmt"
	"io"
	"net/http"
	"path"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	gh "github.com/google/go-github/github"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/files"
	"quackstack.palk.me/api/v2/github"
)

type PushRepoRequest struct {
	Owner string `json:"owner"`
	Repo  string `json:"repo"`
}

func PushRepo(c *gin.Context) {
	var req PushRepoRequest
	err := c.ShouldBind(&req)
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	fileKeys, err := files.ListProjectFilesPorcelain(c.Request.Context(), req.Owner, req.Repo)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	s3Client := files.GetS3Client()
	ghClient := github.GetGitHubClient(c)
	if ghClient == nil {
		c.String(http.StatusInternalServerError, "gh client was null")
		return
	}
	bucket := env.GetFileBucket()

	for _, fileKey := range fileKeys {
		if path.Ext(fileKey) == "sha" {
			continue
		}

		resp, err := s3Client.GetObject(c.Request.Context(), &s3.GetObjectInput{
			Bucket: &bucket,
			Key:    &fileKey,
		})

		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("read file from s3: %s", err))
			return
		}
		fullContents, err := io.ReadAll(resp.Body)
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("read file contents from io: %s", err))
			return
		}

		shaString := resp.Metadata["sha"]
		fileName := path.Base(fileKey)
		commitMessage := "Quack"
		updateResp, _, err := ghClient.Repositories.UpdateFile(c.Request.Context(), req.Owner, req.Repo, path.Join(".github", "workflows", fileName), &gh.RepositoryContentFileOptions{
			Content: fullContents,
			SHA:     &shaString,
			Message: &commitMessage,
		})

		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("update file in github: %s", err))
			return
		}

		err = files.UpdateSHA(c.Request.Context(), req.Owner, req.Repo, fileName, *updateResp.SHA)
		if err != nil {
			c.String(http.StatusInternalServerError, fmt.Sprintf("update file sha in s3: %s", err))
			return
		}
	}
}
