// components/MovieCard.js
import Link from 'next/link';
import MovieImage from './MovieImage';

// Una función para crear un "slug" limpio y amigable para SEO a partir de un título.
const createSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Eliminar caracteres no alfanuméricos.
    .replace(/[\s_]+/g, '-') // Reemplazar espacios y guiones bajos con guiones.
    .replace(/--+/g, '-') // Reemplazar múltiples guiones con uno solo.
    .trim(); // Eliminar espacios iniciales/finales.
};

const MovieCard = ({ media, mediaType }) => {
  // Una comprobación más robusta para asegurar que el objeto 'media' y su título son válidos.
  if (!media || (!media.title && !media.name)) {
    console.error("MovieCard fue renderizado con un 'media' indefinido o sin título/nombre.");
    return null;
  }

  // Determinar el tipo de medio correcto, con una reserva a 'movie' si no se proporciona ninguno.
  const correctMediaType = mediaType || media.media_type || 'movie';

  // Obtener el ID y el título de los datos del medio.
  const id = media.id;
  const title = media.title || media.name;
  
  // Crear un slug a partir del título para la URL.
  const slug = createSlug(title);

  // Asegurarse de que el ID y el slug estén disponibles antes de renderizar.
  if (!id || !slug) {
    return null; // No renderizar si los datos están incompletos.
  }

  // Construir la URL con el correctMediaType, ID y slug.
  const mediaUrl = `/${correctMediaType}/${id}/${slug}`;

  return (
    <Link href={mediaUrl} passHref className="block rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gray-800">
      <div className="relative w-full h-auto">
        <MovieImage
          src={media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : 'https://placehold.co/500x750?text=No+Image'}
          alt={`Póster para ${title}`}
          className="w-full h-auto object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80"></div>
        {media.vote_average > 0 && (
          <div className="absolute top-2 right-2 flex items-center bg-gray-900/70 text-yellow-400 text-sm font-semibold p-1 rounded-full backdrop-blur-sm">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{media.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white leading-tight truncate">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {correctMediaType === 'movie' ? media.release_date?.substring(0, 4) : media.first_air_date?.substring(0, 4)}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
