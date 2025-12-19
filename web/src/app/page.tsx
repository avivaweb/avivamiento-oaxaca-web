import Image from 'next/image'

export const dynamic = 'force-static'
import SubscriptionForm from '@/components/SubscriptionForm'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import MiraclesSection from '@/components/MiraclesSection'

export const metadata = {
  title: "Iglesia Cristiana en Oaxaca | Avivamiento",
  description: "Iglesia Cristiana en Oaxaca comprometida con la sana doctrina y la transformación espiritual. Únete a nuestros grupos familiares y eventos.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] flex flex-col items-center pt-10 pb-20">
      <div className="text-center max-w-2xl w-full px-4 mx-auto flex flex-col justify-center">
        <Image
          src="/logo-aviva.png"
          alt="Logo Avivamiento"
          width={250}
          height={250}
          priority
          className="mx-auto mb-6 h-auto drop-shadow-lg"
        />

        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--aviva-blanco)] mb-4 tracking-tight leading-tight">
          IGLESIA CRISTIANA EN OAXACA | <span className="text-[var(--aviva-dorado)]">CASA DE SU PRESENCIA</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light text-balance">
          Entra a la dimensión de <strong className="text-[var(--aviva-dorado)] font-medium">Gloria Mayor</strong>.
        </p>
        <h2 className="text-xl md:text-2xl font-light text-[var(--aviva-dorado)] mb-8 tracking-widest uppercase text-balance">
          <span className="block font-bold mb-2">LA VOZ DE LA TÓRTOLA HA HABLADO.</span>
          El invierno ha pasado. El tiempo de la canción ha llegado.
        </h2>

        <CallToAction />
      </div>

      <section className="text-center max-w-4xl w-full px-4 mx-auto mb-12">
        <p className="text-lg md:text-xl text-[var(--aviva-blanco)] leading-relaxed">
          No somos solo una comunidad. <br className="hidden md:block" />
          <strong className="text-[var(--aviva-dorado)]">SOMOS EL LUGAR DE SU HABITACIÓN.</strong> <br />
          Existimos para provocar un despertar en los valientes.
        </p>
      </section>

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
