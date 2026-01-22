'use client';

import { useState } from 'react';
import { Message } from '@/lib/mediaFetcher';
import YouTubeModal from './YouTubeModal';
import Image from 'next/image';

interface Props {
    video: Message;
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

export default function HeroVideo({ video }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [imgError, setImgError] = useState(false);

    const thumbnailUrl = getThumbnailUrl(video.video_id, video.thumbnail_url);
    const fallbackUrl = `https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`;

    return (
        <>
            <section
                className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden group cursor-pointer"
                onClick={() => setModalOpen(true)}
            >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-black">
                    <Image
                        src={imgError ? fallbackUrl : thumbnailUrl}
                        alt={video.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImgError(true)}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4="
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto">
                    {/* Badges */}
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <span className="px-5 py-2 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                            ✨ Mensaje Destacado
                        </span>
                        {video.serie_name && (
                            <span className="px-5 py-2 border-2 border-[#DAA520] text-[#DAA520] text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm bg-black/30">
                                📖 {video.serie_name}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 max-w-4xl leading-tight">
                        {video.title}
                    </h1>

                    {/* Description */}
                    {video.description && (
                        <p className="text-gray-200 text-base md:text-lg max-w-3xl mb-8 line-clamp-2 md:line-clamp-3">
                            {video.description}
                        </p>
                    )}

                    {/* CTA Button */}
                    <button
                        className="self-start px-8 py-4 bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-black font-bold rounded-full hover:shadow-2xl hover:shadow-[#DAA520]/50 transition-all flex items-center gap-3 group/btn transform hover:scale-105"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModalOpen(true);
                        }}
                    >
                        <svg
                            className="w-6 h-6 group-hover/btn:scale-125 transition-transform"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                        <span className="text-sm md:text-base">VER MENSAJE COMPLETO</span>
                    </button>
                </div>

                {/* Play Button Overlay (Center) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#DAA520]/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center shadow-2xl">
                            <svg
                                className="w-10 h-10 md:w-12 md:h-12 text-black ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Pulse Effect on Hover */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[#DAA520]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </section>

            <YouTubeModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                videoId={video.video_id}
            />
        </>
    );
}
