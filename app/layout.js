// ---------------------------------------------------------------- //
// Nama File: app/layout.js
// Fungsi: Ini adalah layout utama untuk seluruh situs web,
//         digunakan untuk mengkonfigurasi elemen yang muncul
//         di semua halaman, seperti header, footer, dan lebar konten.
// ---------------------------------------------------------------- //

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper';

export const metadata = {
  // Mengubah judul dan deskripsi ke bahasa Spanyol
  title: 'Estreno Ya | Ver Películas y Series de TV en Streaming Gratis',
  description: 'Tu destino final untuk ver películas y series de TV de alta calidad en streaming.',
  // Menambahkan kata kunci meta untuk SEO
  keywords: ['Estreno Ya', 'ver películas gratis', 'ver series de tv gratis', 'streaming', 'película gratis'],
  // Open Graph meta tags for Facebook
  openGraph: {
    title: 'Estreno Ya | Ver Películas y Series de TV en Streaming Gratis',
    description: 'Tu destino final untuk ver películas y series de TV de alta calidad en streaming.',
    url: 'https://estrenoya.netlify.app/',
    siteName: 'Estreno Ya',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54748591312_9316a1f42a_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Estreno Ya',
      },
    ],
    // Mengubah lokal ke bahasa Spanyol
    locale: 'es_ES',
    type: 'website',
    // Properti khusus untuk Facebook, 'og:app_id'
    appId: 'cut.erna.984',
  },
  // Twitter Card meta tags
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123', // Your Twitter user
    creator: '@WatchStream123',
    // Mengoreksi kesalahan ketik pada deskripsi
    title: 'Estreno Ya | Ver Películas y Series de TV en Streaming Gratis',
    description: 'Tu destino final untuk ver películas y series de TV de alta calidad en streaming.',
    images: ['https://live.staticflickr.com/65535/54748591312_9316a1f42a_b.jpg'], // Replace with the appropriate image URL
  },
};

export default function RootLayout({ children }) {
  return (
    // Mengubah atribut bahasa tag html menjadi bahasa Spanyol
    <html lang="es">
      {/* Menambahkan suppressHydrationWarning untuk mengatasi kesalahan hidrasi. */}
      {/* Ini sering terjadi saat skrip pihak ketiga atau ekstensi browser memodifikasi tag body. */}
      <body suppressHydrationWarning={true}>
        <AdsterraLayoutWrapper>
          {/* Kontainer utama dengan lebar maksimum */}
          {/* Memindahkan Header, konten, dan Footer ke dalam kontainer ini */}
          <div className="mx-auto max-w-7xl">
            <Header />
            {children}
            {/* Native Banner Container */}
            <div id="container-5b6b1243436b7461212423422d0434dc"></div>
            <Footer />
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}
