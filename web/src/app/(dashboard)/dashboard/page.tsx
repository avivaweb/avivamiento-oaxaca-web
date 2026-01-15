'use client';

import { useAuth } from '@/hooks/useAuth';
import ContentManagerView from '@/components/dashboard/views/ContentManagerView';
import LeaderView from '@/components/dashboard/views/LeaderView';
import SupervisorView from '@/components/dashboard/views/SupervisorView';
import ZonePastorView from '@/components/dashboard/views/ZonePastorView';
import GeneralPastorView from '@/components/dashboard/views/GeneralPastorView';

export default function DashboardHomePage() {
    const { user } = useAuth();

    const role = user?.role;

    const renderView = () => {
        if (!role) return null;

        switch (role) {
            case 'CMAvivamiento':
                return <ContentManagerView />;
            case 'Lider de Celula':
                return <LeaderView />;
            case 'Supervisor':
                return <SupervisorView />;
            case 'Pastor de Zona':
                return <ZonePastorView />;
            case 'Pastor General':
            case 'admin':
                return <GeneralPastorView />;
            default:
                // Fallback for unknown roles or 'member' legacy
                return <LeaderView />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Encabezado Personalizado */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Visión General
                </h1>
                <p className="mt-2 text-gray-600">
                    Bienvenido, {user?.name || 'Usuario'} <span className="text-[#DAA520] font-semibold">- {role || 'Cargando...'}</span>
                </p>
            </div>

            {/* Renderizado de Vistas según Rol */}
            <div className="mt-6">
                {renderView()}
            </div>
        </div>
    );
}
