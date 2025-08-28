// app/watch/[mediaType]/[id]/page.js
// MAKE SURE THERE IS NO 'use client' line here.
import { notFound } from 'next/navigation';
import WatchClient from './WatchClient';

// API Configuration
const API_KEY = ''; // <-- PLEASE FILL WITH YOUR API KEY HERE
const BASE_URL = 'https://tmdb-api-proxy.argoyuwono119.workers.dev';

// ====================================================================================
// FUNCTIONS TO GET DATA (server-side)
// ====================================================================================
async function getMediaDetails(mediaType, id) {
  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    // If it fails, navigate to the 404 page
    notFound();
  }
  return res.json();
}

// New function to get a static list from TMDB
async function getStaticListMedia(listId) {
  const res = await fetch(`${BASE_URL}/list/${listId}?api_key=${API_KEY}`);
  if (!res.ok) {
    // If it fails, return an empty array
    return { items: [] };
  }
  return res.json();
}

// ====================================================================================
// MAIN PLAYER PAGE COMPONENT (SERVER COMPONENT)
// ====================================================================================
export default async function Page({ params }) {
  // FIX: Use 'await params' to handle the Next.js error
  const { mediaType, id } = await params;

  try {
    const [detailsData, staticListData] = await Promise.all([
      getMediaDetails(mediaType, id),
      // Using TMDB static list with ID 143347
      getStaticListMedia(143347),
    ]);

    // Pass all necessary data to the client component
    return (
      <WatchClient
        mediaType={mediaType}
        id={id}
        initialDetails={detailsData}
        initialSimilarMedia={staticListData.items}
      />
    );
  } catch (error) {
    console.error("Failed to fetch data on the server side:", error);
    notFound();
  }
}

// ====================================================================================
// FUNCTION TO GET DYNAMIC METADATA (Important for SEO)
// ====================================================================================
export async function generateMetadata({ params }) {
  // FIX: Use 'await params' to handle the Next.js error
  const { mediaType, id } = await params;

  const res = await fetch(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`);
  const details = res.ok ? await res.json() : null;

  if (!details) {
    return {};
  }

  const title = `${details.title || details.name} | Estreno Ya`;
  const description = details.overview || 'Tu centro de streaming gratuito y de alta calidad para películas y programas de TV.';
  const imageUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/original${details.poster_path}`
    : 'https://placehold.co/1200x630/000000/FFFFFF?text=Estrenoya';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://estrenoya.netlify.app/${mediaType}/${id}`,
      siteName: 'Estreno Ya',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@WatchStream123',
      creator: '@WatchStream123',
      title,
      description,
      images: [imageUrl],
    },
  };
}
