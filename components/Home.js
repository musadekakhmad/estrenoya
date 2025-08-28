// Home.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// URL base para la API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- REEMPLAZAR CON TU CLAVE API
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Hook Personalizado para obtener datos de la API
// ===================================

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Actualizar los datos agregando los nuevos resultados
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return { data, loading, error };
};

// ===================================
// Componente de Inicio
// ===================================

export default function Home() {
  // Estado para Películas Populares
  const [popularMoviesPage, setPopularMoviesPage] = useState(1);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [popularMoviesLoading, setPopularMoviesLoading] = useState(true);
  const [popularMoviesError, setPopularMoviesError] = useState(null);
  const [hasMorePopularMovies, setHasMorePopularMovies] = useState(true);
  const [popularMoviesDisplayCount, setPopularMoviesDisplayCount] = useState(6);

  // Estado para Películas Mejor Calificadas
  const [topRatedMoviesPage, setTopRatedMoviesPage] = useState(1);
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const [topRatedMoviesLoading, setTopRatedMoviesLoading] = useState(true);
  const [topRatedMoviesError, setTopRatedMoviesError] = useState(null);
  const [hasMoreTopRatedMovies, setHasMoreTopRatedMovies] = useState(true);
  const [topRatedMoviesDisplayCount, setTopRatedMoviesDisplayCount] = useState(6);

  // Estado para Próximos Estrenos de Películas
  const [upcomingMoviesPage, setUpcomingMoviesPage] = useState(1);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [upcomingMoviesLoading, setUpcomingMoviesLoading] = useState(true);
  const [upcomingMoviesError, setUpcomingMoviesError] = useState(null);
  const [hasMoreUpcomingMovies, setHasMoreUpcomingMovies] = useState(true);
  const [upcomingMoviesDisplayCount, setUpcomingMoviesDisplayCount] = useState(6);

  // Estado para Películas en cartelera ahora
  const [nowPlayingMoviesPage, setNowPlayingMoviesPage] = useState(1);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  const [nowPlayingMoviesLoading, setNowPlayingMoviesLoading] = useState(true);
  const [nowPlayingMoviesError, setNowPlayingMoviesError] = useState(null);
  const [hasMoreNowPlayingMovies, setHasMoreNowPlayingMovies] = useState(true);
  const [nowPlayingMoviesDisplayCount, setNowPlayingMoviesDisplayCount] = useState(6);

  // Estado para Series de TV Populares
  const [popularTvPage, setPopularTvPage] = useState(1);
  const [popularTvData, setPopularTvData] = useState([]);
  const [popularTvLoading, setPopularTvLoading] = useState(true);
  const [popularTvError, setPopularTvError] = useState(null);
  const [hasMorePopularTv, setHasMorePopularTv] = useState(true);
  const [popularTvDisplayCount, setPopularTvDisplayCount] = useState(6);

  // Estado para Series de TV Mejor Calificadas
  const [topRatedTvPage, setTopRatedTvPage] = useState(1);
  const [topRatedTvData, setTopRatedTvData] = useState([]);
  const [topRatedTvLoading, setTopRatedTvLoading] = useState(true);
  const [topRatedTvError, setTopRatedTvError] = useState(null);
  const [hasMoreTopRatedTv, setHasMoreTopRatedTv] = useState(true);
  const [topRatedTvDisplayCount, setTopRatedTvDisplayCount] = useState(6);

  // Estado para Series de TV en el aire
  const [onTheAirTvPage, setOnTheAirTvPage] = useState(1);
  const [onTheAirTvData, setOnTheAirTvData] = useState([]);
  const [onTheAirTvLoading, setOnTheAirTvLoading] = useState(true);
  const [onTheAirTvError, setOnTheAirTvError] = useState(null);
  const [hasMoreOnTheAirTv, setHasMoreOnTheAirTv] = useState(true);
  const [onTheAirTvDisplayCount, setOnTheAirTvDisplayCount] = useState(6);

  // Estado para Series de TV emitiendo hoy
  const [airingTodayTvPage, setAiringTodayTvPage] = useState(1);
  const [airingTodayTvData, setAiringTodayTvData] = useState([]);
  const [airingTodayTvLoading, setAiringTodayTvLoading] = useState(true);
  const [airingTodayTvError, setAiringTodayTvError] = useState(null);
  const [hasMoreAiringTodayTv, setHasMoreAiringTodayTv] = useState(true);
  const [airingTodayTvDisplayCount, setAiringTodayTvDisplayCount] = useState(6);

  // Función para obtener datos para una categoría específica de películas
  const fetchData = useCallback(async (category, page, setData, setLoading, setError, setHasMore) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Actualizar los datos agregando los nuevos resultados
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para obtener datos para una categoría específica de TV
  const fetchTvData = useCallback(async (category, page, setData, setLoading, setError, setHasMore) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/tv/${category}?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Actualizar los datos agregando los nuevos resultados
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtención inicial de datos al montar el componente
  useEffect(() => {
    fetchData('popular', popularMoviesPage, setPopularMoviesData, setPopularMoviesLoading, setPopularMoviesError, setHasMorePopularMovies);
    fetchData('top_rated', topRatedMoviesPage, setTopRatedMoviesData, setTopRatedMoviesLoading, setTopRatedMoviesError, setHasMoreTopRatedMovies);
    fetchData('upcoming', upcomingMoviesPage, setUpcomingMoviesData, setUpcomingMoviesLoading, setUpcomingMoviesError, setHasMoreUpcomingMovies);
    fetchData('now_playing', nowPlayingMoviesPage, setNowPlayingMoviesData, setNowPlayingMoviesLoading, setNowPlayingMoviesError, setHasMoreNowPlayingMovies);
    fetchTvData('popular', popularTvPage, setPopularTvData, setPopularTvLoading, setPopularTvError, setHasMorePopularTv);
    fetchTvData('top_rated', topRatedTvPage, setTopRatedTvData, setTopRatedTvLoading, setTopRatedTvError, setHasMoreTopRatedTv);
    fetchTvData('on_the_air', onTheAirTvPage, setOnTheAirTvData, setOnTheAirTvLoading, setOnTheAirTvError, setHasMoreOnTheAirTv);
    fetchTvData('airing_today', airingTodayTvPage, setAiringTodayTvData, setAiringTodayTvLoading, setAiringTodayTvError, setHasMoreAiringTodayTv);
  }, [
    fetchData,
    fetchTvData,
    popularMoviesPage,
    topRatedMoviesPage,
    upcomingMoviesPage,
    nowPlayingMoviesPage,
    popularTvPage,
    topRatedTvPage,
    onTheAirTvPage,
    airingTodayTvPage
  ]);

  // Manejar "cargar más" para Películas
  const handleLoadMorePopularMovies = () => {
    setPopularMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setPopularMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreTopRatedMovies = () => {
    setTopRatedMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setTopRatedMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreUpcomingMovies = () => {
    setUpcomingMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setUpcomingMoviesPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreNowPlayingMovies = () => {
    setNowPlayingMoviesDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setNowPlayingMoviesPage(prevPage => prevPage + 1);
  };

  // Manejar "cargar más" para Series de TV
  const handleLoadMorePopularTv = () => {
    setPopularTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setPopularTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreTopRatedTv = () => {
    setTopRatedTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setTopRatedTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreOnTheAirTv = () => {
    setOnTheAirTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setOnTheAirTvPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreAiringTodayTv = () => {
    setAiringTodayTvDisplayCount(prevCount => {
      if (prevCount === 6) {
        return 20;
      }
      return prevCount + 20;
    });
    setAiringTodayTvPage(prevPage => prevPage + 1);
  };

  const CategorySection = ({ title, data, loading, error, hasMore, onLoadMore, mediaType, displayCount }) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      {loading && <p className="text-center text-gray-400">Cargando {mediaType === 'movie' ? 'películas' : 'series de TV'}...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}
      {data.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data.filter(item => item.poster_path).slice(0, displayCount).map((item) => (
              <MovieCard key={item.id} media={item} mediaType={mediaType} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={onLoadMore}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
              >
                Mostrar Más
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );

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
                  e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Estreno Ya';
              }}
          />
      </div>
      
      {/* Contenedor principal de contenido con relleno */}
      <div className="px-4 md:px-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-12 text-blue-300 leading-tight md:text-3xl">
          Estreno Ya: El centro para películas y series de TV gratuitas y de alta calidad para ti.
        </h1>

        {/* Sección de Películas */}
        <h2 className="text-4xl font-extrabold text-white mt-8 mb-8 text-center">Películas</h2>

        {/* Sección de Películas Populares */}
        <CategorySection
          title="Películas Populares"
          data={popularMoviesData}
          loading={popularMoviesLoading}
          error={popularMoviesError}
          hasMore={hasMorePopularMovies}
          onLoadMore={handleLoadMorePopularMovies}
          mediaType="movie"
          displayCount={popularMoviesDisplayCount}
        />

        {/* Sección de Películas Mejor Calificadas */}
        <CategorySection
          title="Películas Mejor Calificadas"
          data={topRatedMoviesData}
          loading={topRatedMoviesLoading}
          error={topRatedMoviesError}
          hasMore={hasMoreTopRatedMovies}
          onLoadMore={handleLoadMoreTopRatedMovies}
          mediaType="movie"
          displayCount={topRatedMoviesDisplayCount}
        />

        {/* Sección de Próximos Estrenos */}
        <CategorySection
          title="Próximos Estrenos"
          data={upcomingMoviesData}
          loading={upcomingMoviesLoading}
          error={upcomingMoviesError}
          hasMore={hasMoreUpcomingMovies}
          onLoadMore={handleLoadMoreUpcomingMovies}
          mediaType="movie"
          displayCount={upcomingMoviesDisplayCount}
        />
        
        {/* Sección de Películas en Cartelera Ahora */}
        <CategorySection
          title="En Cartelera Ahora"
          data={nowPlayingMoviesData}
          loading={nowPlayingMoviesLoading}
          error={nowPlayingMoviesError}
          hasMore={hasMoreNowPlayingMovies}
          onLoadMore={handleLoadMoreNowPlayingMovies}
          mediaType="movie"
          displayCount={nowPlayingMoviesDisplayCount}
        />

        {/* Sección de Series de TV */}
        <h2 className="text-4xl font-extrabold text-white mt-16 mb-8 text-center">Series de TV</h2>

        {/* Sección de Series de TV Populares */}
        <CategorySection
          title="Series de TV Populares"
          data={popularTvData}
          loading={popularTvLoading}
          error={popularTvError}
          hasMore={hasMorePopularTv}
          onLoadMore={handleLoadMorePopularTv}
          mediaType="tv"
          displayCount={popularTvDisplayCount}
        />

        {/* Sección de Series de TV Mejor Calificadas */}
        <CategorySection
          title="Series de TV Mejor Calificadas"
          data={topRatedTvData}
          loading={topRatedTvLoading}
          error={topRatedTvError}
          hasMore={hasMoreTopRatedTv}
          onLoadMore={handleLoadMoreTopRatedTv}
          mediaType="tv"
          displayCount={topRatedTvDisplayCount}
        />
        
        {/* Sección de Series de TV en el Aire */}
        <CategorySection
          title="Series de TV en el Aire"
          data={onTheAirTvData}
          loading={onTheAirTvLoading}
          error={onTheAirTvError}
          hasMore={hasMoreOnTheAirTv}
          onLoadMore={handleLoadMoreOnTheAirTv}
          mediaType="tv"
          displayCount={onTheAirTvDisplayCount}
        />
        
        {/* Sección de Series de TV Emitiendo Hoy */}
        <CategorySection
          title="Series de TV Emitiendo Hoy"
          data={airingTodayTvData}
          loading={airingTodayTvLoading}
          error={airingTodayTvError}
          hasMore={hasMoreAiringTodayTv}
          onLoadMore={handleLoadMoreAiringTodayTv}
          mediaType="tv"
          displayCount={airingTodayTvDisplayCount}
        />
      </div>
    </div>
  );
}
