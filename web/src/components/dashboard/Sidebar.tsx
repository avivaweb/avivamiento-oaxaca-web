'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Inicio', href: '/dashboard/home', icon: HomeIcon },
  { name: 'Mis Células', href: '/dashboard/mis-celulas', icon: UsersIcon },
  { name: 'Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon },
  { name: 'Estadísticas', href: '/dashboard/estadisticas', icon: ChartBarIcon },
  { name: 'Configuración', href: '/dashboard/configuracion', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-[#A5002F] min-h-screen">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-[#8A0026]">
        <h1 className="text-white text-xl font-bold">AVIVA Dashboard</h1>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-[#A5002F]'
                  : 'text-white hover:bg-[#8A0026]'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#8A0026]">
        <p className="text-xs text-white text-center">
          © 2024 AVIVA
        </p>
      </div>
    </div>
  );
}