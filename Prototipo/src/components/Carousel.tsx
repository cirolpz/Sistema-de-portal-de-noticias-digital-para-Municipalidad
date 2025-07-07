import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNoticias } from "../Context/NoticiasContext";

export const Carousel = () => {
  const [index, setIndex] = useState(0);
  const {noticias} = useNoticias()

  const next = () => setIndex((prev) => (prev + 1) % noticias.length);
  const prev = () => setIndex((prev) => (prev - 1 + noticias.length) % noticias.length);

  const noticia = noticias[index];

  return (
    <div className="w-full mx-auto mt-0.5 relative">
      <div className="bg-white shadow-lg rounded overflow-hidden">
        <div className="relative">
          <img src={noticia.imagenes?.[0]} alt={noticia.titulo} className="w-full h-96 object-cover" />
          <div className="absolute inset-0 flex flex-col gap-y-12 items-center justify-center bg-black/50 w-full h-full">
            <h2 className="text-3xl font-bold text-white uppercase">
              {noticia.titulo}
            </h2>
            <h3 className="text-l font-semibold text-white/50">
              {noticia.descripcion}
            </h3>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button onClick={prev} className="bg-white/80 hover:bg-white p-2 px-3 rounded-full shadow cursor-pointer">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button onClick={next} className="bg-white/80 hover:bg-white p-2 px-3 rounded-full shadow cursor-pointer">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
