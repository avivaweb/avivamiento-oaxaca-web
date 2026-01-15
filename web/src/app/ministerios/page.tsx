import { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Ministerios | Avivamiento Oaxaca',
    description: 'Conoce los ministerios de nuestra casa y sirve con nosotros.',
}

export default function MinisteriosPage() {
    return (
        <div className="min-h-screen bg-[var(--aviva-principal)] text-white flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                <span className="text-[var(--aviva-dorado)] font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">
                    Próximamente
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-[#F9A825]">Ministerios</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Estamos preparando un espacio para que descubras tu lugar en el cuerpo de Cristo.
                </p>
            </main>
            <Footer />
        </div>
    )
}
