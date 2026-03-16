package dto

import "database/sql"

type StorageDTO struct {
	StorageId uint   `json:"id_storage"`
	FileName  string `json:"file_name"`
	Url       string `json:"url"`
	Extencion string `json:"extencion"`
}

type StorageItemDTO struct {
	StorageId int
	Option    string
	FileName  string
	Extension string
	Url       string
	TX        *sql.Tx
}
