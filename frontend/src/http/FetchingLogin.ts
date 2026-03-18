import type {LoginDTO, User} from "../models/usuario.ts";
import axios from "axios";
import {url_base} from "./UrlBase.ts";


export const POST_Login = async (obj: LoginDTO) => {
    try {
        const response = await axios.post(`${url_base}/login`, obj);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};

export const POST_Register = async (obj: User) => {
    try {
        const response = await axios.post(`${url_base}/register`, obj);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};