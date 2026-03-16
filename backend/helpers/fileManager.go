package helpers

import (
	"fmt"
	"log"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func SaveImageToDirectory(file []byte, name string, ext string, folder string) (string, error) {

	if len(file) == 0 {
		return "", fmt.Errorf("el archivo está vacío")
	}

	root := os.Getenv("Source_Path")
	baseURL := strings.TrimRight(os.Getenv("URL"), "/")

	if root == "" || baseURL == "" {
		return "", fmt.Errorf("Source_Path o URL no están definidos")
	}

	imageFolder := os.Getenv("IMAGEN")
	pdfFolder := os.Getenv("PDF")

	var dir string
	var relativePath string

	switch folder {

	case imageFolder:

		dir = filepath.Join(root, imageFolder)
		relativePath = imageFolder

	case pdfFolder:

		dir = filepath.Join(root, pdfFolder)
		relativePath = pdfFolder

	default:
		return "", fmt.Errorf("folder inválido: %s", folder)
	}

	fileName := name + ext
	filePath := filepath.Join(dir, fileName)

	err := os.WriteFile(filePath, file, 0644)
	if err != nil {
		return "", fmt.Errorf("error al guardar archivo: %w", err)
	}

	publicURL := baseURL + "/" + path.Join(relativePath, fileName)

	return publicURL, nil
}

func DeleteImageFromDirectory(relativePath string) error {

	log.Println(relativePath)

	root := os.Getenv("Source_Path")
	if root == "" {
		return fmt.Errorf("Source_Path no está definido")
	}

	filePath := filepath.Join(root, relativePath)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return fmt.Errorf("el archivo no existe: %s", filePath)
	}

	return os.Remove(filePath)

}
