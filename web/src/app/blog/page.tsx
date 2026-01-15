import { Metadata } from 'next'
import Footer from '@/components/Footer'
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Blog | Avivamiento Oaxaca',
  description: 'Artículos, reflexiones y enseñanzas para tu crecimiento espiritual.',
}

// Dummy data for blog posts (SEO tagged as requested)
const BLOG_POSTS = [
  {
    id: 1,
    title: "La Importancia de la Vida en Célula",
    excerpt: "Descubre por qué reunirse en los hogares es el corazón del avivamiento.",
    category: "VidaEnCélula",
    date: "24 de Diciembre, 2025",
    image: "/images/blog-1.jpg"
  },
  {
    id: 2,
    title: "El Poder de los Servicios Dominicales",
    excerpt: "No es solo un evento, es una cita con la presencia de Dios.",
    category: "ServiciosDominicales",
    date: "18 de Diciembre, 2025",
    image: "/images/blog-2.jpg"
  },
  {
    id: 3,
    title: "Restaurando el Altar Familiar",
    excerpt: "Cómo construir un legado de fe desde tu propia casa.",
    category: "VidaEnCélula",
    date: "10 de Diciembre, 2025",
    image: "/images/blog-3.jpg"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--aviva-principal)] text-white flex flex-col">
      <main className="flex-grow">
        {/* Header */}
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center border-b border-white/5">
          <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.3em] uppercase mb-4">
            Aviva Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Reflexiones y <br /> <span className="text-[var(--aviva-dorado)]">Enseñanzas</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Un espacio dedicado a edificar tu fe con contenido profundo y relevante.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <article key={post.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <div className="h-48 bg-gray-800 relative group-hover:opacity-90 transition-opacity">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-bold opacity-30 text-4xl">
                    BIO
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[var(--aviva-dorado)]">
                    #{post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-gray-400 mb-3">{post.date}</div>
                  <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-[var(--aviva-dorado)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-[var(--aviva-dorado)] transition-colors">
                      Leer más <FaArrowRight />
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`¡Mira este artículo de Avivamiento Oaxaca! ${post.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366]/20 p-2 rounded-full text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all transform hover:scale-110"
                      aria-label="Compartir en WhatsApp"
                    >
                      <FaWhatsapp className="text-xl" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}