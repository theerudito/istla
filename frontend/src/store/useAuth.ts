import { create } from "zustand";
import { POST_Login, POST_Register } from "../http/FetchingLogin.ts";
import type { LoginDTO, User } from "../models/usuario.ts";
import { toast } from "sonner";

// Inicializadores
const initialLogin = (): LoginDTO => ({
  identificacion: "",
  password: "",
});

const initialRegister = (): User => ({
  id_usuario: 0,
  identificacion: "",
  nombres: "",
  apellidos: "",
  email: "",
  password: "",
  id_perfil: 0,
});

type Data = {
  form_login: LoginDTO;
  form_register: User;
  isLogin: boolean;
  Login: () => Promise<void>;
  Register: () => Promise<void>;
  Logout: () => void;
  reset: () => void;
};

export const useAuth = create<Data>((set, get) => ({
  form_login: initialLogin(),
  form_register: initialRegister(),
  isLogin: !!localStorage.getItem("token"),

  Login: async () => {
    const { form_login } = get();
    const result = await POST_Login(form_login);

    if (result.success && result.data.codigo === 200 && result.data.mensaje) {
      localStorage.setItem("token", result.data.mensaje);
      set({ isLogin: true });
      get().reset();
    } else {
      toast(result.data?.mensaje || "Error en login");
      localStorage.removeItem("token");
      set({ isLogin: false });
    }
  },

  Register: async () => {
    const { form_register } = get();
    form_register.id_perfil = 1;

    const result = await POST_Register(form_register);

    if (result.success && result.data.codigo === 200 && result.data.mensaje) {
      localStorage.setItem("token", result.data.mensaje);
      set({ isLogin: true });
      get().reset();
    } else {
      toast(result.data?.mensaje || "Error en registro");
      localStorage.removeItem("token");
      set({ isLogin: false });
    }
  },

  Logout: () => {
    localStorage.removeItem("token");
    set({ isLogin: false });
    get().reset();
  },

  reset: () =>
    set({ form_login: initialLogin(), form_register: initialRegister() }),
}));
