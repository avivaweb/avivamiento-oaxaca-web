import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard', '/completar-perfil'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // 0. Redirecciones de Unificación (Legacy -> Canonical)
  if (pathname.startsWith('/sermones') || pathname.startsWith('/media')) {
    return NextResponse.redirect(new URL('/mensajes', request.url));
  }

  // 1. Verificación de Autenticación Básica
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Si hay token, verificar si el perfil está completo
  if (token) {
    // Redirigir de login a dashboard si ya hay sesión
    if (pathname === '/login' || pathname === '/registro') {
      // Check profile status before deciding where to send
      try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        const isProfileComplete = payload.user_metadata?.profile_completed;

        if (!isProfileComplete) {
          return NextResponse.redirect(new URL('/completar-perfil', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (e) {
        // Si falla decodificación, ignorar (se manejará en apps)
      }
    }

    // Lógica de Perfil Incompleto
    try {
      // Decodificar JWT de forma segura (payload es la segunda parte)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      const isProfileComplete = payload.user_metadata?.profile_completed;


      // Si el perfil NO está completo y NO estamos ya en /completar-perfil, redirigir
      if (!isProfileComplete && !pathname.startsWith('/completar-perfil')) {
        return NextResponse.redirect(new URL('/completar-perfil', request.url));
      }

      // Si el perfil SÍ está completo y estamos en /completar-perfil, mandar al dashboard
      if (isProfileComplete && pathname.startsWith('/completar-perfil')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Role Based Access Control (RBAC) Logic
      // Try to get role from app_metadata (secure) or user_metadata (fallback), ignore standard 'authenticated' role
      const role = payload.app_metadata?.role || payload.user_metadata?.role;

      // CMAvivamiento restrictions: Cannot access Cell Reports, Stats, etc.
      // Allowed: /dashboard, /dashboard/sermones, /dashboard/blog, /dashboard/galeria
      if (role === 'CMAvivamiento') {
        const restrictedForCM = [
          '/dashboard/mis-celulas',
          '/dashboard/reportes',
          '/dashboard/estadisticas',
          '/dashboard/discipulado',
          '/dashboard/consolidacion',
          '/dashboard/agenda',
          '/dashboard/ejercito-celular',
          '/dashboard/muro-milagros',
          '/dashboard/paternidad'
        ];
        if (restrictedForCM.some(path => pathname.startsWith(path))) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

      // Pastor General restrictions: Cannot access Content Management forms directly (to reduce noise)
      // Allowed: /dashboard, /dashboard/ejercito-celular, etc.
      // Hidden: /dashboard/sermones, /dashboard/blog, /dashboard/galeria
      if (role === 'Pastor General') {
        const restrictedForPastor = [
          '/dashboard/sermones',
          '/dashboard/blog',
          '/dashboard/galeria'
        ];
        if (restrictedForPastor.some(path => pathname.startsWith(path))) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }

    } catch (error) {
      console.error('Error decoding token in middleware:', error);
      // En caso de error de token, podríamos borrarlo o redirigir a login, 
      // pero por seguridad dejamos pasar y que el backend rechace si es inválido.
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/completar-perfil',
    '/login',
    '/registro',
  ],
};