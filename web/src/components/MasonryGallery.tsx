'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MediaItem {
    id: number
    src: string
    alt: string
    category: 'Congresos' | 'Testimonios' | 'Vida de Iglesia'
    size: 'small' | 'medium' | 'large'
}

const sampleData: MediaItem[] = [
    { id: 1, src: '/placeholder-1.jpg', alt: 'Adoración en vivo', category: 'Vida de Iglesia', size: 'large' },
    { id: 2, src: '/placeholder-2.jpg', alt: 'Congreso Pasión', category: 'Congresos', size: 'medium' },
    { id: 3, src: '/placeholder-3.jpg', alt: 'Testimonio de Sanidad', category: 'Testimonios', size: 'small' },
    { id: 4, src: '/placeholder-4.jpg', alt: 'Bautismos', category: 'Vida de Iglesia', size: 'medium' },
    { id: 5, src: '/placeholder-5.jpg', alt: 'Predicación Dominical', category: 'Vida de Iglesia', size: 'medium' },
    { id: 6, src: '/placeholder-6.jpg', alt: 'Noche de Milagros', category: 'Testimonios', size: 'large' },
    // Add more placeholders or real images as needed
]

export default function MasonryGallery() {
    const [filter, setFilter] = useState<'All' | 'Congresos' | 'Testimonios' | 'Vida de Iglesia'>('All')

    const filteredData = filter === 'All' ? sampleData : sampleData.filter(item => item.category === filter)

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {['All', 'Congresos', 'Testimonios', 'Vida de Iglesia'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat as any)}
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
                            {/* Note: Using a placeholder color/div if image is missing since I don't have real files yet */}
                            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-600">
                                <span className="text-xs">{item.alt}</span>
                            </div>
                            {/* When real images are available:
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              */}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                                <span className="text-[#DAA520] text-xs font-bold uppercase tracking-wider mb-1 block">{item.category}</span>
                                <p className="text-white font-medium">{item.alt}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
