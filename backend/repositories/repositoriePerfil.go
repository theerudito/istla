package repositories

import (
	"database/sql"

	"github.com/theerudito/istla/helpers"
	"github.com/theerudito/istla/model/dto"
	"github.com/theerudito/istla/service"
)

type repositoriePerfil struct {
	db *sql.DB
}

func NewRepositoriePerfil(db *sql.DB) service.IPerfil {
	return &repositoriePerfil{db: db}
}

func (r repositoriePerfil) Obtener() dto.APIRespuesta[[]*dto.PerfilDTO] {

	var (
		profiles []*dto.PerfilDTO
		rows     *sql.Rows
		err      error
		conn     = r.db
	)

	rows, err = conn.Query(`SELECT id_perfil, descripcion FROM perfiles`)

	if err != nil {
		_ = helpers.InsertLogsError(conn, "profiles", "Error al ejecutar la consulta")
		return dto.APIRespuesta[[]*dto.PerfilDTO]{Codigo: 500, Mensaje: "Error al ejecutar la consulta", Resultado: nil}
	}

	defer rows.Close()

	for rows.Next() {

		var profile dto.PerfilDTO

		err = rows.Scan(&profile.PerfilId, &profile.Descripcion)

		if err != nil {
			_ = helpers.InsertLogsError(conn, "profiles", "Error al leer los registros")
			return dto.APIRespuesta[[]*dto.PerfilDTO]{Codigo: 500, Mensaje: "Error al leer los registros", Resultado: nil}
		}

		profiles = append(profiles, &profile)
	}

	if len(profiles) == 0 {
		return dto.APIRespuesta[[]*dto.PerfilDTO]{Codigo: 404, Mensaje: "No se encontraron registros", Resultado: []*dto.PerfilDTO{}}
	}

	return dto.APIRespuesta[[]*dto.PerfilDTO]{Codigo: 200, Mensaje: "OK", Resultado: profiles}
}
