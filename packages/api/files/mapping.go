package files

import "path"

func calculateFilePath(userId, projectId, fileName string) string {
	return path.Join(userId, projectId, fileName)
}
