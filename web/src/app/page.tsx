import Image from 'next/image'
import SubscriptionForm from '@/components/SubscriptionForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] flex items-center justify-center">
      <div className="text-center max-w-xl w-full px-4 mx-auto">
        <Image
          src="/logo-aviva.png"
          alt="Logo Avivamiento"
          width={200}
          height={200}
          priority
          className="mx-auto mb-4 h-auto"
        />
        <h1 className="text-4xl font-bold text-[var(--aviva-blanco)] mb-4">Avivamiento: El Lugar de Su Presencia</h1>
        <h2 className="text-2xl font-semibold text-[var(--aviva-blanco)] mb-4">Descubre tu lugar para conectar, crecer y encontrar comunidad.</h2>
        <h3 className="text-xl font-semibold text-[var(--aviva-blanco)] mb-6">Únete a nuestra comunidad y recibe inspiración, contenido exclusivo y acceso a eventos especiales.</h3>

        <SubscriptionForm />

        <Footer />
      </div>
    </div>
  )
}
