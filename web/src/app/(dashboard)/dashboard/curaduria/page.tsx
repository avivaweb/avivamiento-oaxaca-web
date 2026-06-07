'use client';

// ────────────────────────────────────────────────────────────
// Dashboard: Centro de Comando IA — Curaduría Pastoral
// Avivamiento Oaxaca — Pasión 2026
//
// Secciones:
//   Tab 1 → Generador IA (procesar audio/video)
//   Tab 2 → Biblioteca de Contenido (aprobar / rechazar / publicar)
//   Tab 3 → Galería de Reportes (evidencias células)
// ────────────────────────────────────────────────────────────

import { useState, useEffect, useTransition, useCallback } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  generateAIContent,
  updateAIContentStatus,
  fetchAIContents,
  type GenerateAIContentState,
} from '@/lib/actions/generateAIContent';
import type { AIGeneratedContent } from '@/types/ai';

import {
  SparklesIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  GlobeAltIcon,
  ClipboardDocumentIcon,
  ArrowPathIcon,
  MicrophoneIcon,
  HashtagIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

// ─── Types ──────────────────────────────────────────────────

type Tab = 'generator' | 'library' | 'gallery';

interface ReportWithPhoto {
  id: string;
  fotos_urls: string[];
  zona: string;
  testimonies: string;
  destacado: boolean;
  created_at: string;
}

// ─── Helpers ─────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:   { label: 'Pendiente',  color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  approved:  { label: 'Aprobado',   color: 'text-green-400  bg-green-400/10  border-green-400/30'  },
  rejected:  { label: 'Rechazado',  color: 'text-red-400    bg-red-400/10    border-red-400/30'    },
  published: { label: 'Publicado',  color: 'text-blue-400   bg-blue-400/10   border-blue-400/30'   },
};

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

// ─── Sub-componentes ─────────────────────────────────────────

