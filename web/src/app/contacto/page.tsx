import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaPray, FaGlobe } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Contacto | Avivamiento Oaxaca',
  description: 'Estamos aquí para escuchar al Hijo Amado y equipar al Reformador. Encuentra tu asignación en nuestras zonas de expansión.',
}

export default function ContactPage() {
  const strategicsZones = [
    'Jalpan',
    'Cuilápam',
    'Zaachila',
    'San Nicolás',
    'Cañada',
    'Centro / Oaxaca Juárez',
    'Etla / Valles Centrales'
  ]

  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] text-white flex flex-col">
      <main className="flex-grow">
        {/* HERO: Tono Pastoral (Hogar/Refugio) */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[#DAA520]/5 pointer-events-none"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">
              Estamos para <span className="text-[var(--aviva-dorado)]">Escucharte</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              En Avivamiento Oaxaca, no eres un número, eres un <span className="font-bold text-white">Hijo Amado</span>.
              Si necesitas oración, consejo o simplemente buscas un hogar espiritual, nuestras puertas y brazos están abiertos.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-20 grid lg:grid-cols-2 gap-12">

          {/* LEFT: Información Pastoral & Contacto */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <FaPray className="text-3xl text-[var(--aviva-dorado)]" />
                <h2 className="text-2xl font-bold text-white">Canales de Vida</h2>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-4 rounded-full text-[var(--aviva-dorado)] group-hover:bg-[var(--aviva-dorado)] group-hover:text-black transition-all">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--aviva-dorado)]">Línea Pastoral</h3>
                    <p className="text-gray-300 mb-1">Conecta directamente para peticiones y consejería.</p>
                    <a href="https://wa.me/529511234567?text=Pastores%2C%20necesito%20oraci%C3%B3n..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold text-lg hover:underline decoration-[var(--aviva-dorado)] underline-offset-4">
                      +52 951 123 4567
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-4 rounded-full text-[var(--aviva-dorado)] group-hover:bg-[var(--aviva-dorado)] group-hover:text-black transition-all">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--aviva-dorado)]">Casa de Adoración</h3>
                    <p className="text-gray-300">
                      Auditorio Avivamiento <br />
                      Oaxaca de Juárez, Oax.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4">
                  <div className="bg-[var(--aviva-dorado)]/20 p-4 rounded-full text-[var(--aviva-dorado)] group-hover:bg-[var(--aviva-dorado)] group-hover:text-black transition-all">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--aviva-dorado)]">Correspondencia</h3>
                    <p className="text-gray-300">contacto@avivamientooaxaca.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-black/30 border border-[#DAA520]/20 p-8 rounded-2xl text-center">
              <p className="text-sm text-gray-400 mb-2 uppercase tracking-widest">Encuentro Semanal</p>
              <p className="text-3xl font-extrabold text-white mb-1">Domingos 10:00 AM</p>
              <p className="text-[var(--aviva-dorado)] font-medium text-lg">Reunión General</p>
            </div>
          </div>

          {/* RIGHT: Tono Profético (Asignación & Zonas) */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-[#DAA520]/20 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--aviva-dorado)]/10 rounded-full blur-3xl"></div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <FaGlobe className="text-3xl text-[var(--aviva-dorado)]" />
                <h2 className="text-2xl font-bold text-white">Tu Asignación Territorial</h2>
              </div>

              <p className="text-gray-400 mb-8 relative z-10">
                La visión no es estática, es expansiva. Hemos trazado 7 zonas estratégicas para la reforma de Oaxaca.
                <span className="text-white font-bold"> ¿En cuál de ellas te levantarás como líder?</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {strategicsZones.map((zone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-[var(--aviva-dorado)]/10 border border-white/5 hover:border-[var(--aviva-dorado)]/30 transition-all cursor-default">
                    <span className="text-[var(--aviva-dorado)] font-bold text-lg opacity-50">0{index + 1}</span>
                    <span className="font-medium text-gray-200">{zone}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
                <p className="text-sm text-gray-500 italic">"Operamos desde la victoria, no hacia ella." - Tetelestai</p>
              </div>
            </div>

            {/* Map */}
            <div className="h-full min-h-[300px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15266.36868202575!2d-96.7265882!3d17.0660601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c7223badedc7d3%3A0x6641499573880620!2sOaxaca%2C%20Oax.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur px-4 py-2 rounded-lg text-xs text-[var(--aviva-dorado)] font-bold uppercase tracking-wider border border-[var(--aviva-dorado)]">
                Base Apostólica
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}