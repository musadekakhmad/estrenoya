/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan 'image.tmdb.org' ke daftar domain yang diizinkan untuk gambar.
  // Ini diperlukan agar komponen next/image dapat memuat poster film.
  images: {
    domains: ['image.tmdb.org', 'placehold.co'],
  },
};

module.exports = nextConfig;
