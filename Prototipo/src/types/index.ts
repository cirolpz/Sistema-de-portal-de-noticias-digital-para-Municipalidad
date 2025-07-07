export interface Noticia {
    id: number;
    titulo: string;
    descripcion: string;
    fechaPublicacion: string;
    imagenes?: string[];
    autor: string
    cuerpo: string;
    direccion?: string;
  }