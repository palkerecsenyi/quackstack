package files

import (
	"context"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var s3Client *s3.Client

func InitS3Client(ctx context.Context) error {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return fmt.Errorf("load config: %s", err)
	}

	s3Client = s3.NewFromConfig(cfg)
	return nil
}

func GetS3Client() *s3.Client {
	if s3Client == nil {
		panic("s3 client not yet initialised")
	}

	return s3Client
}
