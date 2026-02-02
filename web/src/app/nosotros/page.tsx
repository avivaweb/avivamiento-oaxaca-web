import { Metadata } from 'next'
import Footer from '@/components/Footer'
import PastoralGrid from '@/components/PastoralGrid'

export const metadata: Metadata = {
  title: 'Nosotros | Avivamiento Oaxaca',
  description: 'Somos una Nueva Raza (Thissis Kainós) manifestando la Vida Zoé. Conoce nuestra naturaleza, credo y gobierno apostólico.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-aviva-bone font-sans selection:bg-aviva-gold selection:text-black">

      {/* --- HERO / IDENTITY SECTION --- */}
      <section className="py-24 md:py-32 px-6 text-center border-b border-[#DAA520]/20">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Identity */}
          <div className="space-y-6">
            <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs animate-fade-in">
              Identidad 6-9-3
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-aviva-bone uppercase tracking-tighter">
              Nuestra Naturaleza
            </h1>
            <p className="text-lg md:text-xl text-aviva-bone/70 leading-relaxed font-light max-w-3xl mx-auto">
              Somos una asociación religiosa basada en las grandes verdades bíblicas y el fundamento de los Apóstoles.
              No somos una organización, somos una <strong className="text-aviva-gold font-bold">Nueva Raza (Thissis Kainós)</strong> que posee la sustancia misma de Dios.
              Manifestamos la <strong className="text-aviva-gold">Vida Zoé</strong>: la única vida que vence a la muerte.
            </p>
          </div>

          <div className="w-24 h-1 bg-[#DAA520] mx-auto opacity-30"></div>

          {/* Credo */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-aviva-gold uppercase tracking-tight">
              Nuestro Credo
            </h2>
            <p className="text-lg md:text-xl text-aviva-bone/70 leading-relaxed font-light max-w-3xl mx-auto">
              Creemos en la inspiración de las Escrituras, en la Salvación por Gracia como un proceso legal y espiritual,
              y en la victoria absoluta del <em className="serif text-[#333333]">Tetelestai</em>.
              Poseemos <strong className="text-[#DAA520] font-bold">Vida Zoé</strong>, la misma vida de Dios manifestada en el creyente.
            </p>
          </div>

        </div>
      </section>

      {/* --- GOVERNMENT SECTION (Pastoral Grid) --- */}
      <section className="py-24 bg-white/50 px-6">
        <div className="text-center mb-16">
          <span className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-xs block mb-4">
            Gobierno Apostólico
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-aviva-bone mb-4 uppercase tracking-tight">
            7 Zonas de Autoridad
          </h2>
          <p className="text-aviva-bone/60 max-w-2xl mx-auto font-light">
            El diseño original de gobierno establecido para cuidar, proteger y expandir el Reino en cada territorio.
          </p>
        </div>

        <PastoralGrid />
      </section>

      {/* --- HISTORY SECTION --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#DAA520]/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-aviva-bone mb-8 uppercase tracking-widest">
            11 Años de Fidelidad
          </h2>
          <div className="bg-aviva-onyx p-8 md:p-12 shadow-2xl border-t-4 border-aviva-gold space-y-6">
            <p className="text-lg text-aviva-bone/70 leading-relaxed font-light">
              Todo comenzó en el corazón de Dios y se manifestó en la tierra de Oaxaca.
              Lo que inició como una pequeña semilla de fe hace más de una década, hoy se levanta como un roble de justicia.
              A lo largo de estos 11 años, hemos visto la mano de Dios moverse con poder, transformando vidas y reescribiendo historias.
            </p>
            <p className="text-lg text-aviva-bone/70 leading-relaxed font-light">
              Nuestra misión permanece inalterable: ser luz a las naciones, una ciudad asentada sobre un monte que no se puede esconder.
              Caminamos hacia <strong className="text-aviva-gold font-bold">Pasión 2026</strong> con la certeza de que la gloria postrera será mayor que la primera.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}