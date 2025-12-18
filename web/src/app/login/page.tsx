'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    router.push('/dashboard/home');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Obtener URL de redirección si existe
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect') || '/dashboard/home';
      router.push(redirectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC] px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/logo-aviva.png"
            alt="AVIVA Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Dashboard de Liderazgo
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Inicia sesión para acceder al sistema
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#A5002F] focus:border-[#A5002F]"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#A5002F] focus:border-[#A5002F]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A5002F] hover:bg-[#8A0026] text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg hover:shadow-[#A5002F]/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="text-center">
            <a href="/" className="text-sm text-[#A5002F] hover:underline">
              Volver al sitio principal
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}