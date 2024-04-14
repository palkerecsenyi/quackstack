package files

import (
	"io"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/github"
)

func GetFileContents(c *gin.Context) {
	userId, err := github.GetUserId(c)
	if err != nil {
		c.String(http.StatusUnauthorized, err.Error())
		return
	}

	projectId := c.Query("projectId")
	fileName := c.Query("fileName")

	if projectId == "" || fileName == "" {
		c.String(http.StatusBadRequest, "no projectId or fileName")
		return
	}

	fullBody, err := GetFileContentsPorcelain(c.Request.Context(), userId, projectId, fileName)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	c.String(http.StatusOK, string(fullBody))
}

func GetFileContentsPorcelain(ctx context.Context, userId, projectId, fileName string) (string, error) {
	client := GetS3Client()
	bucket := env.GetFileBucket()
	key := calculateFilePath(userId, projectId, fileName)
	resp, err := client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: &bucket,
		Key:    &key,
	})

	if err != nil {
		return "", err
	}

	fullBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(fullBody), nil
}
