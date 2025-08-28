import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';

const API_KEY = '';
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// Función para obtener datos por mediaType y categoría
async function getMediaByCategory(mediaType, category) {
  // Cambiar la URL de la API para que coincida con la categoría, no con el género.
  const res = await fetch(`${BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function CategoryPage({ params }) {
  // Esperar el objeto params antes de desestructurar sus propiedades.
  // Esto es necesario en Next.js 14 para evitar errores de acceso asíncrono.
  const awaitedParams = await params;
  const { mediaType, category } = awaitedParams;
  
  const data = await getMediaByCategory(mediaType, category);

  const title = `${category.replace(/_/g, ' ').toUpperCase()} ${mediaType === 'movie' ? 'Películas' : 'Series de TV'}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        {title}
      </h1>

      {data && data.results && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.results.map(item => (
            <MovieCard key={item.id} media={item} mediaType={mediaType} />
          ))}
        </div>
      )}
    </div>
  );
}
