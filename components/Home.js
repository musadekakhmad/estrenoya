// Home.js
"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';

// URL dasar untuk API
const API_KEY = 'ISI DENGAN API KEY ANDA'; // <-- REEMPLAZAR CON TU CLAVE API
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ===================================
// Hook Kustom untuk Mengelola Fetching Data
// ===================================

const useFetchCategories = (categories) => {
  const [categoryData, setCategoryData] = useState({});

  // Fungsi untuk mengambil data dari API
  const fetchData = useCallback(async (cat, page) => {
    const key = `${cat.mediaType}_${cat.category}`;
    
    setCategoryData(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || { data: [], displayCount: 6, currentPage: 0 }),
        loading: true,
        error: null,
      }
    }));

    try {
      const response = await fetch(`${BASE_URL}/${cat.mediaType}/${cat.category}?api_key=${API_KEY}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      
      setCategoryData(prev => {
        const existingData = prev[key]?.data || [];
        const newData = json.results || [];
        
        // Menggabungkan data yang ada dengan data baru
        const combinedData = [...existingData, ...newData];

        // Menggunakan Map untuk menghapus duplikat berdasarkan ID item
        const uniqueDataMap = new Map();
        combinedData.forEach(item => {
          uniqueDataMap.set(item.id, item);
        });

        // Mengonversi kembali Map menjadi array
        const uniqueData = Array.from(uniqueDataMap.values());

        return {
          ...prev,
          [key]: {
            ...prev[key],
            data: uniqueData,
            hasMore: json.page < json.total_pages,
            loading: false,
            currentPage: page,
          }
        };
      });
    } catch (err) {
      console.error("Fetch error:", err);
      setCategoryData(prev => ({
        ...prev,
        [key]: {
          ...(prev[key] || { data: [], displayCount: 6, currentPage: 0 }),
          error: err.message,
          loading: false,
        }
      }));
    }
  }, []);

  // Efek untuk mengambil data awal
  useEffect(() => {
    categories.forEach(cat => {
        const key = `${cat.mediaType}_${cat.category}`;
        if (!categoryData[key] || categoryData[key].data.length === 0) {
            fetchData(cat, 1);
        }
    });
  }, [categories]); // Hanya jalankan sekali saat komponen dipasang

  // Handler untuk tombol "Mostrar Más"
  const handleLoadMore = useCallback((cat) => {
    const key = `${cat.mediaType}_${cat.category}`;
    const currentPage = (categoryData[key]?.currentPage || 1) + 1;
    const newDisplayCount = (categoryData[key]?.displayCount || 6) + 20;

    setCategoryData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        displayCount: newDisplayCount,
      }
    }));
    
    fetchData(cat, currentPage);

  }, [categoryData, fetchData]);

  // Mengembalikan data dan handler
  const data = {};
  const loading = {};
  const error = {};
  const hasMore = {};
  const displayCounts = {};

  Object.keys(categoryData).forEach(key => {
    data[key] = categoryData[key].data;
    loading[key] = categoryData[key].loading;
    error[key] = categoryData[key].error;
    hasMore[key] = categoryData[key].hasMore;
    displayCounts[key] = categoryData[key].displayCount;
  });

  return { data, loading, error, hasMore, handleLoadMore, displayCounts };
};

// ===================================
// Komponen Utama Halaman
// ===================================

const movieCategories = [
  { title: "Películas Populares", category: "popular", mediaType: "movie" },
  { title: "Películas Mejor Calificadas", category: "top_rated", mediaType: "movie" },
  { title: "Próximos Estrenos", category: "upcoming", mediaType: "movie" },
  { title: "En Cartelera Ahora", category: "now_playing", mediaType: "movie" },
];

const tvCategories = [
  { title: "Series de TV Populares", category: "popular", mediaType: "tv" },
  { title: "Series de TV Mejor Calificadas", category: "top_rated", mediaType: "tv" },
  { title: "Series de TV en el Aire", category: "on_the_air", mediaType: "tv" },
  { title: "Series de TV Emitiendo Hoy", category: "airing_today", mediaType: "tv" },
];

export default function Home() {
  const allCategories = [...movieCategories, ...tvCategories];
  const { data, loading, error, hasMore, handleLoadMore, displayCounts } = useFetchCategories(allCategories);

  const CategorySection = ({ title, data, loading, error, hasMore, onLoadMore, mediaType, displayCount }) => (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      {loading && data.length === 0 && <p className="text-center text-gray-400">Cargando {mediaType === 'movie' ? 'películas' : 'series de TV'}...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}
      {data.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {data.filter(item => item.poster_path).slice(0, displayCount).map((item) => (
              <MovieCard key={`${item.id}-${mediaType}`} media={item} mediaType={mediaType} />
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
      
      {/* Konten utama */}
      <div className="px-4 md:px-8">
        <h1 className="text-2xl font-bold text-center mt-8 mb-12 text-blue-300 leading-tight md:text-3xl">
          Estreno Ya: El centro para películas y series de TV gratuitas y de alta calidad para ti.
        </h1>

        {/* Bagian Film */}
        <h2 className="text-4xl font-extrabold text-white mt-8 mb-8 text-center">Películas</h2>
        {movieCategories.map(cat => {
          const key = `${cat.mediaType}_${cat.category}`;
          return (
            <CategorySection
              key={key}
              title={cat.title}
              data={data[key] || []}
              loading={loading[key]}
              error={error[key]}
              hasMore={hasMore[key]}
              onLoadMore={() => handleLoadMore(cat)}
              mediaType={cat.mediaType}
              displayCount={displayCounts[key]}
            />
          );
        })}

        {/* Bagian TV Series */}
        <h2 className="text-4xl font-extrabold text-white mt-16 mb-8 text-center">Series de TV</h2>
        {tvCategories.map(cat => {
          const key = `${cat.mediaType}_${cat.category}`;
          return (
            <CategorySection
              key={key}
              title={cat.title}
              data={data[key] || []}
              loading={loading[key]}
              error={error[key]}
              hasMore={hasMore[key]}
              onLoadMore={() => handleLoadMore(cat)}
              mediaType={cat.mediaType}
              displayCount={displayCounts[key]}
            />
          );
        })}
      </div>
    </div>
  );
}
