"use client";
import React from 'react';

const MovieImage = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/500x750?text=No+Image';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default MovieImage;