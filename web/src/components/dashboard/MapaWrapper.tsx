'use client';

import dynamic from 'next/dynamic';

const MapaConquista = dynamic(() => import('./MapaConquista'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-aviva-onyx animate-pulse rounded-2xl border border-white/5 flex items-center justify-center text-aviva-gold/40">Cargando Mapa de Gloria...</div>
});

export default function MapaWrapper() {
    return <MapaConquista />;
}
