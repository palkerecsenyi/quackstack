package env

import "os"

func GetClientOrigin() string {
	return os.Getenv("QUACK_CLIENT_ORIGIN")
}
