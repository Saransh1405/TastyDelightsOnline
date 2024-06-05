package migrate

import (
	"gofoodbackendGO/initializers"
	"gofoodbackendGO/models"

	"gorm.io/gorm"
)

func inti() {
	initializers.LoadEnvVariable()
	initializers.ConnectToDB()
}

func Migrate(DB *gorm.DB) {
	DB.AutoMigrate(&models.User{}, &models.Order{})
}
