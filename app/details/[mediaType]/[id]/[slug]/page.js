import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import MovieDetailInfo from '@/components/MovieDetailInfo';
import MovieImage from '@/components/MovieImage';
import WatchNowButton from '@/components/WatchNowButton';

// Configuración de la API
const API_KEY = ''; // <-- REEMPLACE CON SU CLAVE API, atau biarkan kosong jika menggunakan proxy
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ====================================================================================
// FUNCIÓN PARA OBTENER METADATOS DINÁMICOS (Importante para SEO)
// Esto es un Componente de Servidor, así que no hay 'use client'
// ====================================================================================
export async function generateMetadata({ params }) {
  const { mediaType, id } = params;

  // Usar try/catch para el manejo de errores
  try {
    const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      throw new Error('Failed to fetch movie data');
    }
    const data = await res.json();
    const mediaTitle = data.title || data.name;

    return {
      title: `${mediaTitle} | Estreno Ya`,
      description: data.overview || `Información sobre ${mediaTitle} en Estreno Ya.`,
    };
  } catch (err) {
    console.error('Error fetching metadata:', err);
    return {
      title: 'Page Not Found | Estreno Ya',
      description: 'The page you are looking for was not found.',
    };
  }
}

// ====================================================================================
// COMPONENTE PRINCIPAL (COMPONENTE DE SERVIDOR)
// ====================================================================================
export default async function MediaDetailPage({ params }) {
  const { mediaType, id, slug } = params;

  // Obtener datos del lado del servidor
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();

  // Obtener datos para recomendaciones
  const recommendationsRes = await fetch(`${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}`);
  const recommendationsData = await recommendationsRes.json();
  const recommendations = recommendationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mostrar detalles del medio */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})` }}
        ></div>
        <div className="relative container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Componente para la imagen (puede ser un Componente Cliente separado) */}
          <MovieImage movie={data} />
          {/* Componente para la información de detalles (también puede ser un Componente Cliente) */}
          <MovieDetailInfo movie={data} />
        </div>
      </div>

      {/* Componente del botón 'Ver ahora' (debe ser un Componente Cliente) */}
      <WatchNowButton movieId={id} />

      {/* Recomendaciones */}
      <section className="container mx-auto p-4 md:p-8 mt-12">
        <h2 className="text-3xl font-bold mb-6">Recomendaciones</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {recommendations.slice(0, 12).map((media) => (
              <MovieCard key={media.id} media={media} mediaType={media.media_type} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No hay recomendaciones disponibles.</p>
        )}
      </section>
    </div>
  );
}
