"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// URL base para la API
const API_KEY = ''; // <-- REEMPLAZAR CON TU CLAVE API
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Hook Personalizado para Obtener Datos
// ===================================

/**
 * Hook personalizado para obtener datos de la API de manera eficiente.
 */
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
      setData(json);
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
// Página de Búsqueda
// ===================================

export default function SearchPage({ params }) {
  // Manejar la advertencia usando React.use()
  const resolvedParams = React.use(params);
  const searchQuery = resolvedParams.query;
  const { data, loading, error } = useFetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(searchQuery)}&api_key=${API_KEY}`);

  if (!searchQuery) {
    return (
      <div className="text-center p-8 text-white">
        <h1 className="text-2xl mb-4">Por favor, introduzca palabras clave para la búsqueda.</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-8 text-white">
        <h1 className="text-2xl mb-4">Buscando resultados para "{searchQuery}"...</h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h1 className="text-2xl mb-4">Ha ocurrido un error.</h1>
        <p>No se pudieron cargar los resultados de la búsqueda.</p>
      </div>
    );
  }

  if (data && data.results.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        <h1 className="text-2xl mb-4">No se encontraron resultados para "{searchQuery}".</h1>
        <p>Intente otra palabra clave o revise su ortografía.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Resultados de la Búsqueda para "{searchQuery}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.results
          .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
          .filter(item => item.poster_path)
          .map((item) => (
            <MovieCard key={item.id} media={item} mediaType={item.media_type} />
          ))}
      </div>
    </div>
  );
}
