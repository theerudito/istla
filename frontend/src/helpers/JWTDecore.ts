import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  name: string;
  user_id: number;
}

export const ObtenerToken = (): TokenPayload | null => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token no encontrado en localStorage");
      return null;
    }

    const decoded: TokenPayload = jwtDecode(token);

    const { name, user_id } = decoded;

    return { name, user_id };
  } catch (error) {
    console.error("Error al decodificar el token", error);
    return null;
  }
};
