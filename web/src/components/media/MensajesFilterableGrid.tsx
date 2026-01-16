'use client';

import { useState } from 'react';
import { Sermon } from '@/types/sermon';
import Image from 'next/image';
import YouTubeModal from './YouTubeModal';
import { PlayIcon } from '@heroicons/react/24/solid';

interface MensajesFilterableGridProps {
    sermons: Sermon[];
}

const FILTERS = ['Todos', 'Fe', 'Identidad', 'Propósito', 'General'];

export default function MensajesFilterableGrid({ sermons }: MensajesFilterableGridProps) {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const filteredSermons = activeFilter === 'Todos'
        ? sermons
        : sermons.filter(s => s.topic === activeFilter);

    return (
        <div className="space-y-12">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
                {FILTERS.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`
                            px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                            ${activeFilter === filter
                                ? 'bg-[#DAA520] text-white shadow-lg scale-105'
                                : 'bg-white border border-gray-200 text-gray-500 hover:border-[#DAA520] hover:text-[#DAA520]'}
                        `}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filteredSermons.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-xl border border-gray-100">
                    <p className="text-gray-400">No hay mensajes en esta categoría por el momento.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSermons.map((sermon) => (
                        <div
                            key={sermon.id}
                            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                        >
                            {/* Thumbnail container */}
                            <div
                                className="relative aspect-video cursor-pointer overflow-hidden"
                                onClick={() => setSelectedVideo(String(sermon.id))}
                            >
                                <Image
                                    src={sermon.thumbnailUrl || '/placeholder-video.jpg'}
                                    alt={sermon.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <PlayIcon className="w-6 h-6 text-[#DAA520] ml-1" />
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3">
                                    <span className="bg-[#DAA520] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {sermon.topic}
                                    </span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                    {new Date(sermon.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <h3 className="text-lg font-bold font-serif text-[#333333] mb-3 line-clamp-2 leading-tight group-hover:text-[#DAA520] transition-colors">
                                    {sermon.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-3 font-light leading-relaxed">
                                    {sermon.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <YouTubeModal
                videoId={selectedVideo || ''}
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </div>
    );
}
