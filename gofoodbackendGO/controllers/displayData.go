// // package controllers

// // import (
// // 	"database/sql/driver"
// // 	// "encoding/json"
// // 	// "errors"
// // 	"fmt"
// // 	"gofoodbackendGO/initializers"
// // 	"log"
// // 	"net/http"

// // 	"github.com/gin-gonic/gin"
// // )

// // var foodItems []interface{}
// // var foodCategory []interface{}

// // type JSONB []byte

// // func (j *JSONB) Scan(value interface{}) error {
// // 	switch v := value.(type) {
// // 	case []byte:
// // 		*j = v
// // 		return nil
// // 	case string:
// // 		*j = []byte(v)
// // 		return nil
// // 	default:
// // 		return fmt.Errorf("unsupported type: %T", v)
// // 	}
// // }

// // func (j JSONB) Value() (driver.Value, error) {
// // 	return []byte(j), nil
// // }

// // type FoodItem struct {
// // 	ID           int
// // 	CategoryName string
// // 	Name         string
// // 	Image        string
// // 	Options      JSONB `gorm:"type:jsonb"`
// // 	Description  string
// // }

// // // type FoodItem struct {
// // // 	ID           int    // Adjust the data type as per your database schema
// // // 	CategoryName string // Adjust the data type as per your database schema
// // // 	Name         string
// // // 	Image        string
// // // 	Options      map[string]interface{} `gorm:"type:jsonb"`
// // // 	Description  string
// // // 	// Add other fields as needed
// // // }

// // type FoodCategory struct {
// // 	ID           int    // Adjust the data type as per your database schema
// // 	CategoryName string // Adjust the data type as per your database schema
// // 	// Add other fields as needed
// // }

// // func (FoodItem) TableName() string {
// // 	return "fooditem"
// // }

// // func (FoodCategory) TableName() string {
// // 	return "foodcategory"
// // }

// // func fetchDataFromDatabase() error {
// // 	var foodItems []FoodItem
// // 	var foodCategories []FoodCategory

// // 	// Fetch food items from the database and store them in the foodItems slice
// // 	if err := initializers.DB.Find(&foodItems).Error; err != nil {
// // 		return err
// // 	}

// // 	// Fetch food categories from the database and store them in the foodCategories slice
// // 	if err := initializers.DB.Find(&foodCategories).Error; err != nil {
// // 		return err
// // 	}

// // 	return nil
// // }

// // func DisplayData(c *gin.Context) {
// // 	defer func() {

// // 		err := fetchDataFromDatabase()
// // 		if err != nil {
// // 			log.Fatal("Error fetching data from database:", err)
// // 		}

// // 		fmt.Println("Data fetched successfully")
// // 	}()

// // 	response := []interface{}{foodItems, foodCategory}
// // 	fmt.Println(response)

// // 	c.JSON(http.StatusOK, response)
// // }

// //

package controllers

import (
	"database/sql/driver"
	"fmt"
	"gofoodbackendGO/initializers"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

var foodItems []FoodItem
var foodCategories []FoodCategory

type JSONB []byte

func (j *JSONB) Scan(value interface{}) error {
	switch v := value.(type) {
	case []byte:
		*j = v
		return nil
	case string:
		*j = []byte(v)
		return nil
	default:
		return fmt.Errorf("unsupported type: %T", v)
	}
}

func (j JSONB) Value() (driver.Value, error) {
	return []byte(j), nil
}

type FoodItem struct {
	ID           int    `gorm:"column:id"`
	CategoryName string `gorm:"column:categoryname"`
	Name         string `gorm:"column:name"`
	Image        string `gorm:"column:img"`
	Options      JSONB  `gorm:"type:jsonb;column:options"`
	Description  string `gorm:"column:description"`
}

type FoodCategory struct {
	ID           int    `gorm:"column:id"`
	CategoryName string `gorm:"column:categoryname"`
}

func (FoodItem) TableName() string {
	return "fooditem"
}

func (FoodCategory) TableName() string {
	return "foodcategory"
}

func fetchDataFromDatabase() error {
	// Fetch food items from the database and store them in the foodItems slice
	if err := initializers.DB.Find(&foodItems).Error; err != nil {
		return err
	}

	// Fetch food categories from the database and store them in the foodCategories slice
	if err := initializers.DB.Find(&foodCategories).Error; err != nil {
		return err
	}

	return nil
}

func DisplayData(c *gin.Context) {
	err := fetchDataFromDatabase()
	if err != nil {
		log.Fatal("Error fetching data from database:", err)
	}

	fmt.Println("Data fetched successfully")

	response := []interface{}{foodItems, foodCategories}
	fmt.Println(response)

	c.JSON(http.StatusOK, response)
}
