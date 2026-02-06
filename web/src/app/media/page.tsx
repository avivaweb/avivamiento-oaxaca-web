import { Metadata } from 'next';
import { fetchMessagesFromDB, Message } from '@/lib/mediaFetcher';
import HeroVideo from '@/components/media/HeroVideo';
import SeriesCarousel from '@/components/media/SeriesCarousel';
import MasonryGallery from '@/components/MasonryGallery';

export const metadata: Metadata = {
    title: 'REPOSITORIO | Instrucción y Diseño Original',
    description: 'Archivo estratégico de instrucción y revelación para la activación del potencial humano y establecimiento de legado.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function MediaPage() {
    // Fetch YouTube messages from Supabase
    const messages = await fetchMessagesFromDB();

    // Separate hero video (most recent)
    const heroVideo = messages[0];
    const remainingMessages = messages.slice(1);

    // Group by series
    const seriesMap = new Map<string, Message[]>();
    const standaloneVideos: Message[] = [];

    remainingMessages.forEach(msg => {
        if (msg.serie_name) {
            if (!seriesMap.has(msg.serie_name)) {
                seriesMap.set(msg.serie_name, []);
            }
            seriesMap.get(msg.serie_name)!.push(msg);
        } else {
            standaloneVideos.push(msg);
        }
    });

    return (
        <div className="min-h-screen bg-black text-[#ECE7DE] font-sans selection:bg-aviva-gold selection:text-black">
            {/* Hero Video Section */}
            {heroVideo && <HeroVideo video={heroVideo} />}

            {/* Series Section */}
            {(seriesMap.size > 0 || standaloneVideos.length > 0) && (
                <div className="max-w-7xl mx-auto px-6 py-24">
                    {/* Section Header */}
                    <div className="mb-20 text-center lg:text-left">
                        <span className="text-[#DAA520] font-bold tracking-[0.4em] uppercase text-[10px] block mb-4 opacity-70">
                            Protocolos de Entrenamiento
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
                            ARCHIVO DE <br /><span className="text-aviva-gold">REVELACIÓN</span>
                        </h1>
                        <p className="text-gray-400 mt-6 max-w-3xl text-xl font-light leading-relaxed">
                            Alimento para tu propósito. No son solo videos, es revelación para tu día a día.
                        </p>
                    </div>

                    {/* Series Carousels */}
                    {Array.from(seriesMap.entries()).map(([serieName, videos]) => (
                        <SeriesCarousel key={serieName} serieName={serieName} videos={videos} />
                    ))}

                    {/* Standalone Videos */}
                    {standaloneVideos.length > 0 && (
                        <SeriesCarousel serieName="Instrucción Individual" videos={standaloneVideos} />
                    )}
                </div>
            )}

            {/* Empty State */}
            {messages.length === 0 && (
                <div className="max-w-4xl mx-auto px-6 py-40 text-center border border-white/5 rounded-3xl bg-aviva-onyx/20 mb-40">
                    <div className="mb-8">
                        <svg className="w-20 h-20 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">
                        Repositorio en Sincronización
                    </h3>
                    <p className="text-gray-400 text-lg mb-8 font-light italic">
                        El archivo de revelación se encuentra en proceso de indexación estratégica.
                    </p>
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl text-aviva-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                        Protocolo: Acceder al Centro de Gestión para actualizar contenidos
                    </div>
                </div>
            )}

            {/* Divider */}
            {messages.length > 0 && (
                <div className="max-w-7xl mx-auto px-6">
                    <div className="border-t border-white/5 my-24" />
                </div>
            )}

            {/* Photo Gallery Section (Preserved from original) */}
            <div className="bg-gradient-to-b from-black via-aviva-onyx/40 to-black py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#DAA520] font-bold tracking-[0.4em] uppercase text-[10px] block mb-4 opacity-70">
                            Evidencia Territorial
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
                            REGISTROS DE <span className="text-aviva-gold">CAMBIO</span>
                        </h2>
                        <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg font-light italic">
                            Un registro visual de la transformación y restauración de identidad en el territorio.
                        </p>
                    </div>

                    <MasonryGallery />
                </div>
            </div>
        </div>
    );
}
