'use client';

import { useAuth } from '@/hooks/useAuth';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-black border-b border-aviva-gold/20 shadow-lg shadow-black/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Título de la página */}
        <div>
          <h2 className="text-xl font-medium text-aviva-bone">
            Bienvenido, <span className="text-aviva-gold font-bold">{user?.name || 'Guerrero'}</span>
          </h2>
          <p className="text-[10px] text-aviva-gold/60 uppercase tracking-widest mt-1">
            Ministerio de Avivamiento • {user?.rol || 'N/A'}
          </p>
        </div>

        {/* Usuario y Logout */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-semibold text-aviva-bone group-hover:text-aviva-gold transition-colors">{user?.name}</p>
              <p className="text-[10px] text-aviva-bone/40">{user?.email}</p>
            </div>
            <div className="p-1 rounded-full border border-aviva-gold/20 group-hover:border-aviva-gold/50 transition-all">
              <UserCircleIcon className="w-8 h-8 text-aviva-gold/80" />
            </div>
          </div>

          <button
            onClick={logout}
            className="group flex items-center px-4 py-2 text-xs font-bold text-black bg-aviva-gold rounded-full hover:bg-white transition-all duration-300 transform active:scale-95 shadow-md shadow-aviva-gold/20"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
            SALIR
          </button>
        </div>
      </div>
    </header>
  );
}