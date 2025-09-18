// app/sitemap.js
const BASE_URL = 'https://estrenoya.netlify.app';

// Fungsi utilitas untuk membuat slug
const createSlug = (name, year) => {
  if (!name) return '';
  
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

  // Validasi tahun lebih ketat
  if (!year || typeof year !== 'string' || year.length !== 4 || isNaN(year)) {
    return baseSlug;
  }
  
  return `${baseSlug}-${year}`;
};

// Data statis untuk film dan serial TV (contoh)
const staticMovies = [
  { id: 1, title: "The Matrix", release_date: "1999-03-31" },
  { id: 2, title: "Inception", release_date: "2010-07-16" },
  { id: 3, title: "Interstellar", release_date: "2014-11-07" },
  { id: 4, title: "The Dark Knight", release_date: "2008-07-18" },
  { id: 5, title: "Pulp Fiction", release_date: "1994-10-14" },
];

const staticTvShows = [
  { id: 1, name: "Breaking Bad", first_air_date: "2008-01-20" },
  { id: 2, name: "Game of Thrones", first_air_date: "2011-04-17" },
  { id: 3, name: "Stranger Things", first_air_date: "2016-07-15" },
  { id: 4, name: "The Crown", first_air_date: "2016-11-04" },
  { id: 5, name: "The Mandalorian", first_air_date: "2019-11-12" },
];

// Kategori dan genre statis
const movieCategories = ['popular', 'now_playing', 'upcoming', 'top_rated'];
const tvCategories = ['popular', 'airing_today', 'on_the_air', 'top_rated'];
const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" }
];

export default async function sitemap() {
  try {
    console.log('Membuat sitemap untuk EstrenoYa...');

    // URL statis
    const staticUrls = [
      { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/trending`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
      { url: `${BASE_URL}/movies`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${BASE_URL}/tv-shows`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ];

    // URL kategori film
    const movieCategoryUrls = movieCategories.map((category) => ({
      url: `${BASE_URL}/movies/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    }));

    // URL kategori serial TV
    const tvCategoryUrls = tvCategories.map((category) => ({
      url: `${BASE_URL}/tv-shows/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7
    }));
    
    // URL genre film
    const movieGenreUrls = movieGenres.map((genre) => ({
      url: `${BASE_URL}/movies/genre/${genre.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    }));
    
    // URL genre serial TV
    const tvGenreUrls = tvGenres.map((genre) => ({
      url: `${BASE_URL}/tv-shows/genre/${genre.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    }));

    // URL detail film
    const movieDetailUrls = staticMovies.map((movie) => {
      const year = movie.release_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/movie/${createSlug(movie.title, year)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8
      };
    });

    // URL streaming film
    const movieStreamUrls = staticMovies.map((movie) => {
      const year = movie.release_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/movie/${createSlug(movie.title, year)}/watch`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      };
    });

    // URL detail serial TV
    const tvDetailUrls = staticTvShows.map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/tv/${createSlug(tvShow.name, year)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8
      };
    });

    // URL streaming serial TV
    const tvStreamUrls = staticTvShows.map((tvShow) => {
      const year = tvShow.first_air_date?.substring(0, 4);
      return {
        url: `${BASE_URL}/tv/${createSlug(tvShow.name, year)}/watch`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7
      };
    });

    // Gabungkan semua URL
    const allUrls = [
      ...staticUrls,
      ...movieCategoryUrls,
      ...tvCategoryUrls,
      ...movieGenreUrls,
      ...tvGenreUrls,
      ...movieDetailUrls,
      ...movieStreamUrls,
      ...tvDetailUrls,
      ...tvStreamUrls,
    ];

    console.log(`Total URL dalam sitemap: ${allUrls.length}`);
    console.log('Sitemap berhasil dibuat untuk EstrenoYa');

    return allUrls;

  } catch (error) {
    console.error("Kesalahan saat membuat sitemap:", error);
    
    // Return minimal sitemap dengan URL utama jika error
    return [
      { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/movies`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${BASE_URL}/tv-shows`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ];
  }
}
