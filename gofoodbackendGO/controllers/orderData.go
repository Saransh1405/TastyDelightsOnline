package controllers

import (
	"encoding/json"
	"gofoodbackendGO/initializers"
	"gofoodbackendGO/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

func OrderData(c *gin.Context) {

	//get the data send from the user
	var body struct {
		Email     string              `json:"email"`
		OrderData []models.Order_data `json:"order_data"`
		OrderDate time.Time           `json:"order_date"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//enter the data at the begining of the splice
	body.OrderData = append([]models.Order_data{{OrderDate: body.OrderDate}}, body.OrderData...)

	var existingOrder models.Order

	result := initializers.DB.Where("email=?", body.Email).First(&existingOrder)
	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if result.RowsAffected == 0 {
		// Email not existing in db, create new order
		orderItemsJSON, err := json.Marshal(body.OrderData)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		newOrder := models.Order{
			Email:     body.Email,
			OrderData: datatypes.JSON(orderItemsJSON),
		}
		if err := initializers.DB.Create(&newOrder).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"success": true})
	} else {
		// Email exists, update order_items
		var currentOrderItems []models.Order_data
		if err := json.Unmarshal(existingOrder.OrderData, &currentOrderItems); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		currentOrderItems = append(currentOrderItems, body.OrderData...)
		updatedOrderItemsJSON, err := json.Marshal(currentOrderItems)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := initializers.DB.Model(&existingOrder).Update("order_data", datatypes.JSON(updatedOrderItemsJSON)).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"success": true})
	}
}

func MyOrderData(c *gin.Context) {
	var body struct {
		Email string
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var order models.Order

	result := initializers.DB.Where("email=?", body.Email).Find(&order)

	if result.Error != nil {
		if result.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"orderData": order})
}
