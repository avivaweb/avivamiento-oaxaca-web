import Link from 'next/link'

export default function CallToAction() {
    return (
        <div className="my-8 text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--aviva-blanco)] mb-3">
                ¡ENCUENTRA TU GRUPO FAMILIAR (CÉLULA) HOY!
            </h2>
            <p className="text-lg text-[var(--aviva-dorado)] font-semibold mb-6">
                Comunión, Crecimiento y Unción
            </p>
            <Link
                href="/grupos-celulares"
                className="inline-block bg-[var(--aviva-dorado)] text-[var(--aviva-principal)] font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[var(--aviva-principal)] transition-all transform hover:scale-105 shadow-lg"
            >
                Unirme Ahora
            </Link>
        </div>
    )
}
