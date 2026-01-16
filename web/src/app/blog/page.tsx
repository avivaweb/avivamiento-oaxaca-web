import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaWhatsapp, FaArrowRight, FaNewspaper, FaHandHoldingHeart, FaFileAlt } from 'react-icons/fa'

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
    <div className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#DAA520] selection:text-white flex flex-col">

      {/* HEADER */}
      <div className="bg-white border-b border-[#DAA520]/20 pt-24 pb-16 px-6 text-center">
        <span className="text-[#DAA520] font-bold tracking-[0.3em] uppercase mb-4 block animate-fade-in">
          Sala de Prensa
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#333333] tracking-tight">
          Avivamiento <span className="italic text-[#DAA520]">News</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-6 font-light leading-relaxed">
          Plataforma de información y transparencia. Conoce el pulso de nuestra casa y nuestro impacto en la sociedad.
        </p>
      </div>

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* MAIN CONTENT (ARTICLES) */}
          <div className="lg:w-2/3 space-y-12">
            {NEWS.map(post => (
              <article key={post.id} className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
                {/* Image Placeholder */}
                <div className="w-full md:w-1/3 aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif italic text-2xl">
                    IMG
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-[#DAA520] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-[#DAA520]">{post.author}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#333333] mb-3 group-hover:text-[#DAA520] transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-bold text-[#DAA520] hover:text-[#B8860B] uppercase tracking-wide transition-colors">
                    Leer artículo completo <FaArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3 space-y-8">

            {/* WhatsApp Widget */}
            <div className="bg-[#128C7E] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white/10">
                <FaWhatsapp className="w-40 h-40" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold font-serif mb-2">Suscríbete a Noticias</h3>
                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  Recibe los comunicados oficiales y alertas importantes directamente en tu WhatsApp.
                </p>
                <a
                  href="https://wa.me/529514283375?text=Hola%2C%20deseo%20suscribirme%20a%20las%20noticias%20de%20Avivamiento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-white text-[#128C7E] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                >
                  ¡Suscribirme Ahora!
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-[#333333] uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">
                Categorías
              </h3>
              <ul className="space-y-4">
                {CATEGORIES.map((cat, idx) => (
                  <li key={idx} className="flex items-center justify-between text-gray-600 hover:text-[#DAA520] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 group-hover:text-[#DAA520]">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-500 py-1 px-2 rounded-full group-hover:bg-[#DAA520]/10 group-hover:text-[#DAA520]">
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