"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// Base URL para la API
const API_KEY = 'REEMPLAZA CON TU CLAVE DE API'; // <-- REEMPLAZA CON TU CLAVE DE API
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hook para obtener datos de la API
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
      console.error("Error de obtención:", err);
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

  return { data, loading, error, hasMore, fetchMoreData };
};

// ===================================
// Componente Home
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
  
    // Logika untuk menampilkan 6 item pertama dan kemudian 20 item
    const displayData = data.slice(0, 6 + (hook.page - 2) * 20);
    const onLoadMore = () => {
      fetchMoreData();
    };

    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        {loading && data.length === 0 && <p className="text-center text-gray-400">Cargando {mediaType === 'movie' ? 'películas' : 'series de TV'}...</p>}
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
                  Mostrar más
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
      {/* Sección Hero */}
      <div className="relative mt-8 w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl" suppressHydrationWarning={true}>
        <img
          src="https://live.staticflickr.com/65535/54748591312_9316a1f42a_b.jpg"
          alt="Banner de Estreno Ya"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Estrenoya';
          }}
        />
      </div>
      
      {/* Contenedor de contenido principal con relleno */}
      <div className="px-4 md:px-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-12 text-blue-300 leading-tight md:text-3xl">
          Estreno Ya: El centro de películas y series de TV gratuitas y de alta calidad para ti.
        </h1>

        {/* Sección de Películas */}
        <h2 className="text-4xl font-extrabold text-white mt-8 mb-8 text-center">Películas</h2>

        {/* Sección de Películas Populares */}
        <CategorySection
          title="Películas Populares"
          hook={popularMovies}
          mediaType="movie"
        />

        {/* Sección de Películas Mejor Valoradas */}
        <CategorySection
          title="Películas Mejor Valoradas"
          hook={topRatedMovies}
          mediaType="movie"
        />

        {/* Sección de Próximas Películas */}
        <CategorySection
          title="Próximas Películas"
          hook={upcomingMovies}
          mediaType="movie"
        />
        
        {/* Sección de Películas en Cartelera */}
        <CategorySection
          title="Películas en Cartelera"
          hook={nowPlayingMovies}
          mediaType="movie"
        />

        {/* Sección de Series de TV */}
        <h2 className="text-4xl font-extrabold text-white mt-16 mb-8 text-center">Series de TV</h2>

        {/* Sección de Series de TV Populares */}
        <CategorySection
          title="Series de TV Populares"
          hook={popularTv}
          mediaType="tv"
        />

        {/* Sección de Series de TV Mejor Valoradas */}
        <CategorySection
          title="Series de TV Mejor Valoradas"
          hook={topRatedTv}
          mediaType="tv"
        />
        
        {/* Sección de Series de TV en el Aire */}
        <CategorySection
          title="Series de TV en el Aire"
          hook={onTheAirTv}
          mediaType="tv"
        />
        
        {/* Sección de Series de TV que se transmiten hoy */}
        <CategorySection
          title="Series de TV que se transmiten hoy"
          hook={airingTodayTv}
          mediaType="tv"
        />
      </div>
    </div>
  );
}
