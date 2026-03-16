package helpers

import (
	"fmt"

	"github.com/theerudito/istla/model/dto"
)

func StorageManager(obj dto.StorageItemDTO) (int, error) {

	var (
		storageId int
		err       error
	)

	switch obj.Option {

	case "INSERT":

		qInsert := `
		INSERT INTO storage (nombre, url, extencion) 
		VALUES ($1, $2, $3)
		RETURNING id_storage`

		err = obj.TX.QueryRow(qInsert, obj.FileName, obj.Url, obj.Extension).Scan(&storageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error insertando el registro"))
			return 0, err
		}

	case "UPDATE":

		qUpdate := `
				UPDATE storage 
				SET nombre    	 = $1, 
				    url 		 = $2,
				    extencion    = $3
				WHERE id_storage = $4 
				RETURNING id_storage`

		err = obj.TX.QueryRow(qUpdate, obj.FileName, obj.Url, obj.Extension, obj.StorageId).Scan(&storageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error actualizando el registro"))
			return 0, err
		}

	case "DELETE":

		qDelete := `DELETE FROM storage WHERE id_storage = $1`

		_, err = obj.TX.Exec(qDelete, obj.StorageId)

		if err != nil {
			_ = InsertLogsError(obj.TX, "storage", fmt.Sprintf("error eligando el registro"))
			return 0, err
		}

	}

	return storageId, nil
}
