package main

import (
	"gofoodbackendGO/controllers"
	"gofoodbackendGO/initializers"
	"gofoodbackendGO/middleware"
	"gofoodbackendGO/migrate"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariable()
	initializers.ConnectToDB()
	migrate.Migrate(initializers.DB)
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	r.POST("/api/createuser", controllers.CreatUser)
	r.POST("/api/loginuser", middleware.RequireAuth, controllers.LoginUser)
	r.POST("/api/orderdata", controllers.OrderData)
	r.POST("/api/myorderdata", controllers.MyOrderData)
	r.POST("/api/displaydata", controllers.DisplayData)
	r.Run(":9090")
}
