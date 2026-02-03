import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FormularioReporte from '@/components/dashboard/FormularioReporte';
import { FireIcon, BeakerIcon, SparklesIcon, MapIcon } from '@heroicons/react/24/outline';
import MapaWrapper from '@/components/dashboard/MapaWrapper';

export const metadata = {
    title: 'COSECHA Y DISCIPULADO | Centro de Mando',
    description: 'Reporte de victorias, cosecha y testimonios del Ejército Celular.',
};

export default async function ReportarPage() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    );
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/login?redirect=/reportar');
    }

    return (
        <div className="min-h-screen bg-black text-[#ECE7DE] font-sans selection:bg-aviva-gold selection:text-black">
            {/* Overlay de gradiente sutil para profundidad */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,165,32,0.05)_0%,transparent_100%)] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-20">
                <header className="mb-16 text-center lg:text-left">
                    <p className="text-aviva-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 animate-pulse italic">
                        Ejército Celular • Pasión 2026
                    </p>
                    <h1 className="text-5xl lg:text-8xl font-black tracking-tighter uppercase leading-none italic">
                        COSECHA Y <br />
                        <span className="text-aviva-gold">DISCIPULADO</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Columna Izquierda: Instrucciones Estratégicas */}
                    <div className="space-y-12 bg-aviva-onyx/20 border border-white/5 p-8 lg:p-12 rounded-3xl backdrop-blur-xl shadow-2xl">
                        <div>
                            <h2 className="text-3xl font-black text-white mb-6 flex items-center uppercase tracking-tighter italic">
                                <FireIcon className="w-8 h-8 text-aviva-gold mr-4" />
                                Reporte de Victoria
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light italic">
                                Registra la <span className="text-white font-bold">Cosecha</span>, la <span className="text-white font-bold">Asistencia</span> y los <span className="text-white font-bold">Testimonios</span> de poder.
                                Cada reporte es un avance territorial de nuestra Iglesia en Oaxaca.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
                                    <SparklesIcon className="w-7 h-7 text-aviva-gold" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-aviva-gold uppercase tracking-tighter mb-2 italic">Diseño de Legado</h3>
                                    <p className="text-gray-500 font-light leading-relaxed">
                                        Tu Altar es la unidad básica de transformación. Cada reporte documenta cómo el diseño corporativo está reformando el tejido social de Oaxaca.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
                                    <BeakerIcon className="w-7 h-7 text-aviva-gold" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-aviva-gold uppercase tracking-tighter mb-2 italic">Evidencia y Potencial</h3>
                                    <p className="text-gray-500 font-light leading-relaxed">
                                        El reporte de resultados es la base de nuestra inteligencia organizacional. Describe con precisión los hitos alcanzados en tu zona de influencia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-white/5">
                            <blockquote className="italic text-gray-400 border-l-2 border-aviva-gold pl-6 py-2 font-light">
                                "La eficiencia en la gestión es lo que permite que el legado se vuelva permanente."
                                <footer className="text-aviva-gold font-bold mt-4 not-italic text-xs uppercase tracking-[0.2em]">Visión Pasión 2026</footer>
                            </blockquote>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="relative group">
                        {/* Brillo decorativo detrás del formulario */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-aviva-gold/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <div className="relative">
                            <FormularioReporte user_id={session.user.id} />
                        </div>
                    </div>
                </div>

                {/* Sección del Mapa Territorial */}
                <div className="mt-24 lg:mt-40 space-y-12">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl">
                            <MapIcon className="w-10 h-10 text-aviva-gold" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white">Geografía de la <span className="text-aviva-gold">Transformación</span></h2>
                        <p className="text-gray-400 text-xl font-light leading-relaxed">
                            Visualización en tiempo real del impacto territorial de nuestra red de liderazgo.
                            Cada punto representa una unidad de transformación establecida en el diseño original.
                        </p>
                    </div>

                    <div className="bg-aviva-onyx/20 p-2 rounded-3xl border border-white/5 shadow-inner">
                        <MapaWrapper />
                    </div>
                </div>
            </div>
        </div>
    );
}
