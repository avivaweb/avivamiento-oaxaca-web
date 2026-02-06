import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import MediaGallery from '@/components/media/MediaGallery'
import MediaSkeleton from '@/components/media/MediaSkeleton'
import { fetchMessagesFromDB } from '@/lib/mediaFetcher'
import HeroVideo from '@/components/media/HeroVideo'

export const dynamic = 'force-dynamic' // Ensure we get latest from DB
import SubscriptionForm from '@/components/SubscriptionForm'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import MiraclesSection from '@/components/MiraclesSection'

export const metadata = {
  title: "Avivamiento | Potencial, Diseño y Transformación Territorial",
  description: "Descubre tu propósito original y únete a un movimiento de alto impacto. Activando 1,000 Altares para restaurar la identidad y establecer un legado en Oaxaca.",
}

export default async function Home() {
  const messages = await fetchMessagesFromDB();
  const latestMessage = messages[0];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center text-[#ECE7DE]">
      {/* Hero Image Section (Strategic Banner) */}
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/hero_ene.png"
          alt="Avivamiento - Legado y Transformación"
          fill
          priority={true}
          className="object-cover"
        />
        {/* Gradient Overlay for navigation legibility and cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90" />
      </div>

      <div className="text-center max-w-4xl w-full px-4 mx-auto flex flex-col justify-center pt-10 relative z-10 -mt-20">
        <Image
          src="/logo-aviva.png"
          alt="Logo Avivamiento"
          width={220}
          height={220}
          priority
          className="mx-auto mb-8 h-auto drop-shadow-2xl"
        />

        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none uppercase italic text-pretty">
          BIENVENIDOS <br /><span className="text-aviva-gold">A CASA</span>
        </h1>
        <p className="text-xl md:text-3xl mb-12 font-bold text-balance text-aviva-gold drop-shadow-md leading-relaxed uppercase tracking-widest italic">
          Una familia, un diseño, <span className="text-white">una conquista</span>
        </p>

        {/* SOY NUEVO SECTION: Invitado UX */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2rem] mb-16 text-center max-w-3xl mx-auto shadow-2xl group hover:border-aviva-gold/30 transition-all duration-500">
          <span className="text-aviva-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">¿Es tu primera vez?</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter italic">Queremos <span className="text-aviva-gold">Conocerte</span></h2>
          <p className="text-aviva-bone/70 text-base md:text-lg mb-8 font-light leading-relaxed">
            Eres más que un visitante, eres nuestro invitado de honor. Descubre cómo ser parte de nuestra familia y encontrar propósito en Dios.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/iglesia"
              className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-aviva-gold transition-all shadow-lg"
            >
              Soy Nuevo
            </Link>
            <Link
              href="/grupos-familiares"
              className="px-10 py-4 border border-aviva-gold text-aviva-gold font-black text-xs uppercase tracking-widest rounded-full hover:bg-aviva-gold/10 transition-all"
            >
              Grupos Familiares
            </Link>
          </div>
        </div>

        <CallToAction />
      </div>

      <section className="w-full max-w-5xl mx-auto px-4 mb-24 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-aviva-onyx/40 border border-white/5 backdrop-blur-md p-10 rounded-2xl shadow-2xl">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-aviva-gold mb-2 uppercase tracking-tighter italic">Días de Reunión</h3>
            <p className="text-gray-400 mb-1">Encuentra tu lugar en el diseño estratégico.</p>
          </div>
          <div className="flex flex-col gap-6 text-center md:text-right">
            <div>
              <p className="text-[10px] text-aviva-gold uppercase tracking-[0.3em] font-bold">Reunión General</p>
              <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">DOMINGO 11:00 AM</p>
            </div>
            <div>
              <p className="text-[10px] text-aviva-gold uppercase tracking-[0.3em] font-bold">Reunión de Oración</p>
              <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">MARTES 6:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center max-w-7xl w-full px-4 mx-auto mb-32">
        <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block opacity-70 italic">Modelado Institucional</span>
        <h2 className="text-4xl md:text-7xl font-black text-white mb-16 tracking-tighter uppercase italic">Grupos <span className="text-aviva-gold">Familiares</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Identidad", text: "Restauramos el diseño original del individuo para que opere en su máximo potencial." },
            { title: "Legado", text: "Establecemos sistemas de vida (Altares Familiares) que trascienden generaciones y reforman familias." },
            { title: "Formación", text: "Entrenamiento de alto nivel en principios de gobierno, autoridad y desarrollo personal." },
            { title: "Expansión", text: "Despliegue territorial para establecer modelos de justicia y bienestar en cada zona." }
          ].map((item, index) => (
            <div key={index} className="group bg-aviva-onyx/20 border border-white/5 p-8 rounded-2xl hover:border-aviva-gold/40 transition-all duration-500 hover:-translate-y-2">
              <h3 className="text-2xl font-black text-aviva-gold mb-4 uppercase tracking-tighter italic">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center max-w-5xl w-full px-4 mx-auto mb-20">
        <p className="text-2xl md:text-4xl text-aviva-bone font-light leading-snug tracking-tight">
          No somos una audiencia. <br className="hidden md:block" />
          <strong className="text-aviva-gold font-black uppercase italic">Somos una cultura de diseño.</strong> <br />
          Activamos lo que ya está en ti para transformar lo que está fuera.
        </p>
      </section>

      <Suspense fallback={<MediaSkeleton />}>
        <MediaGallery limit={3} />
      </Suspense>

      {latestMessage && (
        <section className="w-full max-w-7xl mx-auto px-4 mb-32">
          <div className="text-center mb-12">
            <span className="text-aviva-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block opacity-70">Instrucción Actual</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">Archivo de <span className="text-aviva-gold">Revelación</span></h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 hover:border-aviva-gold/30 transition-colors">
            <HeroVideo video={latestMessage} />
          </div>
        </section>
      )}

      <MiraclesSection />

      <div className="text-center max-w-2xl w-full px-4 mx-auto">
        <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
          <h3 className="text-lg font-medium text-aviva-bone mb-4">
            Mantente conectado
          </h3>
          <SubscriptionForm />
        </div>
      </div>

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  )
}
