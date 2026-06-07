import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaWhatsapp, FaChild, FaFemale, FaMale, FaMusic, FaBookOpen, FaPray, FaFire } from 'react-icons/fa';
import { GiMicrophone, GiDramaMasks } from 'react-icons/gi';
import { siteConfig } from '@/config/site';

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
    const phoneNumber = siteConfig.whatsapp.number;
    const message = encodeURIComponent(`Hola, deseo recibir información y conectarme con el ministerio de ${ministryName}.`);
    const link = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-aviva-gold hover:bg-white text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
        >
            <FaWhatsapp className="w-4 h-4" />
            Conectarme ahora
        </a>
    );
};

export default function MinisteriosPage() {
    return (
        <div className="min-h-screen bg-black text-aviva-bone font-sans selection:bg-aviva-gold selection:text-black">

            {/* HERO */}
            <section className="pt-32 pb-20 px-6 text-center border-b border-white/5 bg-gradient-to-b from-aviva-wine/20 via-black to-black">
                <div className="max-w-4xl mx-auto space-y-4 animate-fade-in-up">
                    <span className="text-aviva-gold font-bold tracking-[0.4em] uppercase text-[10px]">
                        Vida Corporativa
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight">
                        Nuestros <span className="text-gradient-gold">Ministerios</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Somos un cuerpo con muchas funciones. Encuentra tu lugar para servir y crecer.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">

                {/* 1. BLOQUE GENERACIONES */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                            Generaciones
                        </h2>
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MINISTRIES.generations.map((m) => (
                          <div
                            key={m.id}
                            className={`
                              relative glass-light p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-gold-subtle
                              ${m.featured ? 'border-aviva-gold ring-4 ring-aviva-gold/5 scale-105 z-10' : 'border-white/5'}
                            `}
                          >
                                {m.featured && (
                                  <div className="absolute top-0 right-0 bg-aviva-gold text-black text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider rounded-tr-2xl">
                                    Destacado
                                  </div>
                                )}
                                <div className="text-aviva-gold mb-6 flex justify-center">
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-black text-center mb-3 uppercase tracking-tight text-white">
                                    {m.name}
                                </h3>
                                <p className="text-gray-400 text-sm text-center mb-6 leading-relaxed min-h-[60px] font-light">
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
                <section className="glass-light rounded-3xl p-8 md:p-12 shadow-gold-subtle border border-white/5 border-l-4 border-l-aviva-gold relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-aviva-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 bg-aviva-gold/10 text-aviva-gold px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest border border-aviva-gold/20">
                                <FaFire className="w-3 h-3 animate-pulse" />
                                Oración Continua
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                                El Altar que nunca se apaga
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                Creemos en el poder de la intercesión sostenida. Mantenemos una vigilia de{' '}
                                <strong className="text-aviva-gold font-semibold">Oración 24/7</strong>,
                                estableciendo el gobierno de Dios sobre Oaxaca y las naciones.
                                Únete a los turnos de guardia y sé parte de la historia.
                            </p>
                            <div>
                                <WhatsAppButton ministryName="Ministerio de Oración 24/7" />
                            </div>
                        </div>

                        {/* Visual Representation of the Altar */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative w-full max-w-sm aspect-video bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <FaPray className="text-white/5 w-32 h-32 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
                                <div className="relative z-10 text-center p-6">
                                    <span className="text-4xl md:text-6xl font-black text-aviva-gold text-shadow-glow">
                                        24/7
                                    </span>
                                    <p className="text-white/80 text-xs mt-2 uppercase tracking-[0.2em] font-light">
                                        Incensario de Oro
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. BLOQUE ALTAR DE FUEGO */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                            Altar de Fuego
                        </h2>
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {MINISTRIES.altar.map((m) => (
                          <div
                            key={m.id}
                            className="glass-light p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-aviva-gold/30 hover:shadow-gold-subtle transition-all duration-500"
                          >
                                <div className="bg-aviva-gold/10 border border-aviva-gold/20 p-4 rounded-full text-aviva-gold mb-5">
                                    {m.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{m.name}</h3>
                                <p className="text-gray-400 mb-6 font-light text-sm max-w-md">{m.description}</p>
                                <WhatsAppButton ministryName={m.name} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. BLOQUE VIDA ESPIRITUAL & FORMACIÓN */}
                <section className="pb-12">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                            Formación & Vida
                        </h2>
                        <div className="h-[1px] bg-white/10 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {MINISTRIES.formation.map((m) => (
                          <div
                            key={m.id}
                            className="glass-light p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-aviva-gold/30 hover:shadow-gold-subtle transition-all duration-500"
                          >
                                <div className="bg-aviva-gold/10 border border-aviva-gold/20 p-4 rounded-full text-aviva-gold mb-5">
                                    {m.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">{m.name}</h3>
                                <p className="text-gray-400 mb-6 font-light text-sm max-w-md">{m.description}</p>
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

