'use client';

// ... keep existing imports ...
import Link from 'next/link';
import {
    HandRaisedIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import PastoralMessages from '../PastoralMessages';

export default function LeaderView() {
    return (
        <div className="space-y-8">
            {/* Pastoral Messages Section */}
            <PastoralMessages />

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/dashboard/mis-celulas/reportar"
                    className="group relative overflow-hidden bg-[#A5002F] rounded-2xl p-8 shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]"
                >
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 translate-y-[-2rem] rounded-full bg-white/10 opacity-50 blur-2xl group-hover:bg-white/20"></div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <HandRaisedIcon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">Reportar Asistencia</h3>
                        <p className="text-white/80">
                            Registra la asistencia semanal de tu célula, ofrendas y nuevas decisiones.
                        </p>
                    </div>
                </Link>

                <Link
                    href="/dashboard/mis-celulas"
                    className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl hover:border-[#DAA520]/50"
                >
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 translate-y-[-2rem] rounded-full bg-gray-100 opacity-50 blur-2xl group-hover:bg-[#DAA520]/10"></div>

                    <div className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 group-hover:bg-[#DAA520]/20 transition-colors">
                            <UserGroupIcon className="h-6 w-6 text-gray-600 group-hover:text-[#DAA520]" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-gray-900">Ver mi Célula</h3>
                        <p className="text-gray-500">
                            Administra los miembros de tu grupo, ver historial y seguimiento.
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

