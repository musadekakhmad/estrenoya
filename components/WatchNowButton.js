"use client";

import { useState } from 'react';

// Komponen Media Player
const MediaPlayer = ({ mediaType, mediaId, onClose }) => {
  const [streamSource, setStreamSource] = useState('vidsrc.to');
  const iframeSrc = `https://${streamSource}/embed/${mediaType}/${mediaId}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg shadow-2xl p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={iframeSrc}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Video Player"
          ></iframe>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setStreamSource('vidsrc.to')}
            className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 shadow-lg ${streamSource === 'vidsrc.to' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
          >
            Stream 1
          </button>
          <button
            onClick={() => setStreamSource('vidsrc.me')}
            className={`font-bold py-2 px-6 rounded-full transition-colors duration-300 shadow-lg ${streamSource === 'vidsrc.me' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
          >
            Stream 2
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen klien terpisah untuk tombol
export default function WatchNowButton({ mediaType, mediaId }) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPlayerOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300"
      >
        Watch Now
      </button>
      {isPlayerOpen && (
        <MediaPlayer mediaType={mediaType} mediaId={mediaId} onClose={() => setIsPlayerOpen(false)} />
      )}
    </>
  );
}
