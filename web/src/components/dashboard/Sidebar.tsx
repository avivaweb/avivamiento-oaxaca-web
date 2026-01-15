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

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: string[]; // Roles permitidos, si undefined es público para todos los authed
}

const allNavigation: NavItem[] = [
  {
    name: 'Inicio',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['Lider de Celula', 'Supervisor', 'Pastor de Zona', 'Pastor General', 'admin']
  },
  {
    name: 'Discipulado',
    href: '/dashboard/discipulado',
    icon: AcademicCapIcon,
    roles: ['Lider de Celula', 'Supervisor', 'Pastor de Zona', 'Pastor General', 'admin']
  },
  {
    name: 'Mis Células',
    href: '/dashboard/mis-celulas',
    icon: UsersIcon,
    roles: ['Supervisor', 'Pastor de Zona', 'Pastor General', 'admin'] // Lider solo ve reportar
  },
  {
    name: 'Reporte de Célula',
    href: '/dashboard/mis-celulas/reportar',
    icon: HandRaisedIcon,
    roles: ['Lider de Celula', 'admin'] // Solo lider reporta directamente (o admin debug)
  },
  {
    name: 'Mi Sector',
    href: '/dashboard/mis-celulas', // Reusamos la ruta pero con otro nombre visual para Supervisor? Ojo con colisiones.
    icon: UsersIcon,
    roles: [] // Lo manejamos con lógica custom abajo mejor
  },
  {
    name: 'Consolidación',
    href: '/dashboard/consolidacion',
    icon: UsersIcon,
    roles: ['Pastor de Zona', 'Pastor General', 'admin']
  },
  {
    name: 'Reportes',
    href: '/dashboard/reportes',
    icon: DocumentTextIcon,
    roles: ['Supervisor', 'Pastor de Zona', 'Pastor General', 'admin']
  },
  {
    name: 'Estadísticas',
    href: '/dashboard/estadisticas',
    icon: ChartBarIcon,
    roles: ['Pastor de Zona', 'Pastor General', 'admin']
  },
  {
    name: 'Agenda',
    href: '/dashboard/agenda',
    icon: CalendarIcon,
    roles: ['Pastor General', 'admin']
  },
  {
    name: 'Configuración',
    href: '/dashboard/configuracion',
    icon: Cog6ToothIcon,
    roles: ['Pastor General', 'admin']
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const getFilteredNavigation = () => {
    if (!user) return [];

    const role = user.role;

    // Base items available to everyone with specific logic overrides
    let items = [
      { name: 'Inicio', href: '/dashboard', icon: HomeIcon },
    ];

    if (role === 'CMAvivamiento') {
      items.push({ name: 'Sermones', href: '/dashboard/sermones', icon: BookOpenIcon });
      items.push({ name: 'Blog', href: '/dashboard/blog', icon: PencilSquareIcon });
      items.push({ name: 'Galería', href: '/dashboard/galeria', icon: PhotoIcon });
      items.push({ name: 'CRM Seguimiento', href: '/dashboard/crm', icon: HeartIcon });
    }

    if (role === 'Lider de Celula') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Reportar Asistencia', href: '/dashboard/mis-celulas/reportar', icon: HandRaisedIcon });
    }

    if (role === 'Supervisor') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Mi Sector', href: '/dashboard/mis-celulas', icon: UsersIcon });
      items.push({ name: 'Estado de Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
    }

    if (role === 'Pastor de Zona') {
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Mapa de Células', href: '/dashboard/mis-celulas', icon: UsersIcon });
      items.push({ name: 'Gráficas de Zona', href: '/dashboard/estadisticas', icon: ChartBarIcon });
      items.push({ name: 'Consolidación', href: '/dashboard/consolidacion', icon: UsersIcon });
      items.push({ name: 'Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
    }

    if (role === 'Pastor General' || role === 'admin') {
      // Focus on Ministerial Leadership
      items.push({ name: 'Discipulado', href: '/dashboard/discipulado', icon: AcademicCapIcon });
      items.push({ name: 'Ejército Celular', href: '/dashboard/ejercito-celular', icon: UsersIcon });
      items.push({ name: 'Muro de Milagros', href: '/dashboard/muro-milagros', icon: SparklesIcon });
      items.push({ name: 'CRM Seguimiento', href: '/dashboard/crm', icon: HeartIcon });
      items.push({ name: 'Paternidad', href: '/dashboard/paternidad', icon: ChatBubbleBottomCenterTextIcon });
      items.push({ name: 'Consolidación', href: '/dashboard/consolidacion', icon: UsersIcon });
      items.push({ name: 'Reportes', href: '/dashboard/reportes', icon: DocumentTextIcon });
      items.push({ name: 'Estadísticas', href: '/dashboard/estadisticas', icon: ChartBarIcon });
      items.push({ name: 'Agenda', href: '/dashboard/agenda', icon: CalendarIcon });
      items.push({ name: 'Configuración', href: '/dashboard/configuracion', icon: Cog6ToothIcon });
    }

    return items;
  };

  const navigation = getFilteredNavigation();

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
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
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
        <div className="mb-4 px-2">
          <div className="text-xs text-white/60 uppercase font-semibold tracking-wider mb-1">Tu Rol</div>
          <div className="text-sm text-white font-medium">{user?.role || 'Cargando...'}</div>
        </div>
        <p className="text-xs text-white text-center italic mb-2">
          "Nuestra tarea principal: La evangelización del mundo"
        </p>
        <p className="text-xs text-white text-center opacity-75">
          © 2026 Ecosistema Operativo
        </p>
      </div>
    </div>
  );
}