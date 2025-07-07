import { useState } from "react";
import { useNoticias } from "../Context/NoticiasContext";

export default function SesionModal() {
    const { handleIniciarSesion, setSesionModalVisible } = useNoticias();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleIniciarSesion(username, password);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-[1000]">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl border border-gray-300 shadow-2xl grid justify-center">
                <img
                    src="https://cepima.com.ar/wp-content/uploads/2021/09/Municipalidad-Malvinas-Argentinas.png"
                    alt="Imagen Malvinas"
                    className="object-contain -my-16"
                />
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-full mx-auto mt-6 bg-white p-2"
                >
                    <h2 className="text-lg font-bold">Iniciar Sesión</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <div className="flex w-full gap-x-5">
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800 cursor-pointer"
                            onClick={() => handleIniciarSesion(username, password)}
                        >
                            Ingresar
                        </button>
                        <button
                            type="submit"
                            className="w-full bg-red-700 text-white p-2 rounded hover:bg-red-900 cursor-pointer"
                            onClick={() => setSesionModalVisible(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
