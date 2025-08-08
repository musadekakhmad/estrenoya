"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);

  const moviesTimeoutRef = useRef(null);
  const tvShowsTimeoutRef = useRef(null);

  const handleMoviesEnter = () => {
    clearTimeout(moviesTimeoutRef.current);
    setIsMoviesDropdownOpen(true);
  };
  const handleMoviesLeave = () => {
    moviesTimeoutRef.current = setTimeout(() => {
      setIsMoviesDropdownOpen(false);
    }, 200);
  };

  const handleTvShowsEnter = () => {
    clearTimeout(tvShowsTimeoutRef.current);
    setIsTvShowsDropdownOpen(true);
  };
  const handleTvShowsLeave = () => {
    tvShowsTimeoutRef.current = setTimeout(() => {
      setIsTvShowsDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <style>
        {`
        /* CSS untuk efek pelangi */
        .rainbow-text-header {
            background: linear-gradient(to right, #ffffff, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: all 0.5s ease-in-out;
        }

        .rainbow-text-header:hover {
            background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: rainbow-animation 2s linear infinite;
        }

        @keyframes rainbow-animation {
            to {
                background-position: 200% center;
            }
        }
        `}
      </style>
      <header className="bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="p-4 flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM6 5h12v14H6V5zm10 12h-2v-2h2v2zM8 7h2v2H8V7zm0 4h2v2H8v-2zm0 4h2v2H8v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2z"/>
              </svg>
              <span className="rainbow-text-header text-3xl md:text-4xl text-white">Estreno Ya</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white px-2 py-0.5 rounded-full hover:bg-green-600 hover:text-white transition-colors duration-300">Home</Link>
              <div className="relative" onMouseEnter={handleMoviesEnter} onMouseLeave={handleMoviesLeave}>
                <button className="text-white px-2 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center" aria-haspopup="true" aria-expanded={isMoviesDropdownOpen}>
                  Movies
                  <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMoviesDropdownOpen && (
                  <div role="menu" className="absolute top-full left-0 transition-all duration-300 bg-gray-700 text-white rounded-lg shadow-lg mt-2 py-2 z-10 w-48">
                    <Link href="/movie/popular" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Popular</Link>
                    <Link href="/movie/now_playing" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Now Playing</Link>
                    <Link href="/movie/upcoming" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Upcoming</Link>
                    <Link href="/movie/top_rated" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Top Rated</Link>
                  </div>
                )}
              </div>
              <div className="relative" onMouseEnter={handleTvShowsEnter} onMouseLeave={handleTvShowsLeave}>
                <button className="text-white px-2 py-0.5 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center" aria-haspopup="true" aria-expanded={isTvShowsDropdownOpen}>
                  Tv Shows
                  <svg className="h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isTvShowsDropdownOpen && (
                  <div role="menu" className="absolute top-full left-0 transition-all duration-300 bg-gray-700 text-white rounded-lg shadow-lg mt-2 py-2 z-10 w-48">
                    <Link href="/tv/popular" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Popular</Link>
                    <Link href="/tv/airing_today" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Airing Today</Link>
                    <Link href="/tv/on_the_air" className="block w-full text-left px-4 py-2 hover:bg-gray-600">On TV</Link>
                    <Link href="/tv/top_rated" className="block w-full text-left px-4 py-2 hover:bg-gray-600">Top Rated</Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
