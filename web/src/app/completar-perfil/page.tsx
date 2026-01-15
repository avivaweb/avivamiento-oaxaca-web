'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CompleteProfilePage() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [zone, setZone] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
            }
        };
        checkUser();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user found');

            // 1. Guardar en public.profiles
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    full_name: fullName,
                    phone: phone,
                    zone: zone,
                    role: role,
                    updated_at: new Date().toISOString(),
                });

            if (profileError) throw profileError;

            // 2. Actualizar metadata del usuario para marcar perfil como completo
            const { error: updateError } = await supabase.auth.updateUser({
                data: {
                    profile_completed: true,
                    full_name: fullName,
                    role: role,
                }
            });

            if (updateError) throw updateError;

            // 3. Redirigir al dashboard
            router.push('/dashboard/home');
            router.refresh();

        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err instanceof Error ? err.message : 'Error al guardar el perfil');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
            <div className="max-w-2xl w-full bg-[#111111] p-8 rounded-lg shadow-[0_0_30px_rgba(218,165,32,0.1)] border border-[#DAA520]/20">
                <div className="text-center mb-10">
                    <Image
                        src="/logo-aviva.png"
                        alt="AVIVA Logo"
                        width={80}
                        height={80}
                        className="mx-auto brightness-0 invert opacity-80"
                    />
                    <h1 className="mt-4 text-3xl font-bold text-[#DAA520]">
                        Completa tu Perfil Ministerial
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Es necesario completar esta información para acceder al sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-[#DAA520] mb-2">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-black border border-[#DAA520]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#DAA520] mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-black border border-[#DAA520]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all"
                                placeholder="Ej. 951 123 4567"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#DAA520] mb-2">
                                Zona de la Ciudad
                            </label>
                            <input
                                type="text"
                                required
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                className="w-full bg-black border border-[#DAA520]/30 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all"
                                placeholder="Ej. Centro, Reforma, Xoxocotlán"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-[#DAA520] mb-2">
                                Rol Ministerial
                            </label>
                            <select
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-black border border-[#DAA520]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DAA520] focus:border-transparent transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Selecciona tu rol...</option>
                                <option value="Lider de Celula">Líder de Célula</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Pastor de Zona">Pastor de Zona</option>
                                <option value="Pastor General">Pastor General</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold py-4 px-8 rounded-lg shadow-lg shadow-[#DAA520]/20 transform transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Guardando Informacion...' : 'Completar Registro'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
