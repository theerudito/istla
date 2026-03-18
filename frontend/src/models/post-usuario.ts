
export interface PostUsuarioDTO {
    post_user_id: number;
    descripcion: string;
    usuario: string;
    usuario_id: number ;
    id_storage: number;
    url: string;
    usuario_creacion: string;
    usuario_modificacion: string;
    fecha_creacion: string;
    fecha_modificacion: string;
}

export interface PostUsuario {
    post_user_id: number
    descripcion: string
    usuario_id: number | null
    file: ArrayBuffer | null
    fileName: string
    usuario_creacion: string
    usuario_modificacion: string
}

