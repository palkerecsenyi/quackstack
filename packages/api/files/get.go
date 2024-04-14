package files

import (
	"fmt"
	"io"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
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

	client := GetS3Client()
	bucket := env.GetFileBucket()
	key := calculateFilePath(userId, projectId, fileName)
	resp, err := client.GetObject(c.Request.Context(), &s3.GetObjectInput{
		Bucket: &bucket,
		Key:    &key,
	})

	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}

	fullBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.String(http.StatusInternalServerError, fmt.Sprintf("reading body: %s", err))
		return
	}

	c.String(http.StatusOK, string(fullBody))
}
