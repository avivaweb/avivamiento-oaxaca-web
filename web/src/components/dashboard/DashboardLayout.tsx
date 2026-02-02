'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          {/* Cinematic Skeleton Loader */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-aviva-gold/20 animate-spin transition-all duration-1000"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aviva-wine to-black animate-pulse shadow-[0_0_30px_rgba(74,1,25,0.5)]"></div>
            </div>
          </div>
          <p className="mt-8 text-aviva-gold font-medium tracking-[0.2em] uppercase text-xs animate-pulse">
            Iniciando Ecosistema...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-black text-aviva-bone selection:bg-aviva-gold/30 selection:text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-black to-aviva-onyx/20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}