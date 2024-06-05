package middleware

import (
	"fmt"
	"gofoodbackendGO/initializers"
	"gofoodbackendGO/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func RequireAuth(c *gin.Context) {
	// Retrieve the token from the cookie
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in RequireAuth, line 20:", err)
		return
	}

	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in require Auth line 35")
		return
	}

	// Ensure token and claims are valid
	if token == nil || token.Claims == nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in require Auth line 42")
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in require Auth line 49")
		return
	}

	// Check token expiration
	if float64(time.Now().Unix()) > claims["exp"].(float64) {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in require Auth line 56")
		return
	}

	// Retrieve the user from the database
	var user models.User
	initializers.DB.First(&user, claims["user"])

	// Ensure the user exists
	if user.ID == 0 {
		c.AbortWithStatus(http.StatusUnauthorized)
		fmt.Println("error in require Auth line 67")
		return
	}

	// Set the user in the context
	c.Set("user", user)

	// Proceed to the next middleware
	c.Next()
}
