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

        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--aviva-blanco)] mb-4 tracking-tight">
          Iglesia Cristiana en Oaxaca | Avivamiento
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-[var(--aviva-dorado)] mb-8 tracking-widest uppercase">
          La Voz de la Tórtola: Únete a la migración hacia una Gloria Mayor en Cristo.
        </h2>

        <CallToAction />
      </div>

      <section className="text-center max-w-4xl w-full px-4 mx-auto mb-12">
        <p className="text-lg md:text-xl text-[var(--aviva-blanco)] leading-relaxed">
          Somos una comunidad cristiana con sede en San Raymundo Jalpan, Oaxaca.
          Nuestra misión es Evangelizar, Afirmar, Discipular y Enviar.
          Como la Amada de Cristo, trabajamos por la restauración de la familia y el despertar de los valientes.
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
