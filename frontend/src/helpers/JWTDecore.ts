import {jwtDecode} from "jwt-decode";

interface TokenPayload {
    nombres: string;
    user: number;
}

export const ObtenerToken = (): TokenPayload | null => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token no encontrado en localStorage");
            return null;
        }

        const decoded: TokenPayload = jwtDecode(token);

        const { nombres, user } = decoded;

        return { nombres, user };
    } catch (error) {
        console.error("Error al decodificar el token", error);
        return null;
    }
};