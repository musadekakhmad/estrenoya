"use client";

import Link from 'next/link';
import Image from 'next/image';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ media, mediaType }) {
  const mediaTitle = media.title || media.name;
  const mediaSlug = mediaTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const posterPath = media.poster_path ? `${IMAGE_BASE_URL}${media.poster_path}` : 'https://placehold.co/500x750?text=No+Image';

  return (
    <Link href={`/details/${mediaType}/${media.id}/${mediaSlug}`}>
      <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
        <Image
          src={posterPath}
          alt={`Poster for ${mediaTitle}`}
          width={500}
          height={750}
          className="w-full h-auto object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg font-semibold truncate transition-colors duration-300 group-hover:text-red-500">
            {mediaTitle}
          </h3>
        </div>
      </div>
    </Link>
  );
}
