
'use client';

import { useState } from 'react';
import { Sermon } from '@/types/sermon';
import Image from 'next/image';
import YouTubeModal from './YouTubeModal';

interface YouTubeGalleryClientProps {
    sermons: Sermon[];
}

export default function YouTubeGalleryClient({ sermons }: YouTubeGalleryClientProps) {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    if (!sermons || sermons.length === 0) {
        return (
            <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-gray-400">No hay videos disponibles por el momento.</p>
            </div>
        );
    }

    // Helper to identify pinned content for special styling
    const isPinned = (sermon: Sermon) => sermon.topic === 'Mensaje Destacado';

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sermons.map((sermon, index) => {
                    const pinned = isPinned(sermon);
                    return (
                        <div
                            key={sermon.id}
                            className={`group relative rounded-xl overflow-hidden bg-[#0a0a0a] border ${pinned ? 'border-[#DAA520] shadow-[0_0_20px_rgba(218,165,32,0.2)]' : 'border-white/10'} hover:border-[#DAA520]/50 transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div
                                className="aspect-video relative cursor-pointer"
                                onClick={() => setSelectedVideo(String(sermon.id))}
                            >
                                {/* Thumbnail */}
                                <Image
                                    src={sermon.thumbnailUrl || '/placeholder-video.jpg'} // Fallback should be handled
                                    alt={sermon.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-[var(--aviva-dorado)]/90 flex items-center justify-center backdrop-blur-sm shadow-xl transform group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    {pinned && (
                                        <span className="bg-[#DAA520] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                            Destacado
                                        </span>
                                    )}
                                    {!pinned && index === 0 && ( // Assuming first is latest if not pinned logic overridden
                                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                            Nuevo
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-[var(--aviva-dorado)] uppercase tracking-widest">
                                    <span>{new Date(sermon.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                                    <span>{sermon.topic}</span>
                                </div>
                                <h3
                                    className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-[var(--aviva-dorado)] transition-colors cursor-pointer"
                                    onClick={() => setSelectedVideo(String(sermon.id))}
                                >
                                    {sermon.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                    {sermon.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <YouTubeModal
                videoId={selectedVideo || ''}
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </>
    );
}
