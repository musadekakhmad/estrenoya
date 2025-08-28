import { notFound } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import MovieDetailInfo from '@/components/MovieDetailInfo';
import MovieImage from '@/components/MovieImage';
import WatchNowButton from '@/components/WatchNowButton';

// Konfigurasi API
// <-- PASTIKAN GANTI INI DENGAN KUNCI API ANDA
const API_KEY = 'tmdb-api-proxy.argoyuwono119.workers.dev'; 
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ====================================================================================
// FUNGSI UNTUK MENDAPATKAN METADATA DINAMIS (Penting untuk SEO)
// ====================================================================================
export async function generateMetadata({ params }) {
  const { mediaType, id } = params;

  try {
    const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
    if (!res.ok) {
      throw new Error('Gagal mengambil data media');
    }
    const data = await res.json();
    const mediaTitle = data.title || data.name;

    return {
      title: `${mediaTitle} | Estreno Ya`,
      description: data.overview || `Información sobre ${mediaTitle} en Estreno Ya.`,
    };
  } catch (err) {
    console.error('Error al obtener metadatos:', err);
    return {
      title: 'Página no encontrada | Estreno Ya',
      description: 'La página que buscas no se ha encontrado.',
    };
  }
}

// ====================================================================================
// KOMPONEN UTAMA
// ====================================================================================
export default async function MediaDetailPage({ params }) {
  const { mediaType, id, slug } = params;

  // Mendapatkan data di sisi server
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    console.error(`Error al obtener detalles de ${mediaType} con ID ${id}. Estado: ${res.status}`);
    notFound();
  }
  const data = await res.json();

  // Mendapatkan data untuk rekomendasi
  // Menggunakan URL yang berbeda, karena URL proxy tidak mendukung endpoint rekomendasi
  const recommendationsRes = await fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${API_KEY}`);
  const recommendationsData = await recommendationsRes.json();
  const recommendations = recommendationsData?.results || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Menampilkan detail media */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})` }}
        ></div>
        <div className="relative container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <MovieImage movie={data} />
          <MovieDetailInfo movie={data} />
        </div>
      </div>

      {/* Tombol Tonton Sekarang */}
      <WatchNowButton movieId={id} />

      {/* Rekomendasi */}
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
