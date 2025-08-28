import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';

const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- PASTIKAN GANTI INI DENGAN KUNCI API ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// Función para obtener los datos por tipo y categoría
async function getMediaByCategory(mediaType, category) {
  try {
    const res = await fetch(`${BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}`);
    if (!res.ok) {
      // Si la respuesta no es OK, lanzar un error que será capturado por el bloque catch
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Manejar el error de la solicitud y llamar a notFound()
    console.error("Fetch error in getMediaByCategory:", error);
    notFound();
  }
}

export default async function CategoryPage({ params }) {
  // Destructurar los parámetros directamente, no se necesita `await`
  const { mediaType, category } = params;
  
  const data = await getMediaByCategory(mediaType, category);

  // Verificar si hay datos y resultados antes de renderizar
  if (!data || !data.results) {
    notFound();
  }

  // Configurar el título, reemplazando los guiones bajos con espacios y poniéndolo en mayúsculas
  const title = `${category.replace(/_/g, ' ').toUpperCase()} ${mediaType === 'movie' ? 'PELÍCULAS' : 'PROGRAMAS DE TV'}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        {title}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.results.map(item => (
          <MovieCard key={item.id} media={item} mediaType={mediaType} />
        ))}
      </div>
    </div>
  );
}
