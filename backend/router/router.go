package router

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/theerudito/istla/handlers"
	"github.com/theerudito/istla/helpers"
)

func SetupRoutes(app *fiber.App, controller *handlers.HandlersRegister) {
	allowedOrigins := map[string]bool{
		os.Getenv("URL_Frontend"): true,
		"http://127.0.0.1:1000":   true,
		"http://localhost:5173":   true,
	}

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS, PATCH",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowOriginsFunc: func(origin string) bool {
			return allowedOrigins[origin]
		},
	}))

	api := app.Group("/api")

	v1 := api.Group("/v1")

	protectedProfile := v1.Group("/profiles", helpers.JWTMiddleware())

	protectedProfile.Get("", controller.Profile.GetProfiles)

	v1.Post("/login", controller.User.Login)
	v1.Post("/register", controller.User.Register)

	protectedPost := v1.Group("/post", helpers.JWTMiddleware())
	protectedPost.Get("", controller.UserPost.GetRegisters)
	protectedPost.Get("/get_by_user/:id", controller.UserPost.GetRegisterByUser)
	protectedPost.Post("", controller.UserPost.PostRegister)
	protectedPost.Put("", controller.UserPost.PutRegister)
	protectedPost.Delete("/:id", controller.UserPost.DeleteRegister)

	v1.Get("/resources/:folder/:file", handlers.ResourceController)
}
