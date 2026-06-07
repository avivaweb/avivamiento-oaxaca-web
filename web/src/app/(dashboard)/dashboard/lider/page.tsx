'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, FileText, User, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';
import ReportForm from '@/components/dashboard/lider/ReportForm';
import ReportSuccess from '@/components/dashboard/lider/ReportSuccess';
import ReportHistory from '@/components/dashboard/lider/ReportHistory';
import type { SubmitReportResult } from '@/types/report';

type ViewState = 'form' | 'success' | 'history';

export default function LiderPage() {
  const { user } = useAuth();
  const [view, setView] = useState<ViewState>('form');

  const handleSuccess = useCallback((_result: SubmitReportResult) => {
    setView('success');
  }, []);

  const handleContinueToHistory = useCallback(() => {
    setView('history');
  }, []);

  const handleNewReport = useCallback(() => {
    setView('form');
  }, []);

  return (
    <div className="min-h-screen bg-black text-aviva-bone relative">
      {/* ═══════ Header ═══════ */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
              <Zap size={16} className="text-aviva-gold" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white uppercase tracking-tight leading-none">
                Reporte Rápido
              </h1>
              <p className="text-[10px] text-gray-500 italic">
                {user?.name || 'Líder'} • Pasión 2026
              </p>
            </div>
          </div>

          {/* View Toggle Pills */}
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5">
            <button
              onClick={() => setView('form')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                view === 'form'
                  ? 'bg-aviva-gold text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Nuevo
            </button>
            <button
              onClick={() => setView('history')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                view === 'history'
                  ? 'bg-aviva-gold text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Historial
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ Content ═══════ */}
      <div className="max-w-lg mx-auto px-4 pt-6">
        <AnimatePresence mode="wait">
          {view === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ReportForm onSuccess={handleSuccess} />
            </motion.div>
          )}

          {view === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ReportHistory onNewReport={handleNewReport} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success is a full-screen overlay */}
        <AnimatePresence>
          {view === 'success' && (
            <ReportSuccess onContinue={handleContinueToHistory} />
          )}
        </AnimatePresence>
      </div>

      {/* ═══════ Mobile Bottom Nav ═══════ */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 safe-area-pb">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          <NavItem
            icon={Home}
            label="Inicio"
            href="/dashboard"
          />
          <NavItem
            icon={Users}
            label="Célula"
            href="/dashboard/mis-celulas"
          />
          <NavItem
            icon={FileText}
            label="Reporte"
            active
            onClick={() => setView('form')}
          />
          <NavItem
            icon={User}
            label="Perfil"
            href="/completar-perfil"
          />
        </div>
      </div>

      {/* ═══════ Support Link (using siteConfig) ═══════ */}
      {siteConfig.whatsapp.number && (
        <div className="fixed bottom-20 right-4 z-20">
          <a
            href={`https://wa.me/${siteConfig.whatsapp.number}?text=Necesito%20soporte%20técnico%20con%20el%20reporte`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-green-600/20 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-600/30 transition-colors shadow-lg"
            aria-label="Soporte técnico por WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

// ── Bottom Nav Item ──
function NavItem({
  icon: Icon,
  label,
  active = false,
  href,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const classes = `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all ${
    active
      ? 'text-aviva-gold'
      : 'text-gray-500 hover:text-gray-300 active:text-white'
  }`;

  if (href) {
    return (
      <a href={href} className={classes}>
        <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
        <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
        {active && <div className="w-1 h-1 rounded-full bg-aviva-gold mt-0.5" />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
      {active && <div className="w-1 h-1 rounded-full bg-aviva-gold mt-0.5" />}
    </button>
  );
}
