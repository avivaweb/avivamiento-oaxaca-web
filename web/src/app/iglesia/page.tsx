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
            <section className="relative w-full h-[80vh] md:h-[60vh] lg:h-[820px] overflow-hidden flex items-center justify-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/hero_ene.png" // Placeholder, user to replace with specific worship image
                        alt="Congregación en adoración - Avivamiento Oaxaca"
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
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

      {/* 2. RESEÑA HISTÓRICA: EL TESTIMONIO DE 11 AÑOS */}
      <section className="py-32 px-6 relative bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aviva-gold/5 via-black to-black" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight">
              Un Mover Nacido en el <span className="text-aviva-gold">Corazón de Dios</span>
            </h2>
            <div className="w-24 h-1 bg-aviva-gold mx-auto mt-8 opacity-50" />
          </div>

          <div className="space-y-16">
            {/* INTRODUCCIÓN */}
            <div className="group border-l-2 border-white/10 pl-8 md:pl-12 hover:border-aviva-gold transition-colors duration-500 relative">
              <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-white/20 -left-[9px] top-2 group-hover:border-aviva-gold group-hover:bg-aviva-gold transition-all shadow-[0_0_15px_rgba(218,165,32,0.5)]" />
              <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">El Inicio (2014)</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">El Sueño en una Sala</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Todo comenzó con un sueño a finales de 2014. No en un gran edificio, sino en la sala de una casa, con unos pocos amigos y una fe inmensa. Desde ese primer momento, supimos lo que queríamos: edificar una casa donde el Espíritu Santo fuese la Persona más amada. ¡Él es todo!
              </p>
            </div>

            {/* AÑOS 1 a 5 */}
            <div className="group border-l-2 border-white/10 pl-8 md:pl-12 hover:border-aviva-gold transition-colors duration-500 relative">
              <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-white/20 -left-[9px] top-2 group-hover:border-aviva-gold group-hover:bg-aviva-gold transition-all" />
              <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Años 1 al 5</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">La Unción y la Raíz</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Y Él nos respondió. Vimos el río de Dios desatarse en sanidad, salvación y milagros. Del "Honor al Espíritu Santo" a nuestro "Jubileo" (ciclo de aprobación). Escuchamos el grito profético "¡Tiempo de Dar a Luz!" y para el quinto año, estábamos en aceleración, tomando la promesa para ir por más territorio.
              </p>
            </div>

            {/* AÑO 6 */}
            <div className="group border-l-2 border-white/10 pl-8 md:pl-12 hover:border-aviva-gold transition-colors duration-500 relative">
              <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-white/20 -left-[9px] top-2 group-hover:border-aviva-gold group-hover:bg-aviva-gold transition-all shadow-[0_0_15px_rgba(218,165,32,0.5)]" />
              <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Año 6 (2020)</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">La Prueba y la Obediencia</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                El mundo se detuvo, pero escuchamos una voz: <strong className="text-white italic">"¡No cierres la Iglesia!"</strong>. Obedecer fue un acto de fe radical que resultó en un milagro: una explosión de crecimiento en medio de la pandemia. Vimos cómo Dios nos guardó y nos respaldó.
              </p>
            </div>

            {/* AÑO 7 y 8 */}
            <div className="group border-l-2 border-white/10 pl-8 md:pl-12 hover:border-aviva-gold transition-colors duration-500 relative">
              <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-white/20 -left-[9px] top-2 group-hover:border-aviva-gold group-hover:bg-aviva-gold transition-all" />
              <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Años 7 y 8</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">La Expansión Milagrosa</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Salimos al Centro de Convenciones como testimonio público. Pero lo más increíble llegó en el "Tiempo de Cumplimiento". El Señor nos trajo a esta Tierra Ancha, a Rehoboth. Por fe tomamos la decisión, y en <strong className="text-aviva-gold">una semana</strong> este auditorio se levantó. Un milagro sobrenatural que marcó nuestra expansión.
              </p>
            </div>

            {/* AÑO 9 y 10 */}
            <div className="group border-l-2 border-white/10 pl-8 md:pl-12 hover:border-aviva-gold transition-colors duration-500 relative">
              <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-white/20 -left-[9px] top-2 group-hover:border-aviva-gold group-hover:bg-aviva-gold transition-all" />
              <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase text-xs mb-2 block">Años 9 y 10</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">Milagros y Fortaleza</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Desatamos la "Unción para Conquistar", viendo un aumento imparable de milagros. Luego vino el tiempo de "Ir a la Guerra"; años de prueba y ajustes donde el Señor fortaleció nuestro corazón para salir más fuertes y sostenidos por Su gracia.
              </p>
            </div>
          </div>

          {/* CLÍMAX */}
          <div className="mt-24 bg-aviva-gold/10 border border-aviva-gold/30 p-10 md:p-16 rounded-[2rem] text-center relative overflow-hidden group hover:bg-aviva-gold/20 transition-all duration-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aviva-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-8 relative z-10">
              11 Años: Pasión <span className="text-aviva-gold">2026</span>
            </h3>
            <p className="text-xl md:text-2xl text-aviva-bone/90 font-light leading-relaxed relative z-10 max-w-2xl mx-auto italic">
              "De una sala a una visión que hoy se expande. Hemos caminado sobre el temor y la crisis. La verdadera fe es la que persevera. ¡El invierno terminó! La voz de la tórtola se oye. Vamos a una etapa mayor, a una <strong className="text-aviva-gold font-black uppercase">Gloria Mayor</strong>."
            </p>
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
