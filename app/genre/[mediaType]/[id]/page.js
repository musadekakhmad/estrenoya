"use client";
import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';

const API_KEY = 'REEMPLAZA CON TU CLAVE DE API'; // <-- REEMPLAZA CON TU CLAVE DE API
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Componente principal
// ===================================

export default function GenrePage({ params }) {
  const { mediaType, id } = React.use(params);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState('Género Desconocido');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Función para obtener el nombre del género
  const fetchGenreName = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const json = await res.json();
      const name = json.genres.find(genre => genre.id === parseInt(id))?.name || 'Género Desconocido';
      setGenreName(name);
    } catch (err) {
      console.error("Error al obtener el género:", err);
    }
  }, [mediaType, id]);

  // Función para obtener medios por género con paginación
  const fetchMediaByGenre = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_genres=${id}&page=${page}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const json = await res.json();
      setData(prevData => [...prevData, ...json.results]);
      setHasMore(json.page < json.total_pages);
    } catch (err) {
      setError(err.message);
      console.error("Error al obtener los medios:", err);
      notFound();
    } finally {
      setLoading(false);
    }
  }, [mediaType, id, page]);

  // Obtención inicial de datos y del nombre del género
  useEffect(() => {
    fetchGenreName();
    fetchMediaByGenre();
  }, [fetchGenreName, fetchMediaByGenre]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const title = `${mediaType === 'movie' ? 'Películas' : 'Series de TV'} - ${genreName}`;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
        {title}
      </h1>
      
      {loading && data.length === 0 && <p className="text-center text-gray-400">Cargando...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}
      
      {data.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data.filter(item => item.poster_path).map((item) => (
              <MovieCard key={item.id} media={item} mediaType={mediaType} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Mostrar más'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
