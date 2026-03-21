package helpers

import (
	"github.com/gofiber/fiber/v2"
)

func ReadClaims(c *fiber.Ctx) (*CustomClaims, error) {

	user := c.Locals("user")

	claims, ok := user.(*CustomClaims)

	if !ok {
		return nil, fiber.NewError(fiber.StatusUnauthorized, "Usuario no autenticado o claims inválidos")
	}

	return claims, nil
}
