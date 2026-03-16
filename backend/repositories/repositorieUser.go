package repositories

import (
	"database/sql"
	"strings"

	"github.com/theerudito/istla/helpers"
	"github.com/theerudito/istla/model/dto"
	"github.com/theerudito/istla/model/entities"
	"github.com/theerudito/istla/service"
)

type repositorieUser struct {
	db *sql.DB
}

func NewRepositorieUser(db *sql.DB) service.IUser {
	return &repositorieUser{db: db}
}

func (r repositorieUser) Login(obj dto.UsuarioLoginDTO) *dto.APIRespuestaAcciones {
	var (
		err             error
		password, token string
		existe          int
		respuesta       *dto.APIRespuestaAcciones
	)

	password, err = helpers.EncriptarDato(obj.Password)
	if err != nil {
		respuesta.Codigo = 404
		respuesta.Mensaje = err.Error()
		return respuesta
	}

	err = r.db.QueryRow(`
		SELECT COUNT(*) 
		FROM usuarios 
		WHERE email = $1 
		AND password = $2`,
		strings.ToUpper(obj.Identificacion), password).Scan(&existe)

	if err != nil {
		respuesta.Codigo = 500
		respuesta.Mensaje = err.Error()
		return respuesta
	}

	if existe == 0 {
		respuesta.Codigo = 401
		respuesta.Mensaje = "Credenciales incorrectas"
		return respuesta
	}

	token, err = helpers.GenerateToken(obj.Identificacion)

	respuesta.Codigo = 200
	respuesta.Mensaje = token
	return respuesta
}

func (r repositorieUser) Register(obj entities.Usuario) *dto.APIRespuestaAcciones {
	//TODO implement me
	panic("implement me")
}
