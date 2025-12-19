
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import SermonPageClient from '@/components/sermons/SermonPageClient';
import { Sermon } from '@/types/sermon';

export const metadata: Metadata = {
    title: 'Sermones | Avivamiento Oaxaca',
    description: 'Explora nuestra biblioteca de sermones, filtrados por pastor y tema.',
};

export const revalidate = 60;

export default async function SermonesPage() {
    // Fetch data from Supabase
    const { data: sermons, error } = await supabase
        .from('sermons')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching sermons:', error);
    }

    // Fallback to mock data if empty (for demonstration)
    const initialSermons: Sermon[] = (sermons && sermons.length > 0)
        ? (sermons as unknown as Sermon[])
        : [
            {
                id: 1,
                title: "El Poder de la Resurrección",
                description: "Un mensaje poderoso sobre cómo la resurrección de Cristo transforma nuestra vida diaria y nos da esperanza viva.",
                video_url: "https://www.youtube.com/watch?v=0jbuKnubCj0",
                pastor: "Pastor Principal",
                topic: "Fundamentos",
                date: "2024-03-31"
            },
            {
                id: 2,
                title: "Sanidad Interior",
                description: "Descubre cómo el Espíritu Santo puede sanar las heridas profundas del alma y restaurar tu identidad.",
                video_url: "https://www.youtube.com/watch?v=example2",
                pastor: "Pastora María",
                topic: "Sanidad",
                date: "2024-03-24"
            },
            {
                id: 3,
                title: "Evangelismo Sobrenatural",
                description: "Equipando a la iglesia para llevar el evangelio con demostración de poder y amor en las calles.",
                video_url: "https://www.youtube.com/watch?v=example3",
                pastor: "Evangelista Juan",
                topic: "Evangelismo",
                date: "2024-03-17"
            },
            {
                id: 4,
                title: "Fe Inquebrantable",
                description: "Como mantener la fe en tiempos de prueba y dificultad, confiando en las promesas eternas de Dios.",
                video_url: "https://www.youtube.com/watch?v=example4",
                pastor: "Pastor Principal",
                topic: "Fe",
                date: "2024-03-10"
            }
        ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--aviva-principal)] mb-4 tracking-tight">
                    Biblioteca de Sermones
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto text-balance">
                    Encuentra alimento sólido para tu espíritu. Explora nuestra colección de mensajes filtrados por pastor y tema.
                </p>
            </div>

            {/* Main Content (Client Side) */}
            <SermonPageClient initialSermons={initialSermons} />
        </div>
    );
}
