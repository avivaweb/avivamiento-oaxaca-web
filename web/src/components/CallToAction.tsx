import Link from 'next/link'

export default function CallToAction() {
    return (
        <div className="my-8 text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--aviva-blanco)] mb-3 uppercase tracking-wide">
                TU FAMILIA ESPIRITUAL TE ESPERA
            </h2>
            <p className="text-lg text-[var(--aviva-dorado)] font-semibold mb-6 max-w-2xl mx-auto">
                No es una reunión. Es vinculación. <br />
                El lugar donde eres pastoreado, amado y procesado.
            </p>
            <Link
                href="/grupos-familiares"
                className="inline-block bg-[var(--aviva-dorado)] text-[var(--aviva-principal)] font-extrabold text-xl py-4 px-10 rounded-full min-h-[48px] border border-white/20 hover:bg-white hover:text-[var(--aviva-principal)] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
                CORRE A CASA (Unirse)
            </Link>
        </div>
    )
}
