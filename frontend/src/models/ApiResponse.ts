
export type ApiResponse<T> = {
    codigo: number;
    mensaje: string;
    resultado: T;
};