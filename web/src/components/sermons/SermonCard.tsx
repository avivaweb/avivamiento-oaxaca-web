import { Sermon } from '@/types/sermon';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

interface SermonCardProps {
    sermon: Sermon;
}

export default function SermonCard({ sermon }: SermonCardProps) {
    // Extract YouTube ID from URL if possible, otherwise use a placeholder
    const getYoutubeThumbnail = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11)
            ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`
            : '/images/sermon-placeholder.jpg'; // Fallback
    };

    return (
        <div className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10 hover:border-[var(--aviva-dorado)] transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col h-full">
            {/* Thumbnail Section */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={sermon.thumbnailUrl || getYoutubeThumbnail(sermon.video_url)}
                    alt={sermon.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <PlayCircleIcon className="w-16 h-16 text-white/80 group-hover:text-[var(--aviva-dorado)] transform group-hover:scale-110 transition-all duration-300 opacity-80 group-hover:opacity-100" />
                </div>

                {/* Topic Badge - Top Right */}
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-[var(--aviva-dorado)]/30 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {sermon.topic}
                </span>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Pastor Badge */}
                <div className="mb-3">
                    <span className="text-[var(--aviva-principal)] text-sm font-bold tracking-wide uppercase border-b border-[var(--aviva-principal)]/20 pb-0.5">
                        {sermon.pastor}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-[var(--aviva-principal)] transition-colors">
                    {sermon.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                    {sermon.description}
                </p>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-medium">
                    <span>{new Date(sermon.date).toLocaleDateString()}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-[var(--aviva-principal)]">
                        Ver Sermón →
                    </span>
                </div>
            </div>
        </div>
    );
}