function TabButton({
  active, onClick, icon: Icon, label, count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
        active
          ? 'bg-aviva-gold text-black shadow-lg shadow-aviva-gold/20'
          : 'text-aviva-bone/60 hover:text-aviva-bone hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {count !== undefined && (
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${active ? 'bg-black/20 text-black' : 'bg-white/10 text-aviva-bone/60'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      title="Copiar"
      className="p-1.5 rounded-lg text-aviva-bone/40 hover:text-aviva-gold hover:bg-aviva-gold/10 transition-colors"
    >
      {copied ? (
        <CheckCircleIcon className="w-4 h-4 text-green-400" />
      ) : (
        <ClipboardDocumentIcon className="w-4 h-4" />
      )}
    </button>
  );
}

// ─── TAB 1: Generador IA ─────────────────────────────────────

function GeneratorTab() {
  const [audioUrl, setAudioUrl]   = useState('');
  const [author, setAuthor]       = useState('');
  const [title, setTitle]         = useState('');
  const [ytVideoId, setYtVideoId] = useState('');
  const [state, setState]         = useState<GenerateAIContentState>({ status: 'idle' });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioUrl) return;

    setState({ status: 'loading' });

    startTransition(async () => {
      const result = await generateAIContent({
        audioUrl,
        metadata: {
          title:          title  || undefined,
          author:         author || undefined,
          youtubeVideoId: ytVideoId || undefined,
        },
      });
      setState(result);
    });
  };

  const isLoading = isPending || state.status === 'loading';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── Formulario ── */}
      <div className="bg-white/[0.02] border border-aviva-gold/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-aviva-gold/10 flex items-center justify-center">
            <MicrophoneIcon className="w-5 h-5 text-aviva-gold" />
          </div>
          <div>
            <h2 className="text-aviva-bone font-bold text-lg">Procesar Audio / Video</h2>
            <p className="text-aviva-bone/40 text-sm">Transcripción + SEO + Copy de Redes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* URL */}
          <div>
            <label className="block text-xs font-bold text-aviva-gold/70 uppercase tracking-widest mb-2">
              URL del Audio *
            </label>
            <input
              type="url"
              value={audioUrl}
              onChange={e => setAudioUrl(e.target.value)}
              placeholder="https://... (MP3, WAV, MP4, o URL pública)"
              required
              className="w-full bg-black/40 border border-aviva-gold/20 rounded-xl px-4 py-3 text-aviva-bone placeholder-aviva-bone/30 text-sm focus:outline-none focus:border-aviva-gold transition-colors"
            />
          </div>

          {/* YouTube Video ID */}
          <div>
            <label className="block text-xs font-bold text-aviva-gold/70 uppercase tracking-widest mb-2">
              YouTube Video ID <span className="text-aviva-bone/30 normal-case font-normal">(opcional)</span>
            </label>
            <input
              type="text"
              value={ytVideoId}
              onChange={e => setYtVideoId(e.target.value)}
              placeholder="dQw4w9WgXcQ"
              className="w-full bg-black/40 border border-aviva-gold/20 rounded-xl px-4 py-3 text-aviva-bone placeholder-aviva-bone/30 text-sm focus:outline-none focus:border-aviva-gold transition-colors"
            />
          </div>

          {/* Predicador */}
          <div>
            <label className="block text-xs font-bold text-aviva-gold/70 uppercase tracking-widest mb-2">
              Predicador / Autor <span className="text-aviva-bone/30 normal-case font-normal">(opcional)</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Ej: Ps. Josué García"
              className="w-full bg-black/40 border border-aviva-gold/20 rounded-xl px-4 py-3 text-aviva-bone placeholder-aviva-bone/30 text-sm focus:outline-none focus:border-aviva-gold transition-colors"
            />
          </div>

          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-aviva-gold/70 uppercase tracking-widest mb-2">
              Título del Mensaje <span className="text-aviva-bone/30 normal-case font-normal">(opcional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: El Fuego del Avivamiento"
              className="w-full bg-black/40 border border-aviva-gold/20 rounded-xl px-4 py-3 text-aviva-bone placeholder-aviva-bone/30 text-sm focus:outline-none focus:border-aviva-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !audioUrl}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-aviva-gold text-black hover:bg-[#B8860B] shadow-lg shadow-aviva-gold/20"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                Procesando... (puede tardar 1-3 min)
              </>
            ) : (
              <>
                <SparklesIcon className="w-4 h-4" />
                Generar Contenido IA
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {state.status === 'error' && (
          <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm font-semibold mb-1">❌ Error</p>
            <p className="text-red-300/80 text-sm">{state.message}</p>
          </div>
        )}
      </div>

      {/* ── Resultado ── */}
      <div>
        {state.status === 'loading' && (
          <div className="h-full flex flex-col items-center justify-center gap-4 text-center p-12 bg-white/[0.02] border border-aviva-gold/10 rounded-2xl">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-aviva-gold/20 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-t-aviva-gold animate-spin" />
              <SparklesIcon className="absolute inset-0 m-auto w-6 h-6 text-aviva-gold" />
            </div>
            <div>
              <p className="text-aviva-bone font-bold">Motor IA en marcha...</p>
              <p className="text-aviva-bone/40 text-sm mt-1">Transcribiendo → Analizando → Generando Copy</p>
            </div>
          </div>
        )}

        {state.status === 'success' && (
          <AIResultCard content={state.data} compact />
        )}

        {state.status === 'idle' && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-12 bg-white/[0.02] border border-dashed border-aviva-gold/10 rounded-2xl">
            <SparklesIcon className="w-12 h-12 text-aviva-gold/20" />
            <p className="text-aviva-bone/30 text-sm">El resultado aparecerá aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tarjeta de Resultado IA ──────────────────────────────────

function AIResultCard({ content, compact = false }: { content: AIGeneratedContent; compact?: boolean }) {
  const [tab, setTab] = useState<'seo' | 'social' | 'transcript'>('seo');

  return (
    <div className="bg-white/[0.02] border border-aviva-gold/20 rounded-2xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-aviva-gold/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-aviva-gold/60 uppercase tracking-widest mb-1">Título SEO</p>
            <h3 className="text-aviva-bone font-bold leading-tight truncate">{content.seo_title}</h3>
          </div>
          <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border ${STATUS_CONFIG[content.status].color}`}>
            {STATUS_CONFIG[content.status].label}
          </span>
        </div>
        {content.author_name && (
          <p className="text-aviva-bone/40 text-xs mt-2">👤 {content.author_name}</p>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-aviva-gold/10">
        {(['seo', 'social', 'transcript'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
              tab === t ? 'text-aviva-gold border-b-2 border-aviva-gold' : 'text-aviva-bone/30 hover:text-aviva-bone/60'
            }`}
          >
            {t === 'seo' ? 'SEO' : t === 'social' ? 'Redes' : 'Transcripción'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {tab === 'seo' && (
          <>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-aviva-gold/50 uppercase tracking-wider">Meta descripción</p>
                <CopyButton text={content.seo_description} />
              </div>
              <p className="text-aviva-bone/70 text-sm leading-relaxed">{content.seo_description}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-aviva-gold/50 uppercase tracking-wider mb-2">Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {content.keywords.map(kw => (
                  <span key={kw} className="px-2 py-1 bg-aviva-gold/10 border border-aviva-gold/20 text-aviva-gold text-xs rounded-lg">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-aviva-gold/50 uppercase tracking-wider mb-2">
                <HashtagIcon className="w-3.5 h-3.5 inline mr-1" />
                Hashtags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {content.hashtags.map(ht => (
                  <span key={ht} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-lg">
                    {ht}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'social' && (
          <div className="space-y-5">
            {[
              { platform: 'Facebook',  key: 'social_copy_facebook',  color: 'text-blue-400',   icon: '📘' },
              { platform: 'Instagram', key: 'social_copy_instagram', color: 'text-pink-400',   icon: '📷' },
              { platform: 'Twitter',   key: 'social_copy_twitter',   color: 'text-sky-400',    icon: '𝕏'  },
            ].map(({ platform, key, icon }) => (
              <div key={platform} className="bg-black/30 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-aviva-bone">{icon} {platform}</span>
                  <CopyButton text={(content as unknown as Record<string, string>)[key]} />
                </div>
                <p className="text-aviva-bone/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {(content as unknown as Record<string, string>)[key]}
                </p>
              </div>
            ))}
          </div>
        )}

        {tab === 'transcript' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-aviva-gold/50 uppercase tracking-wider">Transcripción</p>
              <CopyButton text={content.transcription_text} />
            </div>
            <p className="text-aviva-bone/60 text-sm leading-relaxed whitespace-pre-wrap">
              {content.transcription_text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB 2: Biblioteca de Contenido ──────────────────────────

function LibraryTab() {
  const [contents, setContents]   = useState<AIGeneratedContent[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<AIGeneratedContent | null>(null);
  const [filter, setFilter]       = useState<'all' | 'pending' | 'approved' | 'rejected' | 'published'>('all');
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchAIContents(filter === 'all' ? undefined : filter);
    setContents(data);
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = (id: string, status: 'approved' | 'rejected' | 'published') => {
    startTransition(async () => {
      const res = await updateAIContentStatus(id, status);
      if (res.success) {
        setContents(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
      }
    });
  };

  const filterButtons: { key: typeof filter; label: string }[] = [
    { key: 'all',       label: 'Todos'     },
    { key: 'pending',   label: 'Pendientes'},
    { key: 'approved',  label: 'Aprobados' },
    { key: 'published', label: 'Publicados'},
    { key: 'rejected',  label: 'Rechazados'},
  ];

  return (
    <div className="flex gap-6 h-[70vh]">
      {/* Lista */}
      <div className="w-80 shrink-0 flex flex-col gap-3">
        {/* Filtros */}
        <div className="flex gap-1.5 flex-wrap">
          {filterButtons.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filter === f.key
                  ? 'bg-aviva-gold text-black'
                  : 'text-aviva-bone/50 hover:text-aviva-bone bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loading ? (
            <div className="text-center py-10 text-aviva-bone/30 text-sm animate-pulse">Cargando...</div>
          ) : contents.length === 0 ? (
            <div className="text-center py-10 text-aviva-bone/30 text-sm">
              <SparklesIcon className="w-10 h-10 mx-auto mb-2 text-aviva-gold/20" />
              Sin contenido {filter !== 'all' ? `"${filter}"` : ''}
            </div>
          ) : (
            contents.map(item => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 ${
                  selected?.id === item.id
                    ? 'bg-aviva-gold/10 border-aviva-gold/40'
                    : 'bg-white/[0.02] border-aviva-gold/10 hover:border-aviva-gold/30 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-aviva-bone text-sm font-semibold leading-tight truncate">{item.seo_title}</p>
                    <p className="text-aviva-bone/40 text-xs mt-1">
                      {new Date(item.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold border ${STATUS_CONFIG[item.status].color}`}>
                    {STATUS_CONFIG[item.status].label}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Panel detalle */}
      <div className="flex-1 min-w-0">
        {selected ? (
          <div className="h-full flex flex-col gap-4">
            {/* Acciones */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-aviva-bone/50 text-sm">Acción rápida:</span>
              <button
                onClick={() => handleStatusChange(selected.id, 'approved')}
                disabled={isPending || selected.status === 'approved'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircleIcon className="w-4 h-4" /> Aprobar
              </button>
              <button
                onClick={() => handleStatusChange(selected.id, 'published')}
                disabled={isPending || selected.status === 'published'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <GlobeAltIcon className="w-4 h-4" /> Publicar
              </button>
              <button
                onClick={() => handleStatusChange(selected.id, 'rejected')}
                disabled={isPending || selected.status === 'rejected'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <XCircleIcon className="w-4 h-4" /> Rechazar
              </button>
              <button
                onClick={load}
                className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-aviva-bone/40 hover:text-aviva-bone/70 hover:bg-white/5 transition-colors"
              >
                <ArrowPathIcon className="w-3.5 h-3.5" /> Refrescar
              </button>
            </div>

            {/* Tarjeta resultado */}
            <div className="flex-1 overflow-hidden">
              <AIResultCard content={selected} />
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center bg-white/[0.02] border border-dashed border-aviva-gold/10 rounded-2xl">
            <ChevronRightIcon className="w-10 h-10 text-aviva-gold/20" />
            <p className="text-aviva-bone/30 text-sm">Selecciona un contenido de la lista</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TAB 3: Galería de Reportes (existente) ──────────────────

function GalleryTab() {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportWithPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = useCallback(async () => {
    const { data, error } = await supabase
      .from('celula_reports')
      .select('*')
      .not('fotos_urls', 'is', null)
      .order('created_at', { ascending: false });

    if (!error) {
      const validReports = (data || []).filter(
        (r: ReportWithPhoto) => Array.isArray(r.fotos_urls) && r.fotos_urls.length > 0
      );
      setReports(validReports);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) fetchReports();
  }, [user, fetchReports]);

  const toggleDestacado = async (reportId: string, current: boolean) => {
    const { error } = await supabase
      .from('celula_reports')
      .update({ destacado: !current })
      .eq('id', reportId);

    if (!error) {
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, destacado: !current } : r));
    }
  };

  if (loading) return <div className="py-20 text-center text-aviva-gold animate-pulse">Cargando galería...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {reports.map(report => (
        <div
          key={report.id}
          className={`relative bg-white/[0.02] rounded-2xl border transition-all duration-300 overflow-hidden ${
            report.destacado ? 'border-aviva-gold shadow-lg shadow-aviva-gold/10' : 'border-aviva-gold/10'
          }`}
        >
          {/* Imagen */}
          <div className="h-56 relative overflow-hidden group">
            {report.fotos_urls[0] && (
              <Image src={report.fotos_urls[0]} alt="Evidencia" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            )}
            {report.fotos_urls.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                +{report.fotos_urls.length - 1} fotos
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <span className="text-xs font-bold bg-aviva-gold text-black px-2 py-0.5 rounded uppercase tracking-wider">
                {report.zona || 'Sin Zona'}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5">
            {report.testimonies && (
              <p className="text-aviva-bone/70 text-sm italic line-clamp-3 mb-4">"{report.testimonies}"</p>
            )}
            <div className="flex items-center justify-between">
              <span className={`flex items-center text-xs font-bold px-2.5 py-1 rounded-lg border ${report.destacado ? 'bg-green-400/10 text-green-400 border-green-400/30' : 'bg-white/5 text-aviva-bone/40 border-white/10'}`}>
                {report.destacado ? (
                  <><CheckCircleIcon className="w-3.5 h-3.5 mr-1" />PÚBLICO</>
                ) : (
                  <><ClockIcon className="w-3.5 h-3.5 mr-1" />PENDIENTE</>
                )}
              </span>

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={report.destacado}
                  onChange={() => toggleDestacado(report.id, report.destacado)}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aviva-gold" />
              </label>
            </div>
          </div>
        </div>
      ))}

      {reports.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <PhotoIcon className="w-14 h-14 mx-auto mb-3 text-aviva-gold/20" />
          <p className="text-aviva-bone/30 text-sm">No hay reportes con fotos pendientes.</p>
        </div>
      )}
    </div>
  );
}

// ─── Página Principal ─────────────────────────────────────────

export default function CuraduriaPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('generator');

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-aviva-gold/20 border-t-aviva-gold animate-spin" />
      </div>
    );
  }

  const allowedRoles = ['Pastor de Zona', 'Pastor General', 'admin', 'CMAvivamiento'];
  if (!allowedRoles.includes(user?.rol || '')) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-sm mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
          <XCircleIcon className="w-12 h-12 mx-auto mb-3 text-red-400" />
          <h1 className="text-xl font-bold text-red-400 mb-2">Acceso Restringido</h1>
          <p className="text-aviva-bone/50 text-sm">Esta sección es exclusiva para el equipo pastoral y administrativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-aviva-gold/10 flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-aviva-gold" />
          </div>
          <h1 className="text-3xl font-extrabold text-aviva-bone">
            Centro de Comando <span className="text-aviva-gold">IA</span>
          </h1>
        </div>
        <p className="text-aviva-bone/40 ml-12 text-sm">
          Genera, revisa y publica contenido optimizado por inteligencia artificial — Pasión 2026
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        <TabButton
          active={activeTab === 'generator'}
          onClick={() => setActiveTab('generator')}
          icon={SparklesIcon}
          label="Generador IA"
        />
        <TabButton
          active={activeTab === 'library'}
          onClick={() => setActiveTab('library')}
          icon={ClipboardDocumentIcon}
          label="Biblioteca"
        />
        <TabButton
          active={activeTab === 'gallery'}
          onClick={() => setActiveTab('gallery')}
          icon={PhotoIcon}
          label="Galería Células"
        />
      </div>

      {/* Contenido */}
      {activeTab === 'generator' && <GeneratorTab />}
      {activeTab === 'library'   && <LibraryTab />}
      {activeTab === 'gallery'   && <GalleryTab />}
    </div>
  );
}
