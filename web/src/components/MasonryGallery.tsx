'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

interface MediaItem {
    id: string
    src: string
    alt: string
    category: string
    size: 'small' | 'medium' | 'large'
}

export default function MasonryGallery() {
    const [items, setItems] = useState<MediaItem[]>([])
    const [filter, setFilter] = useState<string>('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('celula_reports')
                    .select('id, fotos_urls, testimonies, milagro_categoria, zona')
                    .eq('destacado', true)
                    .not('fotos_urls', 'is', null)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                if (data) {
                    const galleryItems: MediaItem[] = [];

                    data.forEach((report) => {
                        if (Array.isArray(report.fotos_urls)) {
                            report.fotos_urls.forEach((url: string, index: number) => {
                                // Assign random size for masonry effect
                                const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'medium', 'large'];
                                const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

                                galleryItems.push({
                                    id: `${report.id}-${index}`,
                                    src: url,
                                    alt: report.testimonies ? report.testimonies.substring(0, 50) + '...' : `Milagro en ${report.zona}`,
                                    category: 'Testimonios', // Reports are largely testimonies
                                    size: randomSize
                                });
                            });
                        }
                    });

                    setItems(galleryItems);
                }
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchGallery();
    }, []);

    const filteredData = filter === 'All' ? items : items.filter(item => item.category === filter)
    const categories = ['All', 'Congresos', 'Testimonios', 'Vida de Iglesia'];

    if (loading) {
        return <div className="text-center py-20 text-[#DAA520] animate-pulse">Cargando galería...</div>
    }

    if (items.length === 0) {
        return <div className="text-center py-20 text-gray-500">No hay momentos destacados aún.</div>
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${filter === cat
                            ? 'bg-[#DAA520] text-black border-[#DAA520]'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-[#DAA520]/50 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredData.map((item) => (
                    <div key={item.id} className="break-inside-avoid relative group overflow-hidden rounded-xl bg-gray-900 border border-white/5">
                        <div className={`relative w-full ${item.size === 'large' ? 'aspect-[3/4]' : item.size === 'medium' ? 'aspect-square' : 'aspect-[4/3]'}`}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                                <span className="text-[#DAA520] text-xs font-bold uppercase tracking-wider mb-1 block">{item.category}</span>
                                <p className="text-white font-medium text-sm line-clamp-2">{item.alt}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

