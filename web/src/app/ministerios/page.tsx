import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaWhatsapp, FaChild, FaFemale, FaMale, FaMusic, FaBookOpen, FaPray, FaFire } from 'react-icons/fa';
import { GiMicrophone, GiDramaMasks } from 'react-icons/gi';

export const metadata: Metadata = {
    title: 'Ministerios | Avivamiento Oaxaca',
    description: 'Conoce los ministerios de nuestra casa: Mujeres en Victoria, AvivaKids, Alabanza, Intercesión y Academia de Reformadores.',
}

// Ministry Data Structure
const MINISTRIES = {
    generations: [
        {
            id: 'mujeres',
            name: 'Mujeres en Victoria',
            description: 'Un movimiento de mujeres empoderadas por el Espíritu para transformar sus familias y sociedad.',
            featured: true,
            icon: <FaFemale className="w-8 h-8" />
        },
        {
            id: 'hombres',
            name: 'Despertando a los Valientes',
            description: 'Hombres de honor y propósito, sacerdotes de sus hogares.',
            featured: false,
            icon: <FaMale className="w-8 h-8" />
        },
        {
            id: 'youth',
            name: 'Aviva Youth',
            description: 'Una generación radical que no se conforma a este siglo.',
            featured: false,
            icon: <FaFire className="w-8 h-8" />
        },
        {
            id: 'kids',
            name: 'Aviva Kids',
            description: 'Instruyendo a los niños en el camino que deben seguir.',
            featured: false,
            icon: <FaChild className="w-8 h-8" />
        }
    ],
    altar: [
        {
            id: 'band',
            name: 'Aviva Band',
            description: 'Salmistas y adoradores que establecen el trono de Dios mediante la alabanza.',
            featured: false,
            icon: <GiMicrophone className="w-8 h-8" />
        },
        {
            id: 'danzarte',
            name: 'DanzArte',
            description: 'Expresiones artísticas y proféticas que desatan libertad.',
            featured: false,
            icon: <GiDramaMasks className="w-8 h-8" />
        }
    ],
    formation: [
        {
            id: 'oracion',
            name: 'Ministerio de Oración e Intercesión',
            description: 'El motor espiritual de la casa. Centinelas 24/7 sobre los muros.',
            featured: false,
            icon: <FaPray className="w-8 h-8" />
        },
        {
            id: 'academia',
            name: 'Academia de Reformadores',
            description: 'Formación teológica profunda y discipulado de alto nivel.',
            featured: false,
            icon: <FaBookOpen className="w-8 h-8" />
        }
    ]
};

const WhatsAppButton = ({ ministryName }: { ministryName: string }) => {
    // Replace with actual general WhatsApp number or specific ministry leads if available later.
    // Using the main number format for now.
    const phoneNumber = "529514283375";
    const message = encodeURIComponent(`Hola, deseo recibir información y conectarme con el ministerio de ${ministryName}.`);
    const link = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#DAA520] text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[#B8860B] transition-all shadow-md hover:scale-105"
        >
            <FaWhatsapp className="w-5 h-5" />
            Conectarme ahora
        </a>
    );
};

export default function MinisteriosPage() {
    return (
        <div className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#DAA520] selection:text-white">

            {/* HERO */}
            <section className="pt-24 pb-12 px-6 text-center border-b border-[#DAA520]/20">
                <div className="max-w-4xl mx-auto space-y-4 animate-fade-in-up">
                    <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs">
                        Vida Corporativa
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#333333]">
                        Nuestros Ministerios
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Somos un cuerpo con muchas funciones. Encuentra tu lugar para servir y crecer.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* 1. BLOQUE GENERACIONES */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] text-center">
                            Generaciones
                        </h2>
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MINISTRIES.generations.map((m) => (
                            <div
                                key={m.id}
                                className={`
                                    relative bg-white p-8 rounded-xl shadow-lg border transition-all hover:-translate-y-1
                                    ${m.featured ? 'border-[#DAA520] ring-4 ring-[#DAA520]/10 scale-105 z-10' : 'border-[#DAA520]/20'}
                                `}
                            >
                                {m.featured && (
                                    <div className="absolute top-0 right-0 bg-[#DAA520] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                        Destacado
                                    </div>
                                )}
                                <div className="text-[#DAA520] mb-6 flex justify-center">
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-bold font-serif text-center mb-3">
                                    {m.name}
                                </h3>
                                <p className="text-gray-500 text-sm text-center mb-6 leading-relaxed min-h-[60px]">
                                    {m.description}
                                </p>
                                <div className="text-center">
                                    <WhatsAppButton ministryName={m.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SPECIAL SECTION: ALTAR 24/7 */}
                <section className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-l-8 border-[#DAA520] relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#DAA520]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 text-[#DAA520] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                                <FaFire className="w-4 h-4 animate-pulse" />
                                Oración Continua
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#333333]">
                                El Altar que nunca se apaga
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-light">
                                Creemos en el poder de la intercesión sostenida. Mantenemos una vigilia de
                                <strong className="text-[#DAA520]"> Oración 24/7</strong>,
                                estableciendo el gobierno de Dios sobre Oaxaca y las naciones.
                                Únete a los turnos de guardia y sé parte de la historia.
                            </p>
                            <div>
                                <WhatsAppButton ministryName="Ministerio de Oración 24/7" />
                            </div>
                        </div>

                        {/* Visual Representation of the Altar */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <FaPray className="text-white/20 w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
                                <div className="relative z-10 text-center p-6">
                                    <span className="text-4xl md:text-6xl font-mono font-bold text-[#DAA520] text-shadow-glow">
                                        24/7
                                    </span>
                                    <p className="text-white/80 text-sm mt-2 uppercase tracking-widest font-light">
                                        Incensario de Oro
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. BLOQUE ALTAR DE FUEGO */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] text-center">
                            Altar de Fuego
                        </h2>
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {MINISTRIES.altar.map((m) => (
                            <div
                                key={m.id}
                                className="bg-white p-8 rounded-xl shadow-lg border border-[#DAA520]/20 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="bg-[#DAA520]/5 p-4 rounded-full text-[#DAA520] mb-4">
                                    {m.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-2">{m.name}</h3>
                                <p className="text-gray-500 mb-6 font-light">{m.description}</p>
                                <WhatsAppButton ministryName={m.name} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. BLOQUE VIDA ESPIRITUAL & FORMACIÓN */}
                <section className="pb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#333333] text-center">
                            Formación & Vida
                        </h2>
                        <div className="h-[1px] bg-[#DAA520] flex-grow opacity-30"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {MINISTRIES.formation.map((m) => (
                            <div
                                key={m.id}
                                className="bg-white p-8 rounded-xl shadow-lg border border-[#DAA520]/20 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="bg-[#DAA520]/5 p-4 rounded-full text-[#DAA520] mb-4">
                                    {m.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-serif mb-2">{m.name}</h3>
                                <p className="text-gray-500 mb-6 font-light">{m.description}</p>
                                <WhatsAppButton ministryName={m.name} />
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    )
}

