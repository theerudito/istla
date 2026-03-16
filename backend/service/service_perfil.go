package service

import (
	"github.com/theerudito/istla/model/dto"
)

type IPerfil interface {
	Obtener() dto.APIRespuesta[[]*dto.PerfilDTO]
}
