"use client";

import { useEffect } from 'react';
import { handleAdsterraClick } from '../utils/adsterra';

// Component khusus untuk menangani klik secara global
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Inject the ad scripts for Social Bar and Popunder
    const socialBarScript = document.createElement('script');
    socialBarScript.type = 'text/javascript';
    socialBarScript.src = '//discreetisabella.com/9f/d1/7d/9fd17d5989c21c4f085c7f72fdb49180.js';
    document.body.appendChild(socialBarScript);

    const popunderScript = document.createElement('script');
    popunderScript.type = 'text/javascript';
    popunderScript.src = '//discreetisabella.com/33/b7/d2/33b7d2270a5f2a33e6e21ec17e01390f.js';
    document.body.appendChild(popunderScript);

    // Fungsi untuk memanggil logika adsterra saat ada klik di mana saja
    const handleClick = (e) => {
      // Kita perlu membuat dummy targetUrl karena logika handleAdsterraClick memerlukannya
      // Dalam kasus ini, kita bisa menggunakan URL halaman saat ini.
      const targetUrl = window.location.href;
      handleAdsterraClick(e, targetUrl);
    };

    window.addEventListener('click', handleClick);

    return () => {
      // Clean up the event listener and the scripts when the component unmounts
      window.removeEventListener('click', handleClick);
      socialBarScript.remove();
      popunderScript.remove();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}
