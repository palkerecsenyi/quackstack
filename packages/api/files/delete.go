package files

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"quackstack.palk.me/api/v2/env"
)

func DeleteRepo(ctx context.Context, owner, repo string) error {
	keys, err := ListProjectFilesPorcelain(ctx, owner, repo)
	if err != nil {
		return err
	}

	client := GetS3Client()
	bucket := env.GetFileBucket()
	for _, key := range keys {
		_, err = client.DeleteObject(ctx, &s3.DeleteObjectInput{
			Bucket: &bucket,
			Key: &key,
		})

		if err != nil {
			return err
		}
	}

	return nil
}
