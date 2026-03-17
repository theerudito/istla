
import { useState } from "react";

export default function PageAuth() {

    const [tab, setTab] = useState<"login" | "register">("login");

    const [loginData, setLoginData] = useState({
        identificacion: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        identificacion: "",
        nombres: "",
        apellidos: "",
        email: "",
        password: ""
    });

    const handleLogin = () => {
        console.log("login", loginData);
    };

    const handleRegister = () => {
        console.log("register", registerData);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-200 p-4">

            <div className="bg-gray-800 w-full max-w-md rounded-xl p-6 shadow-lg">

                {/* TABS */}
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

                {/* LOGIN */}
                {tab === "login" && (
                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-400">
                                Identificación
                            </label>

                            <input
                                type="text"
                                value={loginData.identificacion}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, identificacion: e.target.value })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg"
                        >
                            Iniciar sesión
                        </button>

                    </div>
                )}

                {/* REGISTER */}
                {tab === "register" && (
                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-400">
                                Identificación
                            </label>

                            <input
                                value={registerData.identificacion}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        identificacion: e.target.value
                                    })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Nombres
                            </label>

                            <input
                                value={registerData.nombres}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        nombres: e.target.value
                                    })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Apellidos
                            </label>

                            <input
                                value={registerData.apellidos}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        apellidos: e.target.value
                                    })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Email
                            </label>

                            <input
                                type="email"
                                value={registerData.email}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        email: e.target.value
                                    })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                value={registerData.password}
                                onChange={(e) =>
                                    setRegisterData({
                                        ...registerData,
                                        password: e.target.value
                                    })
                                }
                                className="w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg p-2 focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <button
                            onClick={handleRegister}
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