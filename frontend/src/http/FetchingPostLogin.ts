import axios from "axios";
import {url_base} from "./UrlBase.ts";
import type {PostUsuario, PostUsuarioDTO} from "../models/post-usuario.ts";
import type {ApiResponse} from "../models/ApiResponse.ts";

export const GET_UserPost = async (id:number) => {
    try {
        const response = await axios.get<ApiResponse<PostUsuarioDTO[]>>(`${url_base}/post/get_by_user/${id}`);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};

export const POST_UserPost = async (obj: PostUsuario) => {
    try {
        const response = await axios.post(`${url_base}/post`, obj);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};

export const PUT_UserPost = async (obj: PostUsuario) => {
    try {
        const response = await axios.put(`${url_base}/post`, obj);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};

export const DELETE_UserPost = async (id: number) => {
    try {
        const response = await axios.delete(`${url_base}/post/${id}`);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let message = "Error desconocido";
        if (axios.isAxiosError(error)) {
            message = error.response?.data?.error || message;
        }
        return { success: false, error: message };
    }
};