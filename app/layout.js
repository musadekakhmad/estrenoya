import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Estreno Ya - Free HD Movie & TV Show Streaming',
  description: 'Your ultimate destination for high-quality, free movie and TV show streaming.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
