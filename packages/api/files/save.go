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

	err = SaveFilePorcelain(c.Request.Context(), userId, req.ProjectId, req.FileName, req.Contents)

	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}

func SaveFilePorcelain(ctx context.Context, user, project, fileName, content string) error {
	path := calculateFilePath(user, project, fileName)
	bucket := env.GetFileBucket()
	_, err := GetS3Client().PutObject(ctx, &s3.PutObjectInput{
		Bucket: &bucket,
		Key:    &path,
		Body:   strings.NewReader(content),
	})

	return err
}
