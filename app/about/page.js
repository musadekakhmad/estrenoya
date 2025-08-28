// components/About.js
"use client";
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Sección del banner principal */}
      {/* Usando rounded-xl dan shadow-2xl untuk efek visual yang menarik */}
      {/* Menambahkan pt-20 untuk jarak dari header */}
      <div className="relative w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl pt-7">
        <img
          src="https://live.staticflickr.com/65535/54748591312_9316a1f42a_b.jpg"
          alt="Banner de Estreno Ya"
          className="w-full h-full object-cover object-center rounded-xl"
          // Penanganan kesalahan gambar (fallback)
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Estrenoya';
          }}
        />
        {/* Lapisan gradien untuk memastikan teks pada banner mudah dibaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>
      
      {/* Kontainer Konten Utama */}
      {/* Padding yang disesuaikan untuk jarak atas dan bawah */}
      <div className="px-4 md:px-8 py-9"> 
        {/* Sección Acerca de Nosotros */}
        <section className="bg-gray-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          {/* Judul utama dan deskripsi singkat */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg mb-2 text-blue-500">
              Estreno Ya: Ve Películas y Series de TV Gratis
            </h1>
            <p className="text-xl md:text-2xl font-semibold opacity-80 mt-2">
              Entretenimiento Ilimitado y de Alta Calidad HD/FHD/4K
            </p>
          </div>
          
          {/* Sección de Nuestra Misión y Visión */}
          <h2 className="text-3xl font-bold text-white mb-6">Nuestra Misión y Visión</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Estreno Ya fue fundado en una simple creencia: todo el mundo merece disfrutar de entretenimiento de alta calidad sin restricciones financieras. En un mundo lleno de servicios de pago, surgimos como un faro de libertad, ofreciendo una vasta biblioteca de películas y series de TV en HD de forma completamente gratuita. Nuestra visión va más allá del simple streaming; visualizamos una comunidad global donde los entusiastas del cine puedan conectar, compartir y celebrar el cine. Estamos comprometidos a mantener una plataforma fácil de usar, libre de anuncios molestos, y constantemente actualizada con contenido nuevo de todo el mundo. Nuestra misión es transformar el panorama del entretenimiento digital, haciéndolo más inclusivo y accesible para todos, sin importar dónde se encuentren.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Desde el principio, nos hemos centrado en proporcionar una experiencia de visualización fluida. Nuestros algoritmos de streaming están optimizados para garantizar una reproducción instantánea sin molesto almacenamiento en búfer, incluso en conexiones más lentas. Entendemos que los pequeños detalles importan, por eso invertimos en una infraestructura que garantiza una calidad HD nítida y un audio cristalino. Estamos orgullosos de nuestra tecnología, pero estamos aún más orgullosos del impacto que tiene: traer sonrisas a millones de caras en todo el mundo al permitirles disfrutar de sus películas favoritas sin preocuparse por el costo.
          </p>

          {/* Sección de Biblioteca de Contenido Extenso */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Extensa Biblioteca de Contenido</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            La biblioteca de Estreno Ya es un testimonio de nuestra pasión por el cine. Curamos meticulosamente nuestra colección para ofrecer una gama inigualable de géneros, atendiendo a cada gusto y estado de ánimo. Ya sea que busques el suspenso de una película de terror, la risa alegre de una comedia romántica, la acción emocionante o las narrativas complejas de un drama, lo tenemos todo. Nuestra colección incluye clásicos de Hollywood, joyas independientes ocultas y sensaciones internacionales de moda. Creemos que la diversidad es clave, y nuestra biblioteca refleja ese compromiso, ofreciendo contenido de cada rincón del mundo.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Cada película y serie de TV viene con una descripción detallada, información sobre el elenco y el equipo, tráilers y valoraciones de la audiencia. Queremos que tomes una decisión informada sobre qué ver a continuación. Estas características no solo mejoran la experiencia de visualización, sino que también te empoderan para explorar nuevos géneros y directores. Constantemente agregamos nuevos títulos a nuestra colección, asegurando que siempre haya algo nuevo y emocionante por descubrir.
          </p>

          {/* Sección de Nuestra Comunidad */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Nuestra Comunidad</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Estreno Ya es más que una plataforma de streaming; es una comunidad próspera. Alentamos a nuestros usuarios a interactuar compartiendo reseñas, recomendaciones y teorías sobre sus películas favoritas. Nuestra plataforma proporciona un espacio seguro y de apoyo para que los aficionados al cine se conecten, intercambien ideas y formen relaciones significativas. Escuchamos activamente los comentarios de nuestra comunidad y los usamos para guiar nuestras decisiones sobre nuevas funciones y contenido a agregar.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Organizamos eventos virtuales, como noches de cine y debates, para fortalecer aún más nuestra comunidad. Es una oportunidad para que nuestros miembros se unan y celebren su amor compartido por el cine. Tu participación es vital para nosotros, y estamos agradecidos a todos los que han elegido ser parte de nuestro viaje.
          </p>
          
          {/* Sección de Tecnología Detrás de Cámaras */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Tecnología Detrás de Cámaras</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            La tecnología que impulsa Estreno Ya es una maravilla centrada en el usuario. Utilizamos una red de entrega de contenido (CDN) avanzada para asegurar que tus películas se transmitan desde el servidor más cercano, reduciendo la latencia y garantizando una reproducción ininterrumpida. Nuestra infraestructura está construida para soportar grandes aumentos en el tráfico, asegurando que siempre obtengas el mejor servicio, sin importar cuántas otras personas estén viendo.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Además, invertimos en estrictas medidas de seguridad para proteger los datos de los usuarios y garantizar un entorno seguro. No recopilamos información personal innecesaria, y estamos comprometidos con la total transparencia sobre cómo se utilizan tus datos. Tu privacidad es nuestra máxima prioridad.
          </p>

          {/* Sección de Desarrollos Futuros */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Desarrollos Futuros</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            No nos dormimos en los laureles. Nuestro equipo explora continuamente nuevas tecnologías e ideas innovadoras para mejorar la experiencia de Estreno Ya. Nuestros planes futuros incluyen la implementación de funciones impulsadas por IA para recomendaciones más personalizadas, la integración con redes sociales para compartir sin problemas y una biblioteca en constante crecimiento de contenido exclusivo. También planeamos expandir nuestro soporte de idiomas, haciendo que Estreno Ya sea accesible para una audiencia global aún más amplia.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Cada paso que damos está impulsado por nuestra dedicación a proporcionar la mejor experiencia de entretenimiento de forma gratuita. Agradecemos tu apoyo y te invitamos a seguirnos en este emocionante viaje. Estreno Ya es un testimonio del poder de la comunidad y la pasión compartida por el cine. Gracias por ser parte de nuestra gran familia.
          </p>

          {/* Sección de Nuestro Equipo - Agregado */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Nuestro Equipo</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Detrás de escena en Estreno Ya, hay un apasionado equipo de personas que trabajan incansablemente para dar vida a nuestra visión. Desde los desarrolladores que optimizan tu experiencia de streaming hasta los curadores de contenido que encuentran joyas ocultas, cada miembro del equipo está comprometido con la excelencia. Somos un grupo de fans dedicados al cine y las series de televisión que se dedican a compartir nuestro amor por el cine con el mundo.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Creemos que un equipo fuerte se construye sobre la colaboración y el respeto mutuo. Fomentamos la creatividad, la innovación y la comunicación abierta, asegurando que cada idea sea escuchada. Nuestro equipo es nuestra familia, y ese espíritu se refleja en cada aspecto de la plataforma que construimos.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
