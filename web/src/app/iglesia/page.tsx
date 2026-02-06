import { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { SparklesIcon, FireIcon, HeartIcon, GlobeAmericasIcon, UserGroupIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Nuestra Iglesia | Nueva Raza - Avivamiento Oaxaca',
    description: 'Somos la sustancia misma de Dios manifestada para avivar, transformar y reformar nuestra generación. Conoce nuestra historia, visión y gobierno.',
}

export default function IglesiaPage() {
    return (
        <div className="min-h-screen bg-black text-[#ECE7DE] font-sans selection:bg-aviva-gold selection:text-black">

            {/* 1. HERO DE IDENTIDAD */}
            <section className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero_ene.png" // Placeholder, user to replace with specific worship image
                        alt="Congregación en adoración - Avivamiento Oaxaca"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
                </div>

                <div className="relative z-10 text-center max-w-5xl px-4 mt-20">
                    <span className="text-aviva-gold font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm animate-pulse mb-6 block">
                        Identidad & Destino
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none italic mb-8 drop-shadow-2xl">
                        Levantando una <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-aviva-gold to-[#B8860B]">Nueva Raza</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-aviva-bone/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        No somos una organización, somos la sustancia misma de Dios manifestada para <strong className="text-aviva-gold">avivar</strong>, <strong className="text-aviva-gold">transformar</strong> y <strong className="text-aviva-gold">reformar</strong> nuestra generación. Participamos de Su naturaleza divina para establecer Su Reino en Oaxaca.
                    </p>
                </div>
            </section>

            {/* 2. RESEÑA HISTÓRICA */}
            <section className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-tight">
                            Un Mover Nacido en el <span className="text-aviva-gold">Corazón de Dios</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed text-justify">
                            <p>
                                A finales de octubre de 2014, en la sala de una casa, surgió un mover divino que no nació de la voluntad humana, sino del diseño eterno del Padre. Sin recursos visibles pero con una fe inquebrantable, dimos los primeros pasos hacia lo que hoy es una plataforma de transformación territorial.
                            </p>
                            <p>
                                El milagro de <strong className="text-aviva-gold font-bold">Rehoboth</strong> permanece como testimonio fundacional: un lugar levantado por fe en una sola semana, desafiando toda lógica y demostrando que cuando Dios da la visión, Él provee la provisión.
                            </p>
                            <p>
                                No contamos nuestra historia en números, sino en fidelidad. Han sido 11 años de ver la Gloria de Dios manifestada, no como un evento, sino como una cultura de vida que ha reformado familias y activado destinos.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-[600px] w-full bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden group">
                        <div className="absolute inset-0 bg-aviva-gold/10 group-hover:bg-transparent transition-all duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-aviva-gold font-black opacity-20 text-[120px] -rotate-12 italic tracking-tighter mix-blend-overlay">2014</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. NUESTRA BRÚJULA (VISIÓN, MISIÓN, VALORES) */}
            <section className="py-32 bg-aviva-onyx/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <span className="text-aviva-gold font-bold tracking-[0.4em] uppercase text-xs block mb-4">Nuestra Brújula</span>
                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Arquitectura de <span className="text-aviva-gold">Reino</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* VISIÓN */}
                        <div className="bg-black border border-white/10 p-10 rounded-3xl hover:border-aviva-gold/50 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-aviva-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-aviva-gold/20 transition-all">
                                <GlobeAmericasIcon className="w-8 h-8 text-aviva-gold" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Visión</h3>
                            <p className="text-gray-400 font-light leading-relaxed">
                                "Ser un mover de Dios llamados a avivar, transformar y reformar nuestra generación."
                            </p>
                        </div>

                        {/* MISIÓN */}
                        <div className="bg-black border border-white/10 p-10 rounded-3xl hover:border-aviva-gold/50 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-aviva-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-aviva-gold/20 transition-all">
                                <MapPinIcon className="w-8 h-8 text-aviva-gold" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Misión</h3>
                            <ul className="space-y-4 text-gray-400 font-light">
                                {[
                                    "Evangelizar (Ganar)",
                                    "Afirmar (Cuidar)",
                                    "Discipular (Entrenar)",
                                    "Enviar (Comisionar)"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-aviva-gold rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* VALORES */}
                        <div className="bg-black border border-white/10 p-10 rounded-3xl hover:border-aviva-gold/50 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-aviva-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-aviva-gold/20 transition-all">
                                <StarIcon className="w-8 h-8 text-aviva-gold" />
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Valores</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    "Comunión", "Oración",
                                    "Adoración", "Pasión",
                                    "Excelencia", "Generosidad"
                                ].map((val, i) => (
                                    <div key={i} className="text-sm text-gray-400 font-light border border-white/5 rounded-lg px-3 py-2 text-center group-hover:border-aviva-gold/20 transition-all">
                                        {val}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CREDO - SUSTANCIA DOCTRINAL */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Nuestra Sustancia Doctrinal</h2>
                        <div className="w-24 h-1 bg-aviva-gold mx-auto mt-6 mb-8" />
                        <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
                            Nos basamos en las grandes verdades bíblicas fundamentadas en Jesucristo. Creemos en la obra perfecta de Cristo: <strong className="text-aviva-gold italic">Tetelestai</strong> (Consumado Es), donde se cerró el pacto de obras y se abrió la realidad indestructible de la Vida Zoé.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "La Biblia (Sola Scriptura)", text: "Nuestra autoridad final y absoluta. La palabra profética más segura." },
                            { title: "La Trinidad", text: "Un solo Dios manifestado en tres personas eternas: Padre, Hijo y Espíritu Santo." },
                            { title: "Jesucristo", text: "El Verbo hecho carne, perfecto en divinidad y humanidad. El único mediador." },
                            { title: "Salvación por Gracia", text: "No por obras, sino por el don inmerecido de Dios mediante la fe en Jesús." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <FireIcon className="w-10 h-10 text-aviva-gold shrink-0" />
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-gray-500 font-light leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. GOBIERNO TERRITORIAL */}
            <section className="py-32 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-aviva-gold font-bold tracking-[0.4em] uppercase text-xs block mb-4 opacity-70">Autoridad & Cobertura</span>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic mb-20">Liderazgo de <span className="text-aviva-gold">Reino</span></h2>

                    {/* Pastores Generales */}
                    <div className="mb-24">
                        <div className="inline-block relative p-1 rounded-[2.5rem] bg-gradient-to-b from-aviva-gold/50 to-transparent">
                            <div className="bg-black rounded-[2.3rem] p-10 md:p-16 border border-white/5 max-w-4xl mx-auto">
                                <div className="w-32 h-32 mx-auto bg-gray-800 rounded-full mb-8 overflow-hidden grayscale border-2 border-aviva-gold">
                                    {/* Placeholder for Pastors Image */}
                                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-black" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-2">Natanael Martínez & Betsabé Fonseca</h3>
                                <p className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Pastores Generales</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid de Pastores de Zona */}
                    <h3 className="text-2xl font-bold text-white uppercase tracking-widest mb-12 flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-white/20" />
                        7 Zonas de Conquista
                        <span className="h-px w-12 bg-white/20" />
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[
                            "Jalpan", "Cuilápam", "Zaachila", "San Nicolás",
                            "Cañada", "Oaxaca Juárez", "Etla / Valles Centrales"
                        ].map((zone) => (
                            <div key={zone} className="bg-aviva-onyx/40 border border-white/5 p-8 rounded-2xl hover:border-aviva-gold/30 hover:-translate-y-1 transition-all duration-300 group">
                                <MapPinIcon className="w-8 h-8 text-aviva-gold/50 group-hover:text-aviva-gold mb-4 mx-auto transition-colors" />
                                <h4 className="text-white font-bold uppercase tracking-tight text-sm md:text-base">{zone}</h4>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">Cobertura Pastoral</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-32 px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-8">
                    ¿Listo para activar tu diseño?
                </h2>
                <a
                    href="/grupos-familiares"
                    className="inline-block px-12 py-5 bg-aviva-gold text-black font-black uppercase tracking-widest rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl shadow-aviva-gold/20"
                >
                    Unirse a la Familia
                </a>
            </section>

            <Footer />
        </div>
    )
}
