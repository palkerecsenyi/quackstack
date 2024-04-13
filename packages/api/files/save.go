package files

import (
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
	userId := github.GetUserId(c)
	var req SaveFileRequest
	c.ShouldBind(&req)

	path := calculateFilePath(userId, req.ProjectId, req.FileName)
	bucket := env.GetFileBucket()
	_, err := GetS3Client().PutObject(c.Request.Context(), &s3.PutObjectInput{
		Bucket: &bucket,
		Key: &path,
		Body: strings.NewReader(req.Contents),
	})

	if err != nil {
		c.String(http.StatusBadRequest, err.Error())
		return
	}

	c.Status(http.StatusNoContent)
}
