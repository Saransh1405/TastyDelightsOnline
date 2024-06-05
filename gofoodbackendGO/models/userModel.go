package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Location string `json:"location"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}
