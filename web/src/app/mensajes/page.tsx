import Link from 'next/link';
import { Suspense } from 'react';
import { fetchPasionMedia } from '@/lib/mediaFetcher';
import MensajesFilterableGrid from '@/components/media/MensajesFilterableGrid';
import SpotifyEmbed from '@/components/media/SpotifyEmbed';
import { FaSpotify } from 'react-icons/fa';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function MessagesPage() {
  const { sermons, podcasts } = await fetchPasionMedia(12);

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#DAA520] selection:text-white">

      {/* 1. HERO HEADER */}
      <div className="pt-24 pb-12 px-6 text-center border-b border-[#DAA520]/20">
        <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs animate-fade-in block mb-4">
          Centro de Recursos
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#333333] mb-6">
          Alimento para la <span className="text-[#DAA520]">Nueva Creación</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance font-light leading-relaxed">
          No son solo palabras, son diseños del Plano Eterno para activar tu fe y poseer tu herencia.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">

        {/* 2. VIDEO GALLERY (FILTERABLE) */}
        <section>
          <MensajesFilterableGrid sermons={sermons} />
        </section>

        {/* 3. SPOTIFY SECTION */}
        {podcasts.length > 0 && (
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b border-gray-100 pb-6">
              <div className="w-16 h-16 rounded-full bg-[#1DB954] text-white flex items-center justify-center shadow-lg shrink-0">
                <FaSpotify className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-serif font-bold text-[#333333]">Podcast: Mujeres en Victoria</h2>
                <p className="text-gray-500 font-light">Conversaciones que edifican y transforman.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {podcasts.map(episode => (
                <SpotifyEmbed key={episode.id} episodeId={episode.id} />
              ))}
            </div>
          </section>
        )}

        {/* 4. CTA */}
        <section className="py-16 text-center">
          <div className="bg-[#DAA520]/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#333333] mb-4">
              ¿Fuiste ministrado por este mensaje?
            </h3>
            <p className="mb-8 text-lg text-gray-600 font-light">
              No camines solo. Encuentra una familia espiritual donde puedas crecer, ser pastoreado y madurar en tu fe.
            </p>
            <Link
              href="/grupos-familiares"
              className="inline-block bg-[#DAA520] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#B8860B] transition-all shadow-lg hover:scale-105"
            >
              Unirme a una Célula
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}