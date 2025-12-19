
import { Metadata } from 'next';
import { fetchLatestSermons } from '@/lib/youtubeService';
import SermonPageClient from '@/components/sermons/SermonPageClient';
import { Sermon } from '@/types/sermon';

export const metadata: Metadata = {
    title: 'Sermones | Avivamiento Oaxaca',
    description: 'Explora nuestra biblioteca de sermones, filtrados por pastor y tema.',
};

export const revalidate = 60;

export default async function SermonesPage() {
    // Fetch data from YouTube
    const youtubeSermons = await fetchLatestSermons();

    // Fallback to mock data if empty (for demonstration/error handling)
    // or just use what we have. 
    // If YouTube fails, youtubeSermons is [].

    // We can keep the database fetch if needed in future, but for now we prioritize YouTube
    // to "Replace mock data by real videos".

    const initialSermons: Sermon[] = youtubeSermons.length > 0
        ? youtubeSermons
        : [
            {
                id: 1,
                title: "El Poder de la Resurrección (Mock)",
                description: "Un mensaje poderoso sobre cómo la resurrección de Cristo transforma nuestra vida diaria.",
                video_url: "https://www.youtube.com/watch?v=0jbuKnubCj0",
                pastor: "Pastor Principal",
                topic: "Fundamentos",
                date: "2024-03-31"
            }
        ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--aviva-principal)] mb-4 tracking-tight uppercase">
                    Alimento para el <br /> <span className="text-[var(--aviva-dorado)]">Perfeccionamiento</span>
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto text-balance font-medium">
                    <strong className="text-[var(--aviva-principal)]">Instrucción Apostólica y Profética</strong> para edificar tu hombre interior.
                </p>
            </div>

            {/* Main Content (Client Side) */}
            <SermonPageClient initialSermons={initialSermons} />
        </div>
    );
}
