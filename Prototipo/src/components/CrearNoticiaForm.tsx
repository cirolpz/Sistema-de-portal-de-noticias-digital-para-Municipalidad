import { useNoticias } from "../Context/NoticiasContext";
import { useState } from "react";

declare global {
    interface Window {
        usig: any;
        initNormalizador: () => void;
        normalizador: any;
    }
}

export const CrearNoticiaForm = () => {
    const { guardarNoticia, setFormVisible } = useNoticias();

    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        cuerpo: "",
        autor: "",
        direccion: "",
        imagenes: [] as string[]
    });

    const [sugerencias, setSugerencias] = useState<any[]>([]);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "imagenes" && files) {
            const readerPromises = Array.from(files).map(file => {
                return new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readerPromises).then(images => {
                setFormData(prev => ({ ...prev, imagenes: images }));
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));

            if (name === "direccion") {
                if (debounceTimer) clearTimeout(debounceTimer);
                const timer = setTimeout(() => {
                    buscarSugerencias(value);
                }, 500);
                setDebounceTimer(timer);
            }
        }
    };

    const buscarSugerencias = async (direccion: string) => {
        if (!direccion.trim()) return;

        try {
            const response = await fetch(
                `http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(direccion)}`
            );
            const data = await response.json();

            if (Array.isArray(data.direccionesNormalizadas)) {
                setSugerencias(data.direccionesNormalizadas);
            }
        } catch (error) {
            console.error("Error al buscar sugerencias:", error);
        }
    };

    const seleccionarSugerencia = (direccion: string) => {
        setFormData(prev => ({ ...prev, direccion }));
        setSugerencias([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.titulo || !formData.descripcion || !formData.cuerpo || !formData.autor) {
            alert("Completa todos los campos obligatorios");
            return;
        }

        guardarNoticia(formData);
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-[1000]">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl border border-gray-300 shadow-2xl">
                <form onSubmit={handleSubmit} className="grid justify-center space-y-4 transition-all duration-300">
                    <div className="w-full flex justify-between gap-x-5">
                        <div className="w-full">
                            <label htmlFor="titulo" className="block font-semibold text-gray-700">Título</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Ingrese el título"
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="autor" className="block font-semibold text-gray-700">Autor</label>
                            <input
                                type="text"
                                id="autor"
                                name="autor"
                                value={formData.autor}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Ingrese el tema"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="descripcion" className="block font-semibold text-gray-700">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Ingrese la descripción"
                            rows={2}
                        />
                    </div>

                    <div>
                        <label htmlFor="cuerpo" className="block font-semibold text-gray-700">Cuerpo</label>
                        <textarea
                            id="cuerpo"
                            name="cuerpo"
                            value={formData.cuerpo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Ingrese el cuerpo"
                            rows={4}
                        />
                    </div>

                    <div className="w-full flex gap-x-5">
                        <div className="w-full">
                            <label htmlFor="imagenes" className="block font-semibold text-gray-700">Imágenes</label>
                            <input
                                type="file"
                                id="imagenes"
                                name="imagenes"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="w-full relative">
                            <label htmlFor="direccion" className="block font-semibold text-gray-700">Dirección</label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Ej: Avenida Siempreviva 123"
                                autoComplete="off"
                            />
                            {sugerencias.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                                    {sugerencias.map((s, idx) => (
                                        <li
                                            key={idx}
                                            onClick={() => seleccionarSugerencia(s.direccion)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        >
                                            {s.direccion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-1">
                            <button
                                type="submit"
                                className="px-6 h-full py-[10px] bg-green-600 text-sm text-white rounded-md hover:bg-green-700 cursor-pointer"
                            >
                                Crear Noticia
                            </button>
                            <button
                                type="submit"
                                className="px-6 h-full py-[10px] bg-red-600 text-sm text-white rounded-md hover:bg-red-700 cursor-pointer"
                                onClick={() => setFormVisible(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                </form>
            </div>
        </div>
    );
};
