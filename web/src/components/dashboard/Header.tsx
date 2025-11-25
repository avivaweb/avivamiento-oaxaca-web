'use client';

import { useAuth } from '@/hooks/useAuth';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Título de la página */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Bienvenido, {user?.name || 'Usuario'}
          </h2>
          <p className="text-sm text-gray-600 capitalize">
            Rol: {user?.role || 'N/A'}
          </p>
        </div>

        {/* Usuario y Logout */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="w-8 h-8 text-gray-600" />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-[#A5002F] rounded-lg hover:bg-[#8A0026] transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}