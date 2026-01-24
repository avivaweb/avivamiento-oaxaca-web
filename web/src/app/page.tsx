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
  title: "Iglesia Cristiana en Oaxaca | Avivamiento",
  description: "Iglesia Cristiana en Oaxaca comprometida con la sana doctrina y la transformación espiritual. Únete a nuestros grupos familiares y eventos.",
}

export default async function Home() {
  const messages = await fetchMessagesFromDB();
  const latestMessage = messages[0];

  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] flex flex-col items-center">
      {/* Hero Image Section (Strategic Banner) */}
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/hero_ene.png"
          alt="Avivamiento Oaxaca - Pasión 2026"
          fill
          priority={true}
          className="object-cover"
        />
        {/* Gradient Overlay for navigation legibility and cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="text-center max-w-2xl w-full px-4 mx-auto flex flex-col justify-center pt-20">
        <Image
          src="/logo-aviva.png"
          alt="Logo Avivamiento"
          width={250}
          height={250}
          priority
          className="mx-auto mb-6 h-auto drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--aviva-blanco)] mb-4 tracking-tight leading-tight uppercase">
          El tiempo de la <span className="text-[var(--aviva-dorado)]">canción ha llegado</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light text-balance text-gray-300">
          Descubre tu <strong className="text-[var(--aviva-dorado)] font-medium">Asignación Eterna</strong> y camina en la Vida Zoé. <br />
          Bienvenido a la Nueva Realidad en Cristo.
        </p>

        <CallToAction />
      </div>

      <section className="w-full max-w-5xl mx-auto px-4 mb-20 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#0a0a0a] border border-[#DAA520]/20 p-8 rounded-xl shadow-[0_0_30px_rgba(218,165,32,0.1)]">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-[var(--aviva-dorado)] mb-2 uppercase tracking-widest">Nuestros Horarios</h3>
            <p className="text-gray-300 mb-1">Ven y recibe lo que Dios tiene para ti.</p>
          </div>
          <div className="flex flex-col gap-4 text-center md:text-right">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Reunión General</p>
              <p className="text-xl md:text-2xl font-bold text-white">Domingo 11:00 AM</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest">Reunión de Oración</p>
              <p className="text-xl md:text-2xl font-bold text-white">Martes 6:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center max-w-6xl w-full px-4 mx-auto mb-20">
        <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Nuestra Misión</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Cuatro Pilares de <span className="text-[var(--aviva-dorado)]">Avivamiento</span></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Evangelizar", text: "Llevamos las buenas nuevas de salvación a cada rincón." },
            { title: "Afirmar", text: "Cimentamos la fe de los creyentes en la Palabra de Dios." },
            { title: "Discipular", text: "Formamos seguidores de Cristo comprometidos con Su Reino." },
            { title: "Enviar", text: "Lanzamos líderes a cumplir su propósito divino." }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-lg hover:border-[#DAA520]/50 transition-all hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold text-[var(--aviva-dorado)] mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center max-w-4xl w-full px-4 mx-auto mb-12">
        <p className="text-lg md:text-xl text-[var(--aviva-blanco)] leading-relaxed">
          No somos solo una comunidad. <br className="hidden md:block" />
          <strong className="text-[var(--aviva-dorado)]">SOMOS EL LUGAR DE SU HABITACIÓN.</strong> <br />
          Existimos para provocar un despertar en los valientes.
        </p>
      </section>

      <Suspense fallback={<MediaSkeleton />}>
        <MediaGallery limit={3} />
      </Suspense>

      {/* Recent Message Section (Relocated from Hero) */}
      {latestMessage && (
        <section className="w-full max-w-7xl mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.2em] text-sm uppercase mb-2 block">Mensaje Reciente</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Adoración que <span className="text-[var(--aviva-dorado)]">rompe cadenas</span></h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-[var(--aviva-dorado)]/30 transition-colors">
            <HeroVideo video={latestMessage} />
          </div>
        </section>
      )}

      <MiraclesSection />

      <div className="text-center max-w-2xl w-full px-4 mx-auto">
        <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
          <h3 className="text-lg font-medium text-[var(--aviva-blanco)] mb-4">
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
