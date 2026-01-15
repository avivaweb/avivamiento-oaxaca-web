
import Link from 'next/link';
import { Suspense } from 'react';
import MediaGallery from '@/components/media/MediaGallery';
import MediaSkeleton from '@/components/media/MediaSkeleton';

export const dynamic = 'force-static';
export const revalidate = 3600; // ISR revalidation every hour

export default function MessagesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* 1. Encabezado de la Página */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--aviva-principal)] mb-4 tracking-tight">
          Recursos de Formación y Profundidad Doctrinal
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-balance">
          Encuentra alimento sólido para tu espíritu. Del púlpito a tu dispositivo, para que la Palabra corra y seas edificado.
        </p>
      </div>

      {/* 2. Galería Dinámica */}
      <Suspense fallback={<MediaSkeleton />}>
        <MediaGallery />
      </Suspense>

      {/* 3. CTA de Servicio */}
      <section className="py-12 bg-[var(--aviva-fondo-acogedor)] rounded-2xl shadow-inner text-center mt-12">
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