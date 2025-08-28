"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// Base URL untuk API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- GANTI DENGAN KUNCI API ANDA
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hook untuk mendapatkan data API
// ===================================
const useFetch = (initialUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const url = `${initialUrl}&page=${page}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      setData(prevData => [...prevData, ...json.results]);
      setPage(prevPage => prevPage + 1);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [initialUrl, page, hasMore, loading]);

  useEffect(() => {
    // Panggil fetchMoreData untuk data awal saat komponen dimuat
    if (page === 1) {
      fetchMoreData();
    }
  }, [fetchMoreData, page]);

  return { data, loading, error, hasMore, fetchMoreData, page };
};

// ===================================
// Komponen Home
// ===================================
export default function Home() {
  const popularMovies = useFetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const topRatedMovies = useFetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const upcomingMovies = useFetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const nowPlayingMovies = useFetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const popularTv = useFetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const topRatedTv = useFetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  const onTheAirTv = useFetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
  const airingTodayTv = useFetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);

  const CategorySection = ({ title, hook, mediaType }) => {
    const { data, loading, error, hasMore, fetchMoreData } = hook;
    
    // Logic untuk menampilkan 6 item pertama dan kemudian 20 item
    const displayCount = 6 + (hook.page - 2) * 20;
    const displayData = data.slice(0, displayCount);

    const onLoadMore = () => {
      fetchMoreData();
    };

    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        {loading && data.length === 0 && <p className="text-center text-gray-400">Memuat {mediaType === 'movie' ? 'film' : 'serial TV'}...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        {data.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {displayData.filter(item => item.poster_path).map((item) => (
                <MovieCard key={item.id} media={item} mediaType={mediaType} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={onLoadMore}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
                >
                  Tampilkan Lebih Banyak
                </button>
              </div>
            )}
          </>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Bagian Hero */}
      <div className="relative mt-8 w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl" suppressHydrationWarning={true}>
        <img
          src="https://live.staticflickr.com/65535/54748591312_9316a1f42a_b.jpg"
          alt="Spanduk Estreno Ya"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Estrenoya';
          }}
        />
      </div>
      
      {/* Kontainer konten utama dengan padding */}
      <div className="px-4 md:px-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-12 text-blue-300 leading-tight md:text-3xl">
          Estreno Ya: Pusat film dan serial TV gratis dan berkualitas tinggi untuk Anda.
        </h1>

        {/* Bagian Film */}
        <h2 className="text-4xl font-extrabold text-white mt-8 mb-8 text-center">Film</h2>

        {/* Bagian Film Populer */}
        <CategorySection
          title="Film Populer"
          hook={popularMovies}
          mediaType="movie"
        />

        {/* Bagian Film Terbaik */}
        <CategorySection
          title="Film Terbaik"
          hook={topRatedMovies}
          mediaType="movie"
        />

        {/* Bagian Film yang Akan Datang */}
        <CategorySection
          title="Film yang Akan Datang"
          hook={upcomingMovies}
          mediaType="movie"
        />
        
        {/* Bagian Film yang Sedang Tayang */}
        <CategorySection
          title="Film yang Sedang Tayang"
          hook={nowPlayingMovies}
          mediaType="movie"
        />

        {/* Bagian Serial TV */}
        <h2 className="text-4xl font-extrabold text-white mt-16 mb-8 text-center">Serial TV</h2>

        {/* Bagian Serial TV Populer */}
        <CategorySection
          title="Serial TV Populer"
          hook={popularTv}
          mediaType="tv"
        />

        {/* Bagian Serial TV Terbaik */}
        <CategorySection
          title="Serial TV Terbaik"
          hook={topRatedTv}
          mediaType="tv"
        />
        
        {/* Bagian Serial TV yang Sedang Tayang */}
        <CategorySection
          title="Serial TV yang Sedang Tayang"
          hook={onTheAirTv}
          mediaType="tv"
        />
        
        {/* Bagian Serial TV yang Tayang Hari Ini */}
        <CategorySection
          title="Serial TV yang Tayang Hari Ini"
          hook={airingTodayTv}
          mediaType="tv"
        />
      </div>
    </div>
  );
}
