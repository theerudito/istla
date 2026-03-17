
export interface User {
    id_usuario: number,
    identificacion: string,
    nombres: string,
    apellidos: string
    email: string,
    password: string,
    id_perfil: number
}

export interface UserDTO {
    id_usuario: number,
    identificacion: string,
    nombres: string,
    apellidos: string
    email: string
    id_perfil: number
    perfil: string
}

export interface LoginDTO {
    identificacion: string,
    password: string
}