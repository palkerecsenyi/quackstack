package files

import (
	"context"
	"path"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"quackstack.palk.me/api/v2/env"
)

func UpdateSHA(ctx context.Context, user, project, file, sha string) error {
	client := GetS3Client()
	bucket := env.GetFileBucket()
	filePath := calculateFilePath(user, project, file)
	copySrc := path.Join(bucket, filePath)

	_, err := client.CopyObject(ctx, &s3.CopyObjectInput{
		Bucket:     &bucket,
		CopySource: &copySrc,
		Key:        &filePath,
		Metadata: map[string]string{
			"sha": sha,
		},
		MetadataDirective: types.MetadataDirectiveReplace,
	})

	return err
}
