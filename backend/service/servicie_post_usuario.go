package service

import (
	"github.com/theerudito/istla/helpers"
	"github.com/theerudito/istla/model/dto"
	"github.com/theerudito/istla/model/entities"
)

type IPostUsuario interface {
	Get_PostUsers() dto.APIRespuesta[[]*dto.PostUsuarioDTO]
	Get_PostUser_By_UserId(id uint) dto.APIRespuesta[[]*dto.PostUsuarioDTO]
	Create_PostUser(obj entities.PostUsuario) *dto.APIRespuestaAcciones
	Update_PostUser(obj entities.PostUsuario) *dto.APIRespuestaAcciones
	Delete_PostUser(id uint, clains helpers.CustomClaims) *dto.APIRespuestaAcciones
}
