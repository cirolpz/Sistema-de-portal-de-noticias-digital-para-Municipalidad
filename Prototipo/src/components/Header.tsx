import { useNoticias } from "../Context/NoticiasContext";

export const Header = () => {
  const { adminActive, setSesionModalVisible, setFormVisible } = useNoticias()
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src="https://cepima.com.ar/wp-content/uploads/2021/09/Municipalidad-Malvinas-Argentinas.png"
          alt="Logo Malvinas Argentinas"
          className="h-34 object-contain -my-16"
        />
      </div>

      <div className="flex items-center space-x-4">
        {adminActive &&
          <button
            className="text-sm text-slate-700 hover:underline cursor-pointer"
            onClick={() => setFormVisible(true)}
          >
            Crear Publicacion
          </button>
        }
        <button
          className="bg-green-700 text-white text-sm px-4 py-2 rounded hover:bg-green-800 transition cursor-pointer"
          onClick={() => setSesionModalVisible(true)}
        >
          Iniciar Sesion
        </button>
      </div>
    </header>
  );
};
