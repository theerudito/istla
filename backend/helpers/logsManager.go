package helpers

func InsertLogsError(exec ExecutorDB, tableName string, message string) error {
	query := `
        INSERT INTO logs_error (tabla_nombre, mensaje)
        VALUES ($1, $2)`
	_, err := exec.Exec(query, tableName, message)
	return err
}

func InsertLogs(exec ExecutorDB, action string, tableName string, recordId int, description string) error {
	query := `
        INSERT INTO logs_accion (accion, tabla_nombre, id_registro, descripcion)
        VALUES ($1, $2, $3, $4)`
	_, err := exec.Exec(query, action, tableName, recordId, description)
	return err
}
