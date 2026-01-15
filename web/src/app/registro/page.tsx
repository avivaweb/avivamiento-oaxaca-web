'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            // 1. Crear usuario en Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) {
                throw signUpError;
            }

            if (data.user) {
                // 2. Intentar iniciar sesión automáticamente para establecer cookies/contexto
                try {
                    await login(email, password);
                    // Si el login es exitoso, redirigir a completar perfil
                    // La redirección real sucederá por el middleware o aquí
                    router.push('/completar-perfil');
                } catch (loginError) {
                    // Si falla el auto-login (ej. requiere confirmación de email), enviar al login
                    console.warn('Auto-login failed:', loginError);
                    router.push('/login?message=Registro exitoso. Por favor inicia sesión.');
                }
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err instanceof Error ? err.message : 'Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="max-w-md w-full space-y-8 bg-[#111111] p-8 rounded-lg shadow-[0_0_20px_rgba(218,165,32,0.15)] border border-[#DAA520]/20">
                {/* Logo */}
                <div className="text-center">
                    <Image
                        src="/logo-aviva.png"
                        alt="AVIVA Logo"
                        width={120}
                        height={120}
                        className="mx-auto brightness-0 invert"
                    />
                    <h2 className="mt-6 text-3xl font-bold text-[#DAA520]">
                        Crear Cuenta
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Únete a la plataforma de liderazgo
                    </p>
                </div>

                {/* Formulario */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#DAA520]">
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
                                className="mt-1 block w-full px-3 py-2 bg-black border border-[#DAA520]/30 rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-[#DAA520] focus:border-[#DAA520]"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#DAA520]">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-black border border-[#DAA520]/30 rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-[#DAA520] focus:border-[#DAA520]"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#DAA520]">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-black border border-[#DAA520]/30 rounded-md text-white placeholder-gray-600 focus:outline-none focus:ring-[#DAA520] focus:border-[#DAA520]"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg shadow-[#DAA520]/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link href="/login" className="text-sm text-[#DAA520] hover:text-[#FFD700] hover:underline">
                            ¿Ya tienes cuenta? Inicia Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
