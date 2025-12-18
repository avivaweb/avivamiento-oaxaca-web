import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Nuestra Historia: El Mover de Dios en Oaxaca',
  description: 'Conoce la historia del mover de Dios en Oaxaca, nuestros fundadores y el credo que sostiene nuestra fe. Somos Linaje Escogido.',
}

// Timeline Data
const historyMilestones = [
  {
    year: 'El Inicio',
    title: 'La Visión Original',
    content: 'Todo comenzó con una visión y cuatro familias valientes. Hombres y mujeres que, guiados por el Espíritu, decidieron creerle a Dios por un avivamiento en nuestra tierra. Sin grandes recursos, pero con una fe inquebrantable.',
    side: 'left'
  },
  {
    year: 'La Promesa',
    title: 'El Milagro de Rehoboth',
    content: 'Sembraron la semilla en un lugar al que llamaron proféticamente Rehoboth. Como está escrito en Génesis 26:22: "Porque ahora Jehová nos ha prosperado, y fructificaremos en la tierra".',
    side: 'right'
  },
  {
    year: 'La Expansión',
    title: 'Un Mover en las Naciones',
    content: 'Años después, lo que inició como un clamor en lo secreto se ha convertido en una voz que resuena en las naciones. Un testimonio vivo de que Dios honra la fe de aquellos que se atreven a creerle.',
    side: 'left'
  },
  {
    year: 'Hoy',
    title: 'Linaje Escogido',
    content: 'Hoy somos una familia extendida, un linaje escogido, real sacerdocio y nación santa, trabajando por la restauración de las familias y el despertar de los valientes.',
    side: 'right'
  }
]

// Credo Data
const credoItems = [
  {
    title: 'La Biblia',
    content: 'Escrituras inspiradas por Dios, infalibles y autoridad final de fe (2 Tim 3:16).',
    icon: '📖'
  },
  {
    title: 'La Trinidad',
    content: 'Un solo Dios eterno en tres personas: Padre, Hijo y Espíritu Santo (Mateo 28:19).',
    icon: '🕊️'
  },
  {
    title: 'Salvación por Gracia',
    content: 'Don de Dios recibido por fe en el sacrificio de Cristo, no por obras (Efesios 2:8).',
    icon: '✝️'
  },
  {
    title: 'Sanidad Divina',
    content: 'Sanidad integral provista para el creyente a través de la redención (Isaías 53:5).',
    icon: '❤️‍🔥'
  },
  {
    title: 'Deidad de Cristo',
    content: 'Hijo de Dios, nacido de virgen, sin pecado, muerto y resucitado en gloria.',
    icon: '👑'
  },
  {
    title: 'Espíritu Santo',
    content: 'Ministerio activo que regenera, santifica y empodera a la Iglesia hoy.',
    icon: '🔥'
  },
  {
    title: 'Bautismo en Agua',
    content: 'Testimonio público de fe e identificación con la muerte y resurrección de Cristo.',
    icon: '💧'
  },
  {
    title: 'La Iglesia',
    content: 'Cuerpo de Cristo, llamado a predicar el Evangelio a todas las naciones.',
    icon: '⛪'
  },
  {
    title: 'Santificación',
    content: 'Vida separada del mundo y consagrada a Dios por el poder del Espíritu.',
    icon: '✨'
  },
  {
    title: 'Segunda Venida',
    content: 'Retorno visible y glorioso de Cristo para establecer Su reino eterno.',
    icon: '☁️'
  },
  {
    title: 'Resurrección',
    content: 'Vida eterna para los justos y juicio eterno para los injustos.',
    icon: '⚡'
  },
  {
    title: 'Ministerios',
    content: 'Cinco ministerios (Ef 4:11) para edificar a la iglesia hacia la plenitud.',
    icon: '🛡️'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] text-[var(--aviva-blanco)] font-sans overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--aviva-dorado)_0%,_transparent_25%)] opacity-20 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.2em] uppercase text-sm">Nuestra Identidad</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Nuestra Historia
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            El testimonio del mover de Dios en Oaxaca
          </p>
        </div>
      </section>

      {/* 2. Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[var(--aviva-principal)] to-black/40 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[var(--aviva-dorado)]">El Camino de Fe</h2>

          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[var(--aviva-dorado)] to-transparent opacity-30"></div>

            <div className="space-y-12 md:space-y-24">
              {historyMilestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                  {/* Empty space for layout balance */}
                  <div className="md:w-5/12"></div>

                  {/* Dot */}
                  <div className="z-10 bg-[var(--aviva-principal)] border-4 border-[var(--aviva-dorado)] w-6 h-6 rounded-full shadow-[0_0_15px_rgba(196,166,97,0.5)] my-4 md:my-0"></div>

                  {/* Content Card */}
                  <div className="md:w-5/12 w-full">
                    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl md:text-${index % 2 === 0 ? 'left' : 'right'} text-center hover:border-[var(--aviva-dorado)] hover:bg-white/10 transition-all duration-300`}>
                      <span className="text-[var(--aviva-dorado)] font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        {milestone.content}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Clean Grid Credo Section */}
      <section className="py-24 px-6 bg-[var(--aviva-principal)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2 block">Fundamentos</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Nuestro Credo</h2>
            <div className="max-w-xl mx-auto text-gray-400">
              <p>12 Verdades inquebrantables que sostienen nuestra fe y práctica diaria.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {credoItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start px-4 group">
                <div className="mb-4 text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--aviva-dorado)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-32 px-6 text-center bg-gradient-to-t from-black to-[var(--aviva-principal)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Sé Parte de la Historia
          </h2>
          <Link
            href="/grupos-familiares"
            className="inline-block bg-[var(--aviva-dorado)] text-black font-bold text-lg px-10 py-4 rounded-full hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(196,166,97,0.3)]"
          >
            Únete al Linaje Escogido
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}