import {create} from "zustand";
import type {PostUsuario, PostUsuarioDTO} from "../models/post-usuario.ts";
import {DELETE_UserPost, GET_UserPost, POST_UserPost} from "../http/FetchingPostLogin.ts";
import {useModalPost} from "./useModal.ts";
import {ObtenerToken} from "../helpers/JWTDecore.ts";

const initialPostUser = (): PostUsuario => ({
    post_user_id: 0,
    descripcion: "",
    usuario_id: 0,
    file: null,
    fileName: "",
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

export const useUserPost = create<Data>()((set, get) => {
    return ({
        form_post_user: initialPostUser(),
        list_post_user: [],
        isEditing: false,
        isLoading: false,

        GetPostByUser: async () => {

            const result = await GET_UserPost(Number(ObtenerToken()?.user));

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
                    usuario_id: null,
                    file: null,
                    fileName: "",
                    usuario_creacion: obj.usuario_creacion,
                    usuario_modificacion: obj.usuario_modificacion,
                },
                isEditing: true
            });
        },

        SendData: async () => {
            const { form_post_user } = get();
            const token = ObtenerToken();

            if (token) {

                const formData = new FormData();
                formData.append("post_user_id", form_post_user.post_user_id.toString());
                formData.append("descripcion", form_post_user.descripcion);
                formData.append("usuario_id", token.user.toString());
                formData.append("usuario_modificacion", form_post_user.usuario_modificacion);
                formData.append("usuario_creacion", form_post_user.usuario_creacion);

                if (form_post_user.file) {
                    const fileBlob = new Blob([form_post_user.file], { type: 'application/pdf' });
                    formData.append("file", fileBlob, "file.pdf");
                } else {
                    console.log("No se seleccionó ningún archivo.");
                }

                const result = await POST_UserPost(formData);
                if (!result.success) {
                    console.error("Error al enviar los datos:", result.error);
                    return result.error;
                }

                get().reset();
                get().GetPostByUser();

            } else {
                console.log("No se pudo obtener el token o decodificarlo.");
                return;
            }
        },

        DeletePost: async (id: number) => {
            const result = await DELETE_UserPost(id)
            if (result.success) {
                get().GetPostByUser()
                return result.data;
            }
            return result.error;
        },

        reset: () => set({form_post_user: initialPostUser()}),
    });
});