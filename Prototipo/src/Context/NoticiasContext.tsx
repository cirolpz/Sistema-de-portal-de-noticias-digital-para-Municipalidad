import { createContext, useContext, useState, ReactNode } from "react";
import { noticiasData } from "../data/noticiasData"
import { Noticia } from "../types";

type NoticiasContextType = {
  formVisible: boolean;
  setFormVisible: (visible: boolean) => void;
  adminActive: boolean
  handleIniciarSesion: (username: string, password: string) => boolean
  sesionModalVisible: boolean
  setSesionModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  noticias: Noticia[]
  guardarNoticia: (nuevaNoticia: Omit<Noticia, "id" | "fechaPublicacion">) => void
  filtro: { tipo: "nombre" | "fecha"; valor: string };
  setFiltro: React.Dispatch<React.SetStateAction<{ tipo: "nombre" | "fecha"; valor: string }>>;
  noticiasFiltradas: Noticia[]
};

const NoticiasContext = createContext<NoticiasContextType | undefined>(undefined);

export const NoticiasProvider = ({ children }: { children: ReactNode }) => {
  const [adminActive, setAdminActive] = useState<boolean>(() => {
    return localStorage.getItem("adminActive") === "true";
  });
  const [sesionModalVisible, setSesionModalVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false);
  const [noticias, setNoticias] = useState<Noticia[]>(noticiasData)

  const handleIniciarSesion = (username: string, password: string): boolean => {
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "1234";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAdminActive(true);
      setSesionModalVisible(false)
      localStorage.setItem("adminActive", "true")
      return true;
    } else {
      alert("Usuario o contraseña incorrectos");
      return false;
    }
  };

  const guardarNoticia = (nuevaNoticia: Omit<Noticia, "id" | "fechaPublicacion">) => {
    const nueva: Noticia = {
      ...nuevaNoticia,
      id: Date.now() + Math.floor(Math.random() * 1000),
      fechaPublicacion: new Date().toISOString()
    };

    setNoticias(prev => [...prev, nueva]);
    setFormVisible(false);
  };

  const [filtro, setFiltro] = useState<{ tipo: "nombre" | "fecha"; valor: string }>({
    tipo: "nombre",
    valor: ""
  });

  const noticiasFiltradas = noticias.filter((noticia) => {
    if (filtro.tipo === "nombre") {
      return noticia.titulo.toLowerCase().includes(filtro.valor.toLowerCase());
    } else if (filtro.tipo === "fecha") {
      const fecha = new Date(noticia.fechaPublicacion);
      fecha.setDate(fecha.getDate() + 1)
      const fechaFormateada = `${fecha.getFullYear()}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${String(fecha.getDate()).padStart(2, '0')}`;
      return fechaFormateada.includes(filtro.valor);
    }
    return true;
  });

  return (
    <NoticiasContext.Provider value={{ formVisible, setFormVisible, adminActive, handleIniciarSesion, sesionModalVisible, setSesionModalVisible, noticias, guardarNoticia, filtro, setFiltro, noticiasFiltradas }}>
      {children}
    </NoticiasContext.Provider>
  );
};

export const useNoticias = () => {
  const context = useContext(NoticiasContext);
  if (!context) {
    throw new Error("useNoticias debe usarse dentro de un NoticiasProvider");
  }
  return context;
};
