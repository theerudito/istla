package handlers

import (
	"io"
	"net/http"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/theerudito/istla/model/entities"
	"github.com/theerudito/istla/service"
)

type HandlerPostUser struct {
	Service service.IPostUsuario
}

func NewHandlerPostUser(service service.IPostUsuario) *HandlerPostUser {
	return &HandlerPostUser{Service: service}
}

func (cur *HandlerPostUser) GetRegisterByUser(c *fiber.Ctx) error {

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"mensaje": "el id es invalido"})
	}

	obj := cur.Service.Get_PostUser_By_UserId(uint(id))

	return c.Status(obj.Codigo).JSON(obj)
}

func (cur *HandlerPostUser) PostRegister(c *fiber.Ctx) error {

	var register entities.PostUsuario

	// Campos del form-data
	register.Descripcion = c.FormValue("descripcion")
	register.UsuarioId = c.FormValue("usuario_id")
	register.UsuarioCreacion = c.FormValue("usuario_creacion")

	// Obtener archivo
	fileHeader, err := c.FormFile("file")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Debe enviar el archivo",
		})
	}

	// Validar tamaño (2MB)
	const maxFileSize = 2 * 1024 * 1024

	if fileHeader.Size > maxFileSize {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "El archivo no puede superar los 2MB",
		})
	}

	// Abrir archivo
	file, err := fileHeader.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "No se pudo abrir el archivo",
		})
	}
	defer file.Close()

	// Leer archivo
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "No se pudo leer el archivo",
		})
	}

	// Detectar MIME real
	mimeType := http.DetectContentType(fileBytes[:512])

	switch mimeType {
	case "application/pdf":

		// Validar firma real del PDF
		if string(fileBytes[:4]) != "%PDF" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "El archivo no es un PDF válido",
			})
		}

		register.File = fileBytes

	default:
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Solo se permiten archivos PDF",
		})
	}

	// Guardar
	obj := cur.Service.Create_PostUser(register)

	return c.Status(obj.Codigo).JSON(obj)
}

func (cur *HandlerPostUser) PutRegister(c *fiber.Ctx) error {

	var register entities.PostUsuario

	if err := c.BodyParser(&register); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Datos inválidos: " + err.Error(),
		})
	}

	obj := cur.Service.Update_PostUser(register)

	return c.Status(obj.Codigo).JSON(obj)
}

func (cur *HandlerPostUser) DeleteRegister(c *fiber.Ctx) error {

	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"mensaje": "el id es invalido"})
	}

	obj := cur.Service.Delete_PostUser(uint(id))

	return c.Status(obj.Codigo).JSON(obj)
}
