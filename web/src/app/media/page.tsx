import { Metadata } from 'next'
import MasonryGallery from '@/components/MasonryGallery'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Media | Avivamiento Oaxaca',
    description: 'Galería de fotos, testimonios y momentos que marcan nuestra historia.',
}

export default function MediaPage() {
    return (
        <div className="min-h-screen bg-[var(--aviva-principal)] text-white">
            <section className="relative py-20 px-4 text-center border-b border-white/5">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter">
                    Nuestra <span className="text-[var(--aviva-dorado)]">Galería</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Un vistazo a lo que Dios está haciendo en medio de nosotros.
                </p>
            </section>

            <MasonryGallery />

            <Footer />
        </div>
    )
}
