// app/details/[mediaType]/[id]/[slug]/page.js

import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import MovieDetailInfo from '@/components/MovieDetailInfo';
import MovieImage from '@/components/MovieImage';
import WatchNowButton from '@/components/WatchNowButton';

// API Configuration
const API_KEY = ''; // <-- PLEASE FILL WITH YOUR API KEY HERE
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ====================================================================================
// FUNCTION TO GET DYNAMIC METADATA (Important for SEO)
// This is a Server Component, so there is no 'use client'
// ====================================================================================
export async function generateMetadata({ params }) {
  const { mediaType, id } = params;

  // Use try/catch for error handling
  try {
    const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      throw new Error('Failed to fetch media data');
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
      title: 'Página no encontrada | Estreno Ya',
      description: 'La página que buscas no se ha encontrado.',
    };
  }
}

// ====================================================================================
// MAIN COMPONENT (SERVER COMPONENT)
// ====================================================================================
export default async function MediaDetailPage({ params }) {
  const { mediaType, id, slug } = params;

  // Fetch data on the server side
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();

  // Fetch data for recommendations
  const recommendationsRes = await fetch(`${BASE_URL}/${mediaType}/${id}/recommendations?api_key=${API_KEY}`);
  const recommendationsData = await recommendationsRes.json();
  const recommendations = recommendationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Display media details */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})` }}
        ></div>
        <div className="relative container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Component for the image (this could be a separate Client Component) */}
          <MovieImage movie={data} />
          {/* Component for the detailed info (also could be a Client Component) */}
          <MovieDetailInfo movie={data} />
        </div>
      </div>

      {/* Watch now button component (this must be a Client Component) */}
      <WatchNowButton movieId={id} />

      {/* Recommendations */}
      <section className="container mx-auto p-4 md:p-8 mt-12">
        <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
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
