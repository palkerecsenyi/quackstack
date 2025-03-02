package files

import (
	"context"
	"net/http"
	"strings"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/github"
)

type SaveFileRequest struct {
	ProjectId string `json:"project_id"`
	FileName  string `json:"file_name"`
	Contents  string `json:"contents"`
}

func SaveFile(c *gin.Context) {
	userId, err := github.GetUserId(c)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	var req SaveFileRequest
	c.ShouldBind(&req)

	client := GetS3Client()
	bucket := env.GetFileBucket()
	key := calculateFilePath(userId, req.ProjectId, req.FileName)
	attr, err := client.GetObject(c.Request.Context(), &s3.GetObjectInput{
		Bucket: &bucket,
		Key:    &key,
	})
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	err = SaveFilePorcelain(c.Request.Context(), userId, req.ProjectId, req.FileName, req.Contents, attr.Metadata["sha"])

	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}

func SaveFilePorcelain(ctx context.Context, user, project, fileName, content, sha string) error {
	path := calculateFilePath(user, project, fileName)
	bucket := env.GetFileBucket()

	input := s3.PutObjectInput{
		Bucket: &bucket,
		Key:    &path,
		Body:   strings.NewReader(content),
	}

	if sha != "" {
		input.Metadata = map[string]string{
			"sha": sha,
		}
	}

	_, err := GetS3Client().PutObject(ctx, &input)

	return err
}
