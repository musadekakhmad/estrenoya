"use client";
import { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard'; // Import komponen MovieCard yang baru

// Kunci API tidak diperlukan di sini karena kita menggunakan URL proxy
const API_KEY = '';
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Custom Hooks
// ===================================

/**
 * Custom hook untuk mengambil data dari API secara efisien.
 * Menggunakan useCallback untuk mencegah re-render yang tidak perlu.
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
// Komponen Halaman Utama
// ===================================
const HomePage = () => {
  const { data, loading, error } = useFetch(`${BASE_URL}/movie/popular`);

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div id="hero-section" className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <figure>
              <img
                  src="https://live.staticflickr.com/65535/54702086138_3eb083fcde_b.jpg"
                  alt="Estreno Ya Movie Streaming Banner"
                  srcSet="
                      https://live.staticflickr.com/65535/54702086138_3eb083fcde_b.jpg 1024w,
                      https://live.staticflickr.com/65535/54702086138_3eb083fcde_b.jpg 500w,
                      https://live.staticflickr.com/65535/54702086138_3eb083fcde_b.jpg 240w
                  "
                  sizes="(max-width: 600px) 100vw, 1024px"
                  loading="lazy"
                  className="w-full h-auto object-cover mx-auto block"
              />
          </figure>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Estreno Ya: Streaming Film & Acara TV HD Gratis</h1>
        <p className="text-gray-300 text-justify">
          Estreno Ya adalah tujuan utama Anda untuk streaming film dan acara TV berkualitas tinggi secara gratis. Jelajahi koleksi ekstensif film populer, film trending, dan serial TV yang paling banyak dibicarakan. Dengan antarmuka yang mudah digunakan dan pemutar video yang lancar, kami memastikan pengalaman menonton yang menyenangkan. Mulai streaming hari ini!
        </p>
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
          Film Populer
      </h2>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>Terjadi kesalahan saat mengambil data: {error}. Pastikan Anda memiliki kunci API yang valid dan koneksi internet yang stabil.</p>
        </div>
      )}

      {!loading && !error && data && data.results && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.results.map(item => (
            <MovieCard key={item.id} media={item} mediaType={'movie'} />
          ))}
        </div>
      )}
    </main>
  );
};


export default HomePage;
