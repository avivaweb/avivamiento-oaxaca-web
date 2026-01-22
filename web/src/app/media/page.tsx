import { Metadata } from 'next';
import { fetchMessagesFromDB, Message } from '@/lib/mediaFetcher';
import HeroVideo from '@/components/media/HeroVideo';
import SeriesCarousel from '@/components/media/SeriesCarousel';
import MasonryGallery from '@/components/MasonryGallery';

export const metadata: Metadata = {
    title: 'Altar Media | Avivamiento Oaxaca',
    description: 'Mensajes poderosos, series espirituales y momentos que marcan nuestra historia en el mover de Dios.',
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
        <div className="min-h-screen bg-black">
            {/* Hero Video Section */}
            {heroVideo && <HeroVideo video={heroVideo} />}

            {/* Series Section */}
            {(seriesMap.size > 0 || standaloneVideos.length > 0) && (
                <div className="max-w-7xl mx-auto px-6 py-20">
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <span className="text-[#DAA520] font-bold tracking-[0.3em] uppercase text-sm block mb-3">
                            📚 Biblioteca Espiritual
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Series de Mensajes
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            Enseñanzas profundas organizadas por temas. Cada serie es un camino hacia la transformación.
                        </p>
                    </div>

                    {/* Series Carousels */}
                    {Array.from(seriesMap.entries()).map(([serieName, videos]) => (
                        <SeriesCarousel key={serieName} serieName={serieName} videos={videos} />
                    ))}

                    {/* Standalone Videos */}
                    {standaloneVideos.length > 0 && (
                        <SeriesCarousel serieName="Mensajes Individuales" videos={standaloneVideos} />
                    )}
                </div>
            )}

            {/* Empty State */}
            {messages.length === 0 && (
                <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                    <div className="mb-8">
                        <svg className="w-24 h-24 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                        No hay mensajes sincronizados
                    </h3>
                    <p className="text-gray-400 text-lg mb-8">
                        Los administradores pueden sincronizar contenido usando el botón de sincronización en el dashboard.
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full text-gray-300 text-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Accede al Dashboard → CRM → Sincronizar Altar Media
                    </div>
                </div>
            )}

            {/* Divider */}
            {messages.length > 0 && (
                <div className="max-w-7xl mx-auto px-6">
                    <div className="border-t border-gray-800 my-16" />
                </div>
            )}

            {/* Photo Gallery Section (Preserved from original) */}
            <div className="bg-gradient-to-b from-black via-gray-900 to-black py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-[#DAA520] font-bold tracking-[0.3em] uppercase text-sm block mb-3">
                            📸 Momentos Destacados
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Nuestra <span className="text-[#DAA520]">Galería</span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            Un vistazo a lo que Dios está haciendo en medio de nosotros.
                        </p>
                    </div>

                    <MasonryGallery />
                </div>
            </div>
        </div>
    );
}
