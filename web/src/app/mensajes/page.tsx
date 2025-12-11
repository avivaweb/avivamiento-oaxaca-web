import Link from 'next/link';

export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* 1. Encabezado de la Página */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--aviva-principal)] mb-4">
          Recursos de Formación y Profundidad Doctrinal
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Encuentra alimento sólido para tu espíritu. Del púlpito a tu dispositivo, para que la Palabra corra y seas edificado.
        </p>
      </div>

      {/* 2. Sección Principal: Video (YouTube) */}
      <section className="mb-16">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--aviva-texto)] text-center">
            Sermones Dominicales: La Palabra para tu Crecimiento
          </h2>
          <div className="w-full max-w-4xl aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0jbuKnubCj0?rel=0"
              title="Sermón Dominical - Avivamiento Oaxaca"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* 3. Sección Secundaria: Audio (Spotify) */}
      <section className="mb-16">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[var(--aviva-texto)] text-center">
            El Altar de Audio: Discipulado en el Camino
          </h2>
          <div className="w-full max-w-2xl shadow-md rounded-xl">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/episode/6XG22Wd59mfODFScOgSwb5?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Player"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 4. CTA de Servicio */}
      <section className="py-12 bg-[var(--aviva-fondo-acogedor)] rounded-2xl shadow-inner text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--aviva-principal)] mb-6">
            ¿FUISTE MINISTRADO? Da el siguiente paso: ÚNETE A UNA CÉLULA
          </h3>
          <p className="mb-8 text-lg text-gray-800">
            No camines solo. Encuentra una familia espiritual donde puedas crecer, ser pastoreado y madurar en tu fe.
          </p>
          <Link
            href="/grupos-celulares"
            className="inline-block bg-[var(--aviva-principal)] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[var(--aviva-dorado)] hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Unirme a una Célula
          </Link>
        </div>
      </section>
    </div>
  );
}