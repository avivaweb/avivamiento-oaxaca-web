
import React from 'react';

interface SpotifyEmbedProps {
    episodeId: string;
}

export default function SpotifyEmbed({ episodeId }: SpotifyEmbedProps) {
    return (
        <div className="w-full h-[152px] rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-[#DAA520]/30 transition-all duration-300">
            <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="bg-[#282828]" // Spotify default dark gray fallback
            ></iframe>
        </div>
    );
}
