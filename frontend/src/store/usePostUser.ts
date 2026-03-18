import {create} from "zustand";
import type {PostUsuario, PostUsuarioDTO} from "../models/post-usuario.ts";
import {DELETE_UserPost, GET_UserPost, POST_UserPost} from "../http/FetchingPostLogin.ts";
import {useModalPost} from "./useModal.ts";

const initialPostUser = (): PostUsuario => ({
    post_user_id: 0,
    descripcion: "",
    usuario_id: 0,
    file: null,
    usuario_creacion: "",
    usuario_modificacion: "",
});

type Data = {
    form_post_user: PostUsuario;
    list_post_user: PostUsuarioDTO[],
    GetPostByUser: () => void;
    GetOne: (obj: PostUsuarioDTO) => void;
    SendData: () => void;
    DeletePost: (id:number) => void;
    isEditing: boolean;
    isLoading: boolean;
    reset: () => void;
};

export const useUserPost = create<Data>()((set, get) => ({
    form_post_user: initialPostUser(),
    list_post_user : [],
    isEditing: false,
    isLoading: false,

    GetPostByUser: async () => {

        const result = await GET_UserPost(1);

        if (result.success && Array.isArray(result.data?.resultado)) {

            set({
                list_post_user: result.data.resultado
            });

        } else {
            console.error(result.error);
        }

        return result.error;
    },

    GetOne: async (obj: PostUsuarioDTO) => {

        useModalPost.getState().openModal()

        set({
            form_post_user: {
                post_user_id: obj.post_user_id,
                descripcion: obj.descripcion,
                usuario_id: obj.usuario_id,
                file: null,
                usuario_creacion: obj.usuario_creacion,
                usuario_modificacion: obj.usuario_modificacion,
            },
            isEditing: true
        });
    },

    SendData: async () => {
        const { form_post_user } = get();

        const payload: PostUsuario = {
            post_user_id : form_post_user.post_user_id,
            descripcion : form_post_user.descripcion,
            file: form_post_user.file,
            usuario_id : form_post_user.usuario_id,
            usuario_modificacion: form_post_user.usuario_modificacion,
            usuario_creacion : form_post_user.usuario_creacion
        };

        if (payload.post_user_id === 0) {
            const result = await POST_UserPost(payload)
            if (!result.success) return result.error;
        } else {
            const result = await POST_UserPost(payload)
            if (!result.success) return result.error;
        }

        get().reset();
        get().GetPostByUser()
    },

    DeletePost: async (id:number) => {
        const result = await DELETE_UserPost(id)
        if (result.success) {
            get().GetPostByUser()
            return result.data;
        }
        return result.error;
    },

    reset: () => set({ form_post_user: initialPostUser()}),
}));