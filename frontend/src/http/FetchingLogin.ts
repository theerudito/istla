import type {LoginDTO, User} from "../models/usuario.ts";
import axios from "axios";
import {url_base} from "./UrlBase.ts";
import type {ApiResponseAcciones} from "../models/ApiResponse.ts";


export const POST_Login = async (obj: LoginDTO) => {
    try {
        const response = await axios.post<ApiResponseAcciones>(`${url_base}/login`, obj);

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: 'Error en la respuesta del servidor' };
        }
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        } else if (error instanceof Error) {
            message = error.message;
        }
        return { success: false, error: message };
    }
};

export const POST_Register = async (obj: User) => {
    try {
        const response = await axios.post<ApiResponseAcciones>(`${url_base}/register`, obj);

        if (response.status === 200) {
            return { success: true, data: response.data };
        } else {
            return { success: false, error: 'Error en la respuesta del servidor' };
        }
    } catch (error: unknown) {
        let message = "Error desconocido";

        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }

        else if (error instanceof Error) {
            message = error.message;
        }

        return { success: false, error: message };
    }
};