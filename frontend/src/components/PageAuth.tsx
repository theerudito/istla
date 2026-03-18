
import { useState } from "react";
import {useAuth} from "../store/useAuth.ts";

export default function PageAuth() {
    const {form_register, form_login, Login, Register} = useAuth((state) => state);
    const [tab, setTab] = useState<"login" | "register">("login");

    const handleChangeInputLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        useAuth.setState((state) => ({
            form_login: {
                ...state.form_login,
                [name as keyof typeof state.form_login]: value,
            },
        }));
    };

    const handleChangeInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        useAuth.setState((state) => ({
            form_register: {
                ...state.form_register,
                [name as keyof typeof state.form_register]: value,
            },
        }));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-200 p-4">

            <div className="bg-gray-800 w-full max-w-md rounded-xl p-6 shadow-lg">

                <div className="flex mb-6 bg-gray-900 rounded-lg p-1">

                    <button
                        onClick={() => setTab("login")}
                        className={`flex-1 py-2 rounded-md transition ${
                            tab === "login"
                                ? "bg-purple-500 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setTab("register")}
                        className={`flex-1 py-2 rounded-md transition ${
                            tab === "register"
                                ? "bg-purple-500 text-white"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Register
                    </button>

                </div>


                {tab === "login" && (
                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-400">
                                Identificación
                            </label>

                            <input
                                type="text"
                                name="identificacion"
                                placeholder="identificacion"
                                value={form_login.identificacion}
                                onChange={handleChangeInputLogin}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={form_login.password}
                                onChange={handleChangeInputLogin}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            onClick={Login}
                            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg"
                        >
                            Iniciar sesión
                        </button>

                    </div>
                )}

                {tab === "register" && (
                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-400">
                                Identificación
                            </label>

                            <input
                                type="text"
                                name="identificacion"
                                placeholder="identificacion"
                                value={form_register.identificacion}
                                onChange={handleChangeInputRegister}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Nombres
                            </label>

                            <input
                                type="text"
                                name="nombres"
                                placeholder="nombres"
                                value={form_register.nombres}
                                onChange={handleChangeInputRegister}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Apellidos
                            </label>

                            <input
                                type="text"
                                name="apellidos"
                                placeholder="apellidos"
                                value={form_register.apellidos}
                                onChange={handleChangeInputRegister}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={form_register.email}
                                onChange={handleChangeInputRegister}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={form_register.password}
                                onChange={handleChangeInputRegister}
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            onClick={Register}
                            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg"
                        >
                            Crear cuenta
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}