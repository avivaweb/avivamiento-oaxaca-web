import Link from 'next/link'

export default function CallToAction() {
    return (
        <div className="my-8 text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--aviva-blanco)] mb-3">
                Grupos Familiares: Tu lugar en el Linaje Escogido
            </h2>
            <p className="text-lg text-[var(--aviva-dorado)] font-semibold mb-6">
                Encuentra apoyo y comunidad en nuestro Ejército Celular. Somos agentes de transformación en Oaxaca, caminando como Real Sacerdocio.
            </p>
            <Link
                href="/grupos-familiares"
                className="inline-block bg-[var(--aviva-dorado)] text-[var(--aviva-principal)] font-extrabold text-xl py-4 px-10 rounded-full min-h-[48px] border border-white/20 hover:bg-white hover:text-[var(--aviva-principal)] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
                Unirme a un Grupo (Linaje Escogido)
            </Link>
        </div>
    )
}
