import Link from 'next/link';
import { Suspense } from 'react';
import { fetchMessagesFromDB, type Message } from '@/lib/mediaFetcher';
import MensajesFilterableGrid from '@/components/media/MensajesFilterableGrid';
import SpotifyEmbed from '@/components/media/SpotifyEmbed';
import Footer from '@/components/Footer';
import { FaSpotify } from 'react-icons/fa';
import { ArrowRight, Headphones, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export const metadata = {
  title: 'Mensajes | Avivamiento Oaxaca',
  description:
    'Archivo de revelación — Mensajes, series y enseñanzas de Avivamiento Oaxaca. Alimento para tu identidad y propósito.',
  keywords: ['sermones', 'mensajes', 'enseñanzas', 'Avivamiento Oaxaca', 'Vida Zoé', 'predicaciones'],
};

export default async function MessagesPage() {
  const messages = await fetchMessagesFromDB();

  // Agrupar por serie para mostrar estadísticas
  const series = [...new Set(messages.map((m) => m.serie_name).filter(Boolean))];
  const totalMessages = messages.length;

  return (
    <div className="min-h-screen bg-black text-aviva-bone selection:bg-aviva-gold selection:text-black">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative w-full pt-32 pb-20 px-6 overflow-hidden" aria-label="Archivo de Revelación">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(218,165,32,0.08)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aviva-gold/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 opacity-70">
            Centro de Recursos
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase leading-[1.05]">
            Archivo de{' '}
            <span className="text-gradient-gold">Revelación</span>
          </h1>

          <p className="text-lg md:text-xl text-aviva-bone/60 font-light leading-relaxed max-w-2xl mx-auto mb-12 text-balance">
            No son solo palabras — son diseños del Plano Eterno para activar tu fe y poseer tu herencia.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {totalMessages > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-aviva-gold/20">
                <BookOpen className="w-3.5 h-3.5 text-aviva-gold" />
                <span className="text-xs font-bold text-aviva-bone/80">
                  {totalMessages} {totalMessages === 1 ? 'mensaje' : 'mensajes'}
                </span>
              </div>
            )}
            {series.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-aviva-gold/20">
                <span className="text-xs font-bold text-aviva-bone/80">
                  {series.length} {series.length === 1 ? 'serie' : 'series'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Gold divider ── */}
      <div className="divider-gold w-full max-w-md mx-auto mb-0" />

      {/* ══════════════════════════════════════════════
          VIDEO GALLERY (FILTERABLE)
      ══════════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <MensajesFilterableGrid sermons={messages as any} />
      </section>

      {/* ── Gold divider ── */}
      <div className="divider-gold w-full max-w-md mx-auto" />

      {/* ══════════════════════════════════════════════
          SPOTIFY SECTION
      ══════════════════════════════════════════════ */}
      <section className="w-full max-w-5xl mx-auto px-6 py-20" aria-label="Podcast Mujeres en Victoria">
        <div className="rounded-2xl glass-light border border-aviva-gold/10 p-8 md:p-12 shadow-gold-subtle">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-[#1DB954]/10 border border-[#1DB954]/30 flex items-center justify-center shadow-lg shrink-0">
              <FaSpotify className="w-8 h-8 text-[#1DB954]" />
            </div>
            <div className="text-center md:text-left">
              <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase block mb-2 opacity-60">
                Podcast
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Mujeres en Victoria
              </h2>
              <p className="text-gray-500 text-sm font-light mt-1">
                Conversaciones que edifican y transforman — Sábados 5:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-aviva-gold" />
            </div>
            <span className="text-sm text-gray-400 font-light">
              Últimos episodios disponibles
            </span>
          </div>

          {/* Spotify embed — solo si hay token */}
          <div className="glass rounded-xl p-6 text-center border border-white/5">
            <p className="text-gray-500 text-sm mb-4">Escúchanos directamente en Spotify</p>
            <a
              href="https://open.spotify.com/show/4Prj1pzkAPNe0Mvk0LKLEo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] font-bold text-sm uppercase tracking-widest hover:bg-[#1DB954] hover:text-black transition-all duration-300"
            >
              <FaSpotify className="w-4 h-4" />
              Abrir en Spotify
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════ */}
      <section className="w-full py-24 px-6" aria-label="CTA Célula">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl glass-light border border-aviva-gold/10 p-12 md:p-16 text-center shadow-gold-subtle">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-60">
              No camines solo
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              ¿Fuiste ministrado?<br />
              <span className="text-gradient-gold">Encuentra tu familia.</span>
            </h3>
            <p className="text-gray-400 font-light leading-relaxed max-w-xl mx-auto mb-10">
              Hay un grupo familiar esperándote cerca de tu hogar. Un espacio donde puedes crecer,
              ser pastoreado y madurar en tu identidad.
            </p>
            <Link
              href="/grupos-familiares"
              className="inline-flex items-center gap-3 px-10 py-5 bg-aviva-gold text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white transition-all duration-500 hover:shadow-gold-lg"
              id="mensajes-celula-cta"
            >
              Unirme a una Célula
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}