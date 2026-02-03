import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
  CalendarIcon,
  HandRaisedIcon,
  BookOpenIcon,     // Sermones
  PencilSquareIcon, // Blog
  PhotoIcon,        // Galeria
  SparklesIcon,     // Muro Milagros
  HeartIcon,        // Paternidad
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const getFilteredNavigation = () => {
    if (!user) return [];

    const rol = user.rol;

    let items = [
      { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    ];

    if (rol === 'CMAvivamiento') {
      items.push({ name: 'Sermones', href: '/dashboard/sermones', icon: BookOpenIcon });
      items.push({ name: 'Blog', href: '/dashboard/blog', icon: PencilSquareIcon });
      items.push({ name: 'Galería', href: '/dashboard/galeria', icon: PhotoIcon });
      items.push({ name: 'CRM Seguimiento', href: '/dashboard/crm', icon: HeartIcon });
    }

    if (rol === 'Lider de Celula') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Reportar Asistencia', href: '/dashboard/mis-celulas/reportar', icon: HandRaisedIcon });
    }

    if (rol === 'Supervisor') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Mi Sector', href: '/dashboard/mis-celulas', icon: UsersIcon });
      items.push({ name: 'Estado de Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
    }

    if (rol === 'Pastor de Zona') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Mapa de Células', href: '/dashboard/mis-celulas', icon: UsersIcon });
      items.push({ name: 'Gráficas de Zona', href: '/dashboard/estadisticas', icon: ChartBarIcon });
      items.push({ name: 'Consolidación', href: '/dashboard/consolidacion', icon: UsersIcon });
      items.push({ name: 'Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
      items.push({ name: 'Curaduría', href: '/dashboard/curaduria', icon: PhotoIcon });
    }

    if (rol === 'Pastor General' || rol === 'admin') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Ejército Celular', href: '/dashboard/ejercito-celular', icon: UsersIcon });
      items.push({ name: 'Muro de Milagros', href: '/dashboard/muro-milagros', icon: SparklesIcon });
      items.push({ name: 'CRM Seguimiento', href: '/dashboard/crm', icon: HeartIcon });
      items.push({ name: 'Paternidad', href: '/dashboard/paternidad', icon: ChatBubbleBottomCenterTextIcon });
      items.push({ name: 'Consolidación', href: '/dashboard/consolidacion', icon: UsersIcon });
      items.push({ name: 'Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
      items.push({ name: 'Cosecha y Discipulado', href: '/dashboard/estadisticas', icon: ChartBarIcon });
      items.push({ name: 'Curaduría', href: '/dashboard/curaduria', icon: PhotoIcon });
      items.push({ name: 'Agenda', href: '/dashboard/agenda', icon: CalendarIcon });
      items.push({ name: 'Configuración', href: '/dashboard/configuracion', icon: Cog6ToothIcon });
    }

    return items;
  };

  const navigation = getFilteredNavigation();

  return (
    <div className="flex flex-col w-64 bg-aviva-onyx min-h-screen border-r border-aviva-gold/20">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-black/40 border-b border-aviva-gold/10">
        <h1 className="text-aviva-gold text-xl font-bold tracking-widest">AVIVA</h1>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${isActive
                ? 'bg-aviva-gold/10 text-aviva-gold border border-aviva-gold/30'
                : 'text-aviva-bone hover:bg-aviva-gold/5 hover:text-white'
                }`}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-aviva-gold' : 'text-aviva-gold/60'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-aviva-gold/10 bg-black/20">
        <div className="mb-4 px-2">
          <div className="text-[10px] text-aviva-gold/60 uppercase font-bold tracking-widest mb-1">Ministerio</div>
          <div className="text-sm text-aviva-bone font-medium truncate">{user?.name}</div>
          <div className="text-[11px] text-aviva-gold/80 italic">{user?.rol}</div>
        </div>
        <p className="text-[10px] text-aviva-bone/40 text-center italic mb-2 px-2">
          "Evangelizando el mundo con la Vida Zoé"
        </p>
        <p className="text-[9px] text-aviva-gold/30 text-center uppercase tracking-tighter">
          © 2026 Pasión
        </p>
      </div>
    </div>
  );
}