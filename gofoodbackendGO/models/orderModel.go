package models

import (
	"time"

	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Order_data struct {
	ItemName  string    `json:"item_name"`
	Quantity  int       `json:"quantity"`
	Price     int       `json:"price"`
	OrderDate time.Time `json:"order_date"`
}

type Order struct {
	gorm.Model
	Email     string         `gorm:"unique;not null"`
	OrderData datatypes.JSON `gorm:"type:jsonb"` // This uses JSONB for PostgreSQL
}
