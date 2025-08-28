// Home.js
"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// Base URL for the API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- REPLACE WITH YOUR API KEY
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hook to fetch API data
// ===================================

const useFetch = (url, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      // Update the data by appending the new results
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

  return { data, loading, error, hasMore, fetchData };
};

// ===================================
// Kategori Media
// ===================================

const CategorySection = ({ title, data, loading, error, hasMore, onLoadMore, mediaType, displayCount }) => {
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>Hubo un error al cargar {title}.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto p-4 md:p-8 mt-4">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.slice(0, displayCount).map((media) => (
          <MovieCard key={media.id} media={media} mediaType={mediaType} />
        ))}
      </div>
      {loading && (
        <div className="text-center p-4 mt-4">
          <p>Cargando...</p>
        </div>
      )}
      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 rounded-full bg-yellow-500 text-gray-900 font-semibold hover:bg-yellow-600 transition-colors duration-300"
          >
            Cargar Más
          </button>
        </div>
      )}
    </section>
  );
};

export default function Home() {
  const [popularMoviesDisplayCount, setPopularMoviesDisplayCount] = useState(6);
  const [topRatedMoviesDisplayCount, setTopRatedMoviesDisplayCount] = useState(6);
  const [nowPlayingMoviesDisplayCount, setNowPlayingMoviesDisplayCount] = useState(6);
  const [upcomingMoviesDisplayCount, setUpcomingMoviesDisplayCount] = useState(6);
  const [popularTvDisplayCount, setPopularTvDisplayCount] = useState(6);
  const [topRatedTvDisplayCount, setTopRatedTvDisplayCount] = useState(6);
  const [onTheAirTvDisplayCount, setOnTheAirTvDisplayCount] = useState(6);
  const [airingTodayTvDisplayCount, setAiringTodayTvDisplayCount] = useState(6);

  const { data: popularMoviesData, loading: popularMoviesLoading, error: popularMoviesError, hasMore: hasMorePopularMovies, fetchData: fetchPopularMovies } = useFetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const { data: topRatedMoviesData, loading: topRatedMoviesLoading, error: topRatedMoviesError, hasMore: hasMoreTopRatedMovies, fetchData: fetchTopRatedMovies } = useFetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const { data: nowPlayingMoviesData, loading: nowPlayingMoviesLoading, error: nowPlayingMoviesError, hasMore: hasMoreNowPlayingMovies, fetchData: fetchNowPlayingMovies } = useFetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const { data: upcomingMoviesData, loading: upcomingMoviesLoading, error: upcomingMoviesError, hasMore: hasMoreUpcomingMovies, fetchData: fetchUpcomingMovies } = useFetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const { data: popularTvData, loading: popularTvLoading, error: popularTvError, hasMore: hasMorePopularTv, fetchData: fetchPopularTv } = useFetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const { data: topRatedTvData, loading: topRatedTvLoading, error: topRatedTvError, hasMore: hasMoreTopRatedTv, fetchData: fetchTopRatedTv } = useFetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  const { data: onTheAirTvData, loading: onTheAirTvLoading, error: onTheAirTvError, hasMore: hasMoreOnTheAirTv, fetchData: fetchOnTheAirTv } = useFetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
  const { data: airingTodayTvData, loading: airingTodayTvLoading, error: airingTodayTvError, hasMore: hasMoreAiringTodayTv, fetchData: fetchAiringTodayTv } = useFetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);

  const handleLoadMorePopularMovies = () => {
    const newCount = popularMoviesDisplayCount + 6;
    setPopularMoviesDisplayCount(newCount);
    if (newCount >= popularMoviesData.length && hasMorePopularMovies) {
      fetchPopularMovies();
    }
  };

  const handleLoadMoreTopRatedMovies = () => {
    const newCount = topRatedMoviesDisplayCount + 6;
    setTopRatedMoviesDisplayCount(newCount);
    if (newCount >= topRatedMoviesData.length && hasMoreTopRatedMovies) {
      fetchTopRatedMovies();
    }
  };

  const handleLoadMoreNowPlayingMovies = () => {
    const newCount = nowPlayingMoviesDisplayCount + 6;
    setNowPlayingMoviesDisplayCount(newCount);
    if (newCount >= nowPlayingMoviesData.length && hasMoreNowPlayingMovies) {
      fetchNowPlayingMovies();
    }
  };

  const handleLoadMoreUpcomingMovies = () => {
    const newCount = upcomingMoviesDisplayCount + 6;
    setUpcomingMoviesDisplayCount(newCount);
    if (newCount >= upcomingMoviesData.length && hasMoreUpcomingMovies) {
      fetchUpcomingMovies();
    }
  };

  const handleLoadMorePopularTv = () => {
    const newCount = popularTvDisplayCount + 6;
    setPopularTvDisplayCount(newCount);
    if (newCount >= popularTvData.length && hasMorePopularTv) {
      fetchPopularTv();
    }
  };

  const handleLoadMoreTopRatedTv = () => {
    const newCount = topRatedTvDisplayCount + 6;
    setTopRatedTvDisplayCount(newCount);
    if (newCount >= topRatedTvData.length && hasMoreTopRatedTv) {
      fetchTopRatedTv();
    }
  };

  const handleLoadMoreOnTheAirTv = () => {
    const newCount = onTheAirTvDisplayCount + 6;
    setOnTheAirTvDisplayCount(newCount);
    if (newCount >= onTheAirTvData.length && hasMoreOnTheAirTv) {
      fetchOnTheAirTv();
    }
  };

  const handleLoadMoreAiringTodayTv = () => {
    const newCount = airingTodayTvDisplayCount + 6;
    setAiringTodayTvDisplayCount(newCount);
    if (newCount >= airingTodayTvData.length && hasMoreAiringTodayTv) {
      fetchAiringTodayTv();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 pt-8">
        Descubre Películas y Series de TV
      </h1>

      {/* Popular Movies Section */}
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

      {/* Top Rated Movies Section */}
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

      {/* Now Playing Movies Section */}
      <CategorySection
        title="Películas en Cartelera"
        data={nowPlayingMoviesData}
        loading={nowPlayingMoviesLoading}
        error={nowPlayingMoviesError}
        hasMore={hasMoreNowPlayingMovies}
        onLoadMore={handleLoadMoreNowPlayingMovies}
        mediaType="movie"
        displayCount={nowPlayingMoviesDisplayCount}
      />

      {/* Upcoming Movies Section */}
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

      {/* Popular TV Shows Section */}
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

      {/* Top Rated TV Shows Section */}
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
      
      {/* On The Air TV Shows Section */}
      <CategorySection
        title="Series de TV en Emisión"
        data={onTheAirTvData}
        loading={onTheAirTvLoading}
        error={onTheAirTvError}
        hasMore={hasMoreOnTheAirTv}
        onLoadMore={handleLoadMoreOnTheAirTv}
        mediaType="tv"
        displayCount={onTheAirTvDisplayCount}
      />
      
      {/* Airing Today TV Shows Section */}
      <CategorySection
        title="Series de TV que Se Emiten Hoy"
        data={airingTodayTvData}
        loading={airingTodayTvLoading}
        error={airingTodayTvError}
        hasMore={hasMoreAiringTodayTv}
        onLoadMore={handleLoadMoreAiringTodayTv}
        mediaType="tv"
        displayCount={airingTodayTvDisplayCount}
      />
    </div>
  );
}
