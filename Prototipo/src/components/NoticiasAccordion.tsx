import { useState } from "react";
import { useNoticias } from "../Context/NoticiasContext";

export const NoticiaAccordion = () => {

  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const { noticiasFiltradas, filtro, setFiltro } = useNoticias()

  return (
    <div className="w-[55%] mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Catálogo de Noticias</h2>
      <div className="flex gap-2 items-center mb-4">
        <select
          value={filtro.tipo}
          onChange={(e) => setFiltro({ ...filtro, tipo: e.target.value as "nombre" | "fecha" })}
          className="border px-2 py-1 rounded"
        >
          <option value="nombre">Filtrar por nombre</option>
          <option value="fecha">Filtrar por fecha</option>
        </select>

        <input
          type="text"
          value={filtro.valor}
         placeholder={`Buscar por ${filtro.tipo} ${filtro.tipo === "fecha" ? "formato: yyyy/mm/dd" : ""}`}
          onChange={(e) => setFiltro({ ...filtro, valor: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      {noticiasFiltradas.map(noticia => (
        <div
          key={noticia.id}
          className="border border-gray-300 rounded-md shadow-sm overflow-hidden"
        >
          <button
            onClick={() => toggle(noticia.id)}
            className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{noticia.titulo}</h3>
            <p className="text-sm text-gray-600">{noticia.descripcion}</p>
          </button>

          {activeId === noticia.id && (
            <div className="px-4 py-3 bg-white border-t border-gray-200 space-y-2">
              {noticia.cuerpo && <p>{noticia.cuerpo}</p>}
              {noticia.fechaPublicacion && <p><strong>Fecha:</strong> {noticia.fechaPublicacion}</p>}
              {noticia.autor && <p><strong>Tema:</strong> {noticia.autor}</p>}
              {noticia.direccion && <p><strong>Dirección:</strong> {noticia.direccion}</p>}
              {noticia.imagenes && noticia.imagenes.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {noticia.imagenes.map((src, index) => (
                    <img key={index} src={src} alt={`Imagen ${index + 1}`} className="w-full h-96 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
