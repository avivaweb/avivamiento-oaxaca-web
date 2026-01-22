'use client';

import { useState } from 'react';
import { Message } from '@/lib/mediaFetcher';
import YouTubeModal from './YouTubeModal';
import Image from 'next/image';

interface Props {
    serieName: string;
    videos: Message[];
}

/**
 * Gets the optimal YouTube thumbnail URL with fallback
 * Priority: maxresdefault (1280x720) -> hqdefault (480x360)
 */
function getThumbnailUrl(videoId: string, thumbnailUrl: string | null): string {
    // If we have a stored thumbnail URL, use it
    if (thumbnailUrl && thumbnailUrl.includes('maxresdefault')) {
        return thumbnailUrl;
    }

    // Default to hqdefault (always available)
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export default function SeriesCarousel({ serieName, videos }: Props) {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

    const handleImageError = (videoId: string) => {
        setImageErrors(prev => new Set(prev).add(videoId));
    };

    return (
        <>
            <div className="mb-12">
                {/* Series Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-1.5 h-10 bg-gradient-to-b from-[#DAA520] to-[#B8860B] rounded-full" />
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {serieName}
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {videos.length} {videos.length === 1 ? 'mensaje' : 'mensajes'}
                        </p>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="relative">
                    {/* Scrollable Area */}
                    <div
                        className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#DAA520] scrollbar-track-gray-800/50 hover:scrollbar-thumb-[#B8860B]"
                        style={{
                            scrollBehavior: 'smooth',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        <div className="flex gap-6 pr-6" style={{ width: 'max-content' }}>
                            {videos.map((video, idx) => {
                                const thumbnailUrl = getThumbnailUrl(video.video_id, video.thumbnail_url);
                                const fallbackUrl = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;
                                const hasError = imageErrors.has(video.id);

                                return (
                                    <div
                                        key={video.id}
                                        className="w-72 md:w-80 flex-shrink-0 group cursor-pointer"
                                        onClick={() => setSelectedVideo(video.video_id)}
                                        style={{
                                            animation: `fadeInSlide 0.5s ease-out ${idx * 0.1}s both`
                                        }}
                                    >
                                        {/* Thumbnail Container */}
                                        <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border-2 border-gray-800 group-hover:border-[#DAA520] transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#DAA520]/30 bg-black">
                                            {/* Image */}
                                            <Image
                                                src={hasError ? fallbackUrl : thumbnailUrl}
                                                alt={video.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={() => handleImageError(video.id)}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4="
                                                sizes="(max-width: 768px) 288px, 320px"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            {/* Play Overlay */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-2xl">
                                                    <svg
                                                        className="w-7 h-7 text-black ml-1"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Duration Badge */}
                                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                                                Video
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-white font-semibold text-base line-clamp-2 mb-2 group-hover:text-[#DAA520] transition-colors leading-snug">
                                            {video.title}
                                        </h3>

                                        {/* Date */}
                                        <p className="text-gray-400 text-sm flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(video.published_at).toLocaleDateString('es-MX', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Fade edges for better UX */}
                    <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Modal */}
            {selectedVideo && (
                <YouTubeModal
                    isOpen={true}
                    onClose={() => setSelectedVideo(null)}
                    videoId={selectedVideo}
                />
            )}

            <style jsx>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }

        .scrollbar-thumb-\\[\\#DAA520\\]::-webkit-scrollbar-thumb {
          background-color: #DAA520;
          border-radius: 10px;
        }

        .scrollbar-thumb-\\[\\#DAA520\\]::-webkit-scrollbar-thumb:hover {
          background-color: #B8860B;
        }

        .scrollbar-track-gray-800\\/50::-webkit-scrollbar-track {
          background-color: rgba(31, 41, 55, 0.5);
          border-radius: 10px;
        }
      `}</style>
        </>
    );
}
