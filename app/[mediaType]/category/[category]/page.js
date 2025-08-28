import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';

const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- PASTIKAN GANTI INI DENGAN KUNCI API ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// Fungsi untuk mendapatkan data berdasarkan jenis media dan kategori
async function getMediaByCategory(mediaType, category) {
  try {
    const res = await fetch(`${BASE_URL}/${mediaType}/${category}?api_key=${API_KEY}`);
    if (!res.ok) {
      // Jika respons tidak OK, melempar error yang akan ditangkap oleh blok catch
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    // Menangani error fetch dan memanggil notFound()
    console.error("Fetch error in getMediaByCategory:", error);
    notFound();
  }
}

export default async function CategoryPage({ params }) {
  // Destrukturisasi parameter secara langsung
  const { mediaType, category } = params;
  
  const data = await getMediaByCategory(mediaType, category);

  // Periksa apakah data dan hasilnya ada sebelum merender
  if (!data || !data.results) {
    notFound();
  }

  // Mengatur judul, mengganti underscore dengan spasi dan mengubahnya menjadi huruf kapital
  const title = `${category.replace(/_/g, ' ').toUpperCase()} ${mediaType === 'movie' ? 'PELÍCULAS' : 'PROGRAMAS DE TV'}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        {title}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.results.map(item => (
          // Memastikan mediaType diteruskan sebagai 'movie' atau 'tv'
          <MovieCard key={item.id} media={item} mediaType={mediaType} />
        ))}
      </div>
    </div>
  );
}
