import { create } from "zustand";
import {useUserPost} from "./usePostUser.ts";

interface Data {
    open: boolean;
    openModal: () => void;
    closeModal: () => void;
    reset: () => void;
}

export const useModalPost = create<Data>((set) => ({
    open: false,
    openModal: () => {
        set({ open: true });
    },

    closeModal: () => {
        useModalPost.getState().reset();
        set({ open: false });
    },

    reset: () => {
        useUserPost.getState().reset();
    },
}));
