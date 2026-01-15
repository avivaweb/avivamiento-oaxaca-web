import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Nuestra Historia | Avivamiento Oaxaca',
  description: 'La historia de 11 años de fe radical. Desde una sala en 2014 hasta la conquista de nuestro Auditorio Avivamiento y la visión Pasión 2026.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#F9FAFB] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">

      {/* 1. Hero Section - Identity */}
      <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_30%)] opacity-40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-4 block">
            Thissis Kainós
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none text-white mb-6">
            Nueva <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9A825]">
              Creación
            </span>
          </h1>
        </div>
      </section>

      {/* TIMELINE CONTAINER */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-32 relative">
        {/* Central Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent transform md:-translate-x-1/2 hidden md:block"></div>

        {/* 1. El Génesis: Un Sueño en una Sala (2014) */}
        <section className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 text-left md:text-right order-2 md:order-1">
            <span className="text-[#D4AF37] font-bold text-6xl md:text-8xl opacity-20 block mb-4">2014</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">El Génesis: Un Sueño en una Sala</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Todo comenzó a finales de 2014. En la intimidad de una sala, con unos pocos amigos y una fe inmensa.
              Desde ese primer día, nuestra prioridad fue clara: edificar una casa donde el Espíritu Santo fuese la Persona más amada.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mt-4">
              En nuestros primeros cinco años, vimos el río de Dios desatarse en sanidades y milagros, confirmando un ciclo de aprobación
              que llamamos nuestro 'Jubileo', preparándonos para una aceleración sobrenatural.
            </p>
          </div>

          {/* Dot */}
          <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] transform md:-translate-x-1/2 hidden md:block order-1 md:order-2"></div>

          <div className="flex-1 order-3 hidden md:block">
            {/* Visual spacer or image placeholder could go here */}
          </div>
        </section>

        {/* 2. 2020: El Grito de la Fe Radical */}
        <section className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 order-3 md:order-1 hidden md:block"></div>

          {/* Dot */}
          <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] transform md:-translate-x-1/2 hidden md:block order-1 md:order-2"></div>

          <div className="flex-1 text-left order-2 md:order-3">
            <span className="text-[#D4AF37] font-bold text-6xl md:text-8xl opacity-20 block mb-4">2020</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">2020: La Obediencia y la Fe Radical</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              En el sexto año, cuando el mundo se detuvo por la pandemia, escuchamos una voz innegable: <span className="text-white italic">"¡No cierres la Iglesia!"</span>.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mt-4">
              Obedecer fue un acto de fe extrema que rompió la lógica humana. Mientras el temor avanzaba, Avivamiento experimentó una explosión de crecimiento.
              Dios nos guardó y nos demostró que Su Iglesia no es un edificio que se cierra, sino un cuerpo vivo que prevalece.
            </p>
          </div>
        </section>

        {/* 3. La Conquista de Nuestra Casa */}
        <section className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 text-left md:text-right order-2 md:order-1">
            <span className="text-[#D4AF37] font-bold text-6xl md:text-8xl opacity-20 block mb-4">2022</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">La Conquista de nuestro Auditorio Avivamiento</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Tras consolidarnos, llegó nuestro octavo año: el 'Tiempo de Cumplimiento'.
              Fue entonces cuando Dios nos entregó nuestra propia tierra. En un movimiento de fe sin precedentes, nos mudamos de nuestro lugar de reunión para levantar nuestro <strong className="text-[#D4AF37]">Auditorio Avivamiento</strong>.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mt-4">
              Lo que parecía imposible se hizo realidad: ¡el auditorio se levantó en tan solo una semana! Fue el paso definitivo de una iglesia para establecerse en su herencia.
            </p>
          </div>

          {/* Dot */}
          <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] transform md:-translate-x-1/2 hidden md:block order-1 md:order-2"></div>

          <div className="flex-1 order-3 hidden md:block"></div>
        </section>

        {/* 4. Clímax: Pasión 2026 */}
        <section className="relative flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 order-3 md:order-1 hidden md:block"></div>

          {/* Dot main */}
          <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#D4AF37] border-4 border-black rounded-full shadow-[0_0_25px_rgba(212,175,55,1)] transform md:-translate-x-1/2 hidden md:block order-1 md:order-2"></div>

          <div className="flex-1 text-left order-2 md:order-3">
            <span className="text-[#D4AF37] font-bold text-6xl md:text-8xl opacity-20 block mb-4">2026</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">11 Años: PASIÓN 2026</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Tras diez años de fortalecer nuestro corazón, hoy entendemos nuestra asignación superior.
              No solo somos una iglesia, somos un movimiento llamado a <strong className="text-white">"Reformar nuestra generación"</strong>.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed mt-4">
              El invierno ha pasado. La voz de la tórtola se oye en nuestra tierra y caminamos hacia una Etapa Mayor en una Gloria Mayor.
            </p>
            <p className="text-2xl font-bold text-white mt-8 italic border-l-4 border-[#D4AF37] pl-6 py-2">
              "¡Bienvenidos a Avivamiento: El Lugar de su Presencia!"
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}