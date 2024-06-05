package controllers

import (
	"errors"
	"fmt"
	"gofoodbackendGO/initializers"
	"gofoodbackendGO/models"
	"os"
	"time"

	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// func CreatUser(c *gin.Context) {

// 	var body struct {
// 		Name     string
// 		Location string
// 		Email    string
// 		Password string
// 	}

// 	if err := c.Bind(&body); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
// 		return
// 	}

// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password"})
// 		return
// 	}

// 	user := models.User{Name: body.Name, Location: body.Location, Email: body.Email, Password: string(hashedPassword)}

// 	result := initializers.DB.Create(&user)

// 	if result.Error != nil {
// 		c.JSON(400, result.Error)
// 	}

// 	c.JSON(200, gin.H{
// 		"message": "user created successfully",
// 	})

// }

func CreatUser(c *gin.Context) {
	var body struct {
		Name     string `json:"name" binding:"required"`
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
		Location string `json:"location" binding:"required"`
	}

	// Bind request body to struct
	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to hash password"})
		return
	}

	fmt.Printf("hashed Password %s", hashedPassword)

	// Create user object with hashed password
	user := models.User{
		Name:     body.Name,
		Location: body.Location,
		Email:    body.Email,
		Password: string(hashedPassword), // Convert []byte to string
	}

	// Create user in the database
	if err := initializers.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user", "error": err.Error()})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Email,
		"exp": time.Now().Add(time.Hour * 24 * 3).Unix(),
	})

	secret := os.Getenv("SECRET")
	if secret == "" {
		log.Println("Secret key is not set")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error generating token"})
		return
	}

	// Log the token and the cookie setting process
	c.SetSameSite(http.SameSiteDefaultMode)
	log.Printf("Setting cookie: Authorization with token: %s", tokenString)
	c.SetCookie("Authorization", tokenString, 3600*24*3, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
		"token":   tokenString,
	})
}
func LoginUser(c *gin.Context) {
	var body struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.Bind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	user, err := getUserByEmail(initializers.DB, body.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "User does not exist"})
		return
	}

	log.Printf("Retrieved hashed password from database: %s", user.Password)

	if !comparePasswords(user.Password, body.Password) {
		log.Printf("Password comparison failed: Hashed password: %s, Plain password: %s", user.Password, body.Password)
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Email,
		"exp": time.Now().Add(time.Hour * 24 * 3).Unix(),
	})

	secret := os.Getenv("SECRET")
	if secret == "" {
		log.Println("Secret key is not set")
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
		return
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error generating token"})
		return
	}

	// Log the token and the cookie setting process
	c.SetSameSite(http.SameSiteDefaultMode)
	log.Printf("Setting cookie: Authorization with token: %s", tokenString)
	c.SetCookie("Authorization", tokenString, 3600*24*3, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"token":   tokenString,
	})
}

func getUserByEmail(DB *gorm.DB, email string) (*models.User, error) {
	var user models.User
	result := DB.Where("email = ?", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("user does not exist")
		}
		return nil, result.Error
	}
	return &user, nil
}

func comparePasswords(hashedPwd string, plainPwd string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPwd), []byte(plainPwd))
	return err == nil
}
