
import { fetchPasionMedia } from '@/lib/mediaFetcher';
import SpotifyEmbed from './SpotifyEmbed';
import YouTubeGalleryClient from './YouTubeGalleryClient'; // Client wrapper for interactivity

interface MediaGalleryProps {
    limit?: number;
}

export default async function MediaGallery({ limit = 3 }: MediaGalleryProps) {
    const { sermons, podcasts } = await fetchPasionMedia(limit);

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24" id="media-gallery">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
                <div>
                    <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.2em] text-sm uppercase mb-3 block">
                        Media Center
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                        Últimos Diseños: <span className="text-[var(--aviva-dorado)]">Vida Zoé</span>
                    </h2>
                </div>
                <a
                    href="/mensajes"
                    className="hidden md:inline-flex items-center text-sm font-bold text-white hover:text-[var(--aviva-dorado)] transition-colors uppercase tracking-widest group"
                >
                    EXPLORAR MI DESTINO
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>

            {/* YouTube Grid */}
            <div className="mb-20">
                <YouTubeGalleryClient sermons={sermons} />
            </div>

            {/* Spotify Section */}
            {podcasts.length > 0 && (
                <div className="relative">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Mujeres en Victoria <span className="text-gray-500 text-lg font-medium ml-2">Podcast</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {podcasts.map(episode => (
                            <SpotifyEmbed key={episode.id} episodeId={episode.id} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
