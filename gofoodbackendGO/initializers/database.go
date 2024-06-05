package initializers

import (
	"log"

	// "fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error

	dsn := "postgresql://neondb_owner:aAe4ipX7nqFH@ep-still-mouse-a5rue0y0.us-east-2.aws.neon.tech/neondb?sslmode=require"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to db")
	}

}
