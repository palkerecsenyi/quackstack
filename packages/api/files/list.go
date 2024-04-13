package files

import (
	"net/http"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-gonic/gin"
	"quackstack.palk.me/api/v2/env"
	"quackstack.palk.me/api/v2/github"
)

func ListProjectFiles(c *gin.Context) {
	userId, err := github.GetUserId(c)
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	projectId := c.Query("projectId")
	if projectId == "" {
		c.String(http.StatusBadRequest, "no project ID provided")
		return
	}

	client := GetS3Client()
	prefix := calculateFilePath(userId, projectId, "")
	bucket := env.GetFileBucket()
	resp, err := client.ListObjectsV2(c.Request.Context(), &s3.ListObjectsV2Input{
		Bucket: &bucket,
		Prefix: &prefix,
	})
	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	fileKeys := []string{}
	for _, obj := range resp.Contents {
		fileKeys = append(fileKeys, *obj.Key)
	}

	c.JSON(http.StatusOK, fileKeys)
}
