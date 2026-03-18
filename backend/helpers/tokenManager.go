package helpers

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/theerudito/istla/model/dto"
)

func GenerateToken(user dto.UsuarJWT) (string, error) {

	var jwtSecret = []byte(os.Getenv("Secret_Key"))

	claims := jwt.MapClaims{
		"user":    user.UsuarioId,
		"nombres": user.Nombres,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
