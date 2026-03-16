package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/theerudito/istla/service"
)

type HandlerPerfil struct {
	Service service.IPerfil
}

func NewHandlerPerfil(service service.IPerfil) *HandlerPerfil {
	return &HandlerPerfil{Service: service}
}

func (cp *HandlerPerfil) GetProfiles(c *fiber.Ctx) error {

	obj := cp.Service.Obtener()

	return c.Status(obj.Codigo).JSON(obj)
}
