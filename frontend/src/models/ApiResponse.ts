
export type ApiResponse<T> = {
    codigo: number;
    mensaje: string;
    resultado: T;
};

export type ApiResponseAcciones = {
    codigo: number;
    mensaje: string;
};