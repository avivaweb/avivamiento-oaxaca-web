'use client';

import { useState, FormEvent, useEffect } from 'react';
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
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/curaduria');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // La redirección ahora ocurre automáticamente gracias al useEffect superior
      // o dentro del AuthContext
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative px-4 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-aviva-wine/20 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-md w-full space-y-8 glass-light p-10 rounded-3xl border border-white/5 shadow-gold-subtle">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/logo-aviva.png"
            alt="AVIVA Logo"
            width={100}
            height={100}
            className="mx-auto drop-shadow-2xl animate-float"
          />
          <h2 className="mt-8 text-3xl font-black text-white uppercase tracking-tight leading-none italic">
            Centro de <span className="text-gradient-gold">Comando</span>
          </h2>
          <p className="mt-3 text-xs uppercase tracking-widest text-gray-500 font-light">
            Inicia sesión para acceder al sistema
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-950/40 border border-red-500/30 text-red-400 p-4 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-aviva-gold/80 font-bold ml-1 mb-2">
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
                className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 focus:border-aviva-gold/50 focus:bg-black focus:outline-none transition-all placeholder-white/25 text-white font-light text-base"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-[0.2em] text-aviva-gold/80 font-bold ml-1 mb-2">
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
                className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 focus:border-aviva-gold/50 focus:bg-black focus:outline-none transition-all placeholder-white/25 text-white font-light text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-aviva-gold hover:bg-white text-black font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-2xl shadow-[0_0_30px_rgba(218,165,32,0.15)] hover:shadow-[0_0_50px_rgba(218,165,32,0.3)] disabled:opacity-50 disabled:cursor-not-allowed italic text-base"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar al Altar'}
            </button>
          </div>

          <div className="text-center pt-2">
            <a href="/" className="text-[10px] text-aviva-gold/60 hover:text-aviva-gold uppercase tracking-[0.2em] font-bold transition-colors">
              Volver al sitio principal
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}