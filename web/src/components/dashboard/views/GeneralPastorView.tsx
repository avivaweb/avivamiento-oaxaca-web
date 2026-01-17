'use client';

import { useAuth } from '@/hooks/useAuth';
import StatsGrid from '../StatsGrid'; // New Component
import RecentVictories from '../RecentVictories'; // New Component
import MiracleWall from '../MiracleWall'; // Existing

export default function GeneralPastorView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Sección Superior: Control Global */}
            <div>
                <StatsGrid />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna Principal: Muro de Milagros (Feed Largo) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-gradient-to-r from-[#DAA520]/10 to-transparent p-1 rounded-2xl">
                        <h2 className="text-white font-serif text-2xl font-bold mb-4 px-2">Muro de Gloria</h2>
                        <MiracleWall />
                    </div>
                </div>

                {/* Columna Lateral: Feed Rápido y Acciones */}
                <div className="space-y-8">
                    {/* Victorias Recientes (Compacto) */}
                    <RecentVictories />

                    {/* Acciones de Gobierno */}
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 sticky top-6">
                        <h3 className="text-white font-bold mb-4">Gobierno Apostólico</h3>
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-[#DAA520] text-black font-bold rounded-lg hover:bg-[#B8860B] transition-colors shadow-lg shadow-[#DAA520]/10 flex items-center justify-center gap-2">
                                <span>⚡</span> Aprobar Registros
                            </button>
                            <button className="w-full py-3 bg-white/5 text-gray-300 font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                                Ver Calendario Global
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
