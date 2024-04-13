package env

import "os"

func GetClientOrigin() string {
	return os.Getenv("QUACK_CLIENT_ORIGIN")
}

func GetClientDomain() string {
	return os.Getenv("QUACK_CLIENT_DOMAIN")
}

func GetClientID() string {
	return os.Getenv("QUACK_GITHUB_CLIENT")
}

func GetClientSecret() string {
	return os.Getenv("QUACK_GITHUB_SECRET")
}

func GetGitHubRedirect() string {
	return os.Getenv("QUACK_GITHUB_REDIRECT")
}

func GetFileBucket() string {
	return os.Getenv("QUACK_S3_BUCKET")
}
