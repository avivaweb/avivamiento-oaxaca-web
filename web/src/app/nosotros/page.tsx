import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Nuestra Historia | Avivamiento Oaxaca',
  description: 'La historia de un mover de Dios en Oaxaca. Desde 4 familias en 2014 hasta una casa de adoración y obediencia radical.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#F9FAFB] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">

      {/* 1. Hero Section - El Título de Gloria */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_30%)] opacity-40 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
          <span className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-sm md:text-base mb-4 block">
            Identidad del Mover
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-none text-white mb-6">
            Avivamiento: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9A825]">
              El Lugar de Su Presencia
            </span>
          </h1>
          <p className="text-xl md:text-3xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No somos solo una iglesia; somos una habitación diseñada para Dios en Oaxaca.
          </p>
        </div>
      </section>

      {/* 2. Nuestra Historia: El Génesis */}
      <section className="min-h-[50vh] flex items-center justify-center py-24 px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] tracking-tight mb-8">
            Nuestra Historia: El Génesis
          </h2>

          <div className="space-y-8 text-lg md:text-2xl font-light leading-loose text-white/90">
            <p>
              Todo comenzó con un solo deseo: <span className="text-[#D4AF37] font-normal">Alabar y Adorar</span>.
              A finales de <span className="font-bold text-white">octubre de 2014</span>, el fuego de este mover se encendió en la intimidad de una sala.
              Lo que hoy es una multitud, inició con <span className="font-bold text-white border-b border-[#D4AF37]/50 pb-1">4 familias</span> rendidos ante Su Presencia, buscando nada más que Su rostro.
            </p>
            <p>
              Esa semilla de adoración dio a luz a lo que hoy celebramos cada <span className="font-bold text-white">diciembre</span>:
              el nacimiento de una casa que no se detiene, que no calla y que ha decidido que la vida se trata de Dios y de Su visión.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Hitos de Obediencia Radical */}
      <section className="min-h-[50vh] py-24 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] text-center mb-20 tracking-tight">
            Hitos de Obediencia Radical
          </h2>

          <div className="relative space-y-24 before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#D4AF37]/50 before:to-transparent">

            {/* Hito 1: Rehoboth */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#000000] bg-[#D4AF37] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10 ml-0 md:ml-auto md:mr-auto"></div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-10 rounded-2xl bg-black border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl">
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">El Milagro</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">El Milagro de Rehoboth</h3>
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">(Auditoria Avivamiento)</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Nuestra casa no fue levantada por manos humanas simplemente; fue un milagro de fe.
                  El auditorio se construyó en tan solo una semana, demostrando que cuando Dios da la visión, Él desata la provisión acelerada.
                </p>
              </div>
            </div>

            {/* Hito 2: No Cierres la Iglesia */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#000000] bg-[#D4AF37] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10 ml-0 md:ml-auto md:mr-auto"></div>

              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 md:p-10 rounded-2xl bg-black border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xl">
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">La Prueba (2020)</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">¡No Cierres la Iglesia!</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  En el momento de mayor crisis global, recibimos un grito profético de obediencia.
                  Mientras el mundo se encerraba, nosotros nos mantuvimos como un faro abierto, creyendo que la realidad del cielo es mayor que cualquier crisis terrenal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Nuestro Diseño: El Real Sacerdocio */}
      <section className="min-h-[50vh] flex items-center justify-center py-24 px-6 md:px-12 bg-gradient-to-t from-[#A5002F]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Nuestro Diseño: <span className="text-[#D4AF37] block mt-2">El Real Sacerdocio</span>
          </h2>

          <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
            Creemos que no eres un espectador, sino un <span className="text-white font-bold">Sacerdote</span>.
            Según nuestro fundamento en <span className="text-[#D4AF37]">Hechos 2</span>, hemos restaurado el altar en las casas a través del Ejército Celular,
            donde cada miembro es activado en su propósito para evangelizar, afirmar, discipular y enviar.
          </p>

          <div className="mt-12">
            <Link
              href="/grupos-familiares"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black transition-all duration-300 bg-[#D4AF37] rounded-full hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Únete al Ejército
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}