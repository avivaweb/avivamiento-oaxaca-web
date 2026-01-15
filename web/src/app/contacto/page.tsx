import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Contacto | Avivamiento Oaxaca',
  description: 'Estamos aquí para servirte. Visítanos en el Auditorio Avivamiento.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] text-white flex flex-col">
      <main className="flex-grow">
        {/* Header */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o petición de oración? <br />
            <span className="text-[var(--aviva-dorado)] font-bold">Estamos para escucharte.</span>
          </p>
        </section>

        <div className="container mx-auto px-4 pb-20 grid lg:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-[var(--aviva-dorado)] mb-6">Información</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-3 rounded-full text-[var(--aviva-dorado)]">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Ubicación</h3>
                    <p className="text-gray-300">
                      Auditorio Avivamiento <br />
                      Oaxaca de Juárez, Oax.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-3 rounded-full text-[var(--aviva-dorado)]">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">WhatsApp</h3>
                    <p className="text-gray-300 hover:text-[var(--aviva-dorado)] transition-colors">
                      <a href="https://wa.me/529511234567?text=Hola%2C%20Pastores.%20Deseo%20conectar%20con%20la%20visi%C3%B3n..." target="_blank" rel="noopener noreferrer">
                        +52 951 123 4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-3 rounded-full text-[var(--aviva-dorado)]">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-300">contacto@avivamientooaxaca.com</p>
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-8" />

              <div className="bg-black/20 p-6 rounded-xl text-center">
                <p className="text-sm text-gray-400 mb-2">Horarios de Servicio</p>
                <p className="text-xl font-bold text-white">Domingos 10:00 AM</p>
                <p className="text-[var(--aviva-dorado)] font-medium">Reunión General</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-full min-h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15266.36868202575!2d-96.7265882!3d17.0660601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7223badedc7d3%3A0x6641499573880620!2sOaxaca%2C%20Oax.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
            {/* Note: Used generic Oaxaca coordinates. Replace src with exact Auditorio Avivamiento embed link when available. */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg text-xs text-[var(--aviva-dorado)] font-bold uppercase tracking-wider border border-[var(--aviva-dorado)]">
              Auditorio Avivamiento
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}