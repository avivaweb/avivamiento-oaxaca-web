import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ejército Celular | Altares de Gloria - Avivamiento Oaxaca',
    description: 'Estableciendo 1,000 Altares de Gloria en Oaxaca. Vida Zoé, Guerra Espiritual y el Diseño Original para reformar nuestra generación con el Ejército Celular.',
    keywords: ['Vida Zoé', 'Oaxaca', 'Guerra Espiritual', 'Diseño Original', 'Ejército Celular', 'Altares de Gloria', 'Avivamiento'],
    openGraph: {
        title: 'Ejército Celular | Altares de Gloria',
        description: 'El tiempo de la canción ha llegado. Únete a la visión Pasión 2026.',
        type: 'website',
    }
}

export default function AltaresLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
