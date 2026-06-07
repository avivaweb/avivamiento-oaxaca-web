import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaWhatsapp, FaArrowRight, FaNewspaper, FaHandHoldingHeart, FaFileAlt } from 'react-icons/fa'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Blog | Avivamiento Oaxaca',
  description: 'Noticias, informes y actualidad de nuestra casa. Una plataforma de influencia y transparencia.',
}

// Blog Data Structure
const NEWS = [
  {
    id: 1,
    title: "Informe Anual: 11 Años de Fidelidad",
    excerpt: "Un recorrido por los hitos que marcaron nuestra historia y el reporte de transparencia del ejercicio 2025.",
    category: "Informes",
    date: "10 de Enero, 2026",
    image: "/images/blog-informe.jpg", // Placeholder
    author: "Consejo Administrativo"
  },
  {
    id: 2,
    title: "Pasión 2026: Una Visión de Reforma",
    excerpt: "Entendiendo el diseño profético para este nuevo ciclo y nuestro rol como Nueva Raza en la ciudad.",
    category: "Actualidad",
    date: "01 de Enero, 2026",
    image: "/images/blog-vision.jpg",
    author: "Psa. Mónica V."
  },
  {
    id: 3,
    title: "Brigada Médica en Zaachila",
    excerpt: "Llevamos salud y esperanza a más de 200 familias en la zona de Zaachila. Crónica de un día de servicio.",
    category: "Servicio Social",
    date: "28 de Diciembre, 2025",
    image: "/images/blog-brigada.jpg",
    author: "Aviva Hands"
  },
  {
    id: 4,
    title: "El Tabernáculo de David Restaurado",
    excerpt: "Profundizando en la importancia de la adoración contínua y el impacto del Ministerio 24/7.",
    category: "Actualidad",
    date: "15 de Diciembre, 2025",
    image: "/images/blog-adoracion.jpg",
    author: "Ps. David M."
  }
]

const CATEGORIES = [
  { name: 'Actualidad', icon: <FaNewspaper />, count: 12 },
  { name: 'Informes', icon: <FaFileAlt />, count: 5 },
  { name: 'Servicio Social', icon: <FaHandHoldingHeart />, count: 8 },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-aviva-bone font-sans selection:bg-aviva-gold selection:text-black flex flex-col">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-aviva-wine/20 via-black to-black border-b border-white/5 pt-32 pb-20 px-6 text-center">
        <span className="text-aviva-gold font-bold tracking-[0.3em] uppercase mb-4 block animate-fade-in text-xs">
          Sala de Prensa
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">
          Avivamiento <span className="text-gradient-gold">News</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6 font-light leading-relaxed">
          Plataforma de información y transparencia. Conoce el pulso de nuestra casa y nuestro impacto en la sociedad.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* MAIN CONTENT (ARTICLES) */}
          <div className="lg:w-2/3 space-y-12">
            {NEWS.map(post => (
              <article key={post.id} className="flex flex-col md:flex-row gap-8 glass-light p-6 rounded-2xl border border-white/5 hover:border-aviva-gold/30 hover:shadow-gold-subtle transition-all duration-500 group">
                {/* Image Placeholder */}
                <div className="w-full md:w-1/3 aspect-[4/3] bg-aviva-onyx/40 border border-white/5 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold tracking-widest text-sm uppercase bg-black/40">
                    Avivamiento
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-aviva-gold text-black text-[10px] font-black px-3 py-1 uppercase tracking-wider rounded-md">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider mb-3">
                    <span>{post.date}</span>
                    <span className="w-1.5 h-1.5 bg-aviva-gold/40 rounded-full"></span>
                    <span className="text-aviva-gold">{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3 group-hover:text-aviva-gold transition-colors leading-tight uppercase tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-xs font-black text-aviva-gold hover:text-aviva-gold/80 uppercase tracking-widest transition-colors">
                    Leer artículo completo <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3 space-y-8">

            {/* WhatsApp Widget */}
            <div className="bg-[#128C7E]/10 border border-[#128C7E]/30 rounded-3xl p-8 text-white relative overflow-hidden shadow-[0_0_30px_rgba(18,140,126,0.1)]">
              <div className="absolute -right-6 -top-6 text-[#128C7E]/10">
                <FaWhatsapp className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Suscríbete a Noticias</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
                  Recibe los comunicados oficiales y alertas importantes directamente en tu WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.number}?text=Hola%2C%20deseo%20suscribirme%20a%20las%20noticias%20de%20Avivamiento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#128C7E] hover:bg-[#128C7E]/80 text-white font-black py-4 rounded-xl transition-colors shadow-lg uppercase tracking-wider text-xs"
                >
                  ¡Suscribirme Ahora!
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="glass-light p-8 rounded-3xl border border-white/5 shadow-gold-subtle">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-3">
                Categorías
              </h3>
              <ul className="space-y-4">
                {CATEGORIES.map((cat, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-300 hover:text-aviva-gold transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 group-hover:text-aviva-gold transition-colors">{cat.icon}</span>
                      <span className="font-medium text-sm">{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-bold bg-white/5 text-gray-400 py-1 px-2.5 rounded-full group-hover:bg-aviva-gold/10 group-hover:text-aviva-gold transition-colors">
                      {cat.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </main>
      <Footer />
    </div>
  )
}