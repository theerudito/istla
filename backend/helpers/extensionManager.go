package helpers

import (
	"mime"
	"net/http"
)

func ExtencionFile(file []byte) (string, error) {
	mimeType := http.DetectContentType(file)

	exts, err := mime.ExtensionsByType(mimeType)
	if err != nil || len(exts) == 0 {
		return "", err
	}

	return exts[0], nil
}
