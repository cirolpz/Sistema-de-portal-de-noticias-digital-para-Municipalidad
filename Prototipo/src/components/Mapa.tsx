import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNoticias } from '../Context/NoticiasContext';
import { useEffect, useState } from 'react';

type Coordenada = {
  lat: number;
  lng: number;
  direccion: string;
};

const Mapa = () => {
  const { noticias } = useNoticias();
  const [coordenadas, setCoordenadas] = useState<Coordenada[]>([]);

  useEffect(() => {
    const obtenerCoordenadas = async () => {
        const promesas = noticias.map(async (noticia) => {
          if (!noticia.direccion) return null;
      
          const url = `http://servicios.usig.buenosaires.gob.ar/normalizar?direccion=${encodeURIComponent(
            noticia.direccion
          )}`;
      
          try {
            const res = await fetch(url);
            const data = await res.json();
      
            const coords = data?.direccionesNormalizadas?.[0]?.coordenadas;
            if (coords) {
              return {
                lat: coords.y,
                lng: coords.x,
                direccion: noticia.direccion,
              };
            }
          } catch (error) {
            console.error("Error al obtener coordenadas de:", noticia.direccion, error);
          }
      
          return null;
        });
      
        const coords = (await Promise.all(promesas)).filter(Boolean) as Coordenada[];
        setCoordenadas(coords);
      };      
    obtenerCoordenadas();
  }, [noticias]);

  const centro: [number, number] = [-34.4921029, -58.657449];

  return (
    <div className="w-[40%] h-96 rounded-md overflow-hidden p-1">

      <MapContainer center={centro} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {coordenadas.map((coord, index) => (
          <Marker key={index} position={[coord.lat, coord.lng]}>
            <Popup>{coord.direccion}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
