package repositories

import (
	"database/sql"
	"os"
	"strings"

	"github.com/google/uuid"
	"github.com/theerudito/istla/helpers"
	"github.com/theerudito/istla/model/dto"
	"github.com/theerudito/istla/model/entities"
	"github.com/theerudito/istla/service"
)

type repositoriePostUser struct {
	db *sql.DB
}

func NewRepositoriePostUser(db *sql.DB) service.IPostUsuario {
	return &repositoriePostUser{db: db}
}

func (r repositoriePostUser) Get_PostUser_By_UserId(id uint) dto.APIRespuesta[[]*dto.PostUsuarioDTO] {
	//TODO implement me
	panic("implement me")
}

func (r repositoriePostUser) Create_PostUser(obj entities.PostUsuario) *dto.APIRespuestaAcciones {
	var (
		err            error
		tx             *sql.Tx
		url, extension string
		uuidImage      = uuid.New().String()
		postId, id     int
		storageId      *int
	)

	tx, err = r.db.Begin()

	if err != nil {
		_ = helpers.InsertLogsError(r.db, "tournament team", "error iniciando la transacion "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error iniciando la transacion"}
	}

	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	extension, err = helpers.ExtencionFile(obj.File)
	if err != nil {
		_ = helpers.InsertLogsError(r.db, "storage", "error obteniendo extension del archivo "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error obteniendo extension del archivo"}
	}

	url, err = helpers.SaveImageToDirectory(obj.File, uuidImage, extension, os.Getenv("PDF"))
	if err != nil {
		_ = helpers.InsertLogsError(r.db, "storage", "error guardando el archivo "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error guardando el archivo"}
	}

	objStorage := dto.StorageItemDTO{
		TX:        tx,
		FileName:  uuidImage,
		Extension: extension,
		Url:       url,
		Option:    "INSERT",
	}

	id, err = helpers.StorageManager(objStorage)
	if err != nil {
		_ = helpers.InsertLogsError(r.db, "storage", err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: err.Error()}
	}

	storageId = &id

	err = tx.QueryRow(`
	INSERT INTO post_usuario (
	descripcion, id_usuario, id_storage, usuario_creacion, usuario_modificacion) 
	VALUES ($1, $2, $3, $4, $5)
	RETURNING id_post_usuario`,
		strings.ToUpper(obj.Descripcion),
		obj.UsuarioId,
		storageId,
		obj.UsuarioCreacion,
		obj.UsuarioCreacion).Scan(&postId)

	if err != nil {
		_ = helpers.InsertLogsError(r.db, "post_usuario", "error insertando el registro "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error insertando el registro"}
	}

	err = helpers.InsertLogs(r.db, "INSERT", "post_usuario", postId, "registro creado correctamente")
	if err != nil {
		_ = helpers.InsertLogsError(r.db, "logs", "error al insertar la auditoria "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error al insertar la auditoria"}
	}

	err = tx.Commit()

	if err != nil {
		_ = helpers.InsertLogsError(r.db, "post_usuario", "error al finalizar la transacion "+err.Error())
		return &dto.APIRespuestaAcciones{Codigo: 500, Mensaje: "error al finalizar la transacion"}
	}

	return &dto.APIRespuestaAcciones{Codigo: 200, Mensaje: "registro creado correctamente"}

}

func (r repositoriePostUser) Update_PostUser(obj entities.PostUsuario) *dto.APIRespuestaAcciones {
	//TODO implement me
	panic("implement me")
}

func (r repositoriePostUser) Delete_PostUser(id uint) *dto.APIRespuestaAcciones {
	//TODO implement me
	panic("implement me")
}
