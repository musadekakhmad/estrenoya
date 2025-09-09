"use client";

import { useEffect } from 'react';
import { handleAdsterraClick } from '../utils/adsterra';

// Component khusus untuk menangani klik secara global
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Inject the ad scripts for Native Banner, Social Bar, and Popunder
    const nativeBannerScript = document.createElement('script');
    nativeBannerScript.async = true;
    nativeBannerScript.setAttribute('data-cfasync', 'false');
    nativeBannerScript.src = '//discreetisabella.com/5b6b1243436b7461212423422d0434dc/invoke.js';
    document.body.appendChild(nativeBannerScript);

    const socialBarScript = document.createElement('script');
    socialBarScript.type = 'text/javascript';
    socialBarScript.src = '//discreetisabella.com/9f/d1/7d/9fd17d5989c21c4f085c7f72fdb49180.js';
    document.body.appendChild(socialBarScript);

    const popunderScript = document.createElement('script');
    popunderScript.type = 'text/javascript';
    popunderScript.src = '//discreetisabella.com/33/b7/d2/33b7d2270a5f2a33e6e21ec17e01390f.js';
    document.body.appendChild(popunderScript);

    // Function to call the adsterra logic when there is a click anywhere
    const handleClick = (e) => {
      // We need to create a dummy targetUrl because handleAdsterraClick logic requires it
      // In this case, we can use the current page URL.
      const targetUrl = window.location.href;
      handleAdsterraClick(e, targetUrl);
    };

    window.addEventListener('click', handleClick);

    return () => {
      // Clean up the event listener and the scripts when the component unmounts
      window.removeEventListener('click', handleClick);
      nativeBannerScript.remove();
      socialBarScript.remove();
      popunderScript.remove();
    };
  }, []);

  return (
    <>
      {/* Container for the native banner ad */}
      <div id="container-5b6b1243436b7461212423422d0434dc"></div>
      {children}
    </>
  );
}
