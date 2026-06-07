'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Sparkles, TrendingUp, TrendingDown, Minus, FilePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { ReportHistoryItem } from '@/types/report';

interface ReportHistoryProps {
  onNewReport: () => void;
}

export default function ReportHistory({ onNewReport }: ReportHistoryProps) {
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('celula_reports')
        .select('id, date, adults_attendance, children_attendance, new_decisions, observations, created_at')
        .eq('leader_id', user.id)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setReports(data || []);
      }
      setLoading(false);
    };

    fetchReports();
  }, [user?.id]);

  const getTrend = (current: ReportHistoryItem, prev: ReportHistoryItem | undefined) => {
    if (!prev) return 'neutral';
    const currentTotal = current.adults_attendance + current.children_attendance;
    const prevTotal = prev.adults_attendance + prev.children_attendance;
    if (currentTotal > prevTotal) return 'up';
    if (currentTotal < prevTotal) return 'down';
    return 'neutral';
  };

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === 'up') return <TrendingUp size={14} className="text-green-400" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-aviva-red" />;
    return <Minus size={14} className="text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-2 border-aviva-gold/20 border-t-aviva-gold rounded-full animate-spin" />
        <p className="text-gray-500 text-xs uppercase tracking-widest">Cargando historial...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Tu Crecimiento</h3>
          <p className="text-[11px] text-gray-500 italic">Últimos 4 reportes de victoria</p>
        </div>
        <div className="bg-aviva-gold/10 border border-aviva-gold/20 rounded-lg px-3 py-1.5">
          <span className="text-aviva-gold font-black text-sm">{reports.length}</span>
          <span className="text-aviva-gold/50 text-[10px] ml-1">reportes</span>
        </div>
      </motion.div>

      {/* Report Cards */}
      {reports.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#111111] border border-white/5 rounded-2xl p-8 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-aviva-gold/5 flex items-center justify-center mx-auto mb-4">
            <Calendar size={28} className="text-aviva-gold/40" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Aún no tienes reportes</p>
          <p className="text-gray-600 text-xs italic">Envía tu primer reporte de victoria</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {reports.map((report, index) => {
            const total = report.adults_attendance + report.children_attendance;
            const trend = getTrend(report, reports[index + 1]);
            const reportDate = new Date(report.date);

            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`bg-gradient-to-r from-[#111111] to-[#0d0d0d] border rounded-xl p-4 ${
                  index === 0
                    ? 'border-aviva-gold/30 shadow-[0_0_15px_rgba(218,165,32,0.05)]'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Date & Badge */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center text-center ${
                      index === 0 ? 'bg-aviva-gold/10 border border-aviva-gold/20' : 'bg-white/5'
                    }`}>
                      <span className={`text-[10px] uppercase font-bold leading-none ${
                        index === 0 ? 'text-aviva-gold' : 'text-gray-500'
                      }`}>
                        {reportDate.toLocaleDateString('es-MX', { month: 'short' })}
                      </span>
                      <span className={`text-lg font-black leading-none ${
                        index === 0 ? 'text-aviva-gold' : 'text-white'
                      }`}>
                        {reportDate.getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Users size={13} className="text-gray-500" />
                        <span className="text-white font-bold text-sm">{total} asistentes</span>
                        <TrendIcon trend={trend} />
                      </div>
                      {report.new_decisions > 0 && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Sparkles size={11} className="text-aviva-gold" />
                          <span className="text-aviva-gold text-[11px] font-bold">
                            +{report.new_decisions} {report.new_decisions === 1 ? 'decisión' : 'decisiones'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Stats columns */}
                  <div className="flex gap-3 text-center">
                    <div>
                      <p className="text-white font-bold text-sm">{report.adults_attendance}</p>
                      <p className="text-[9px] text-gray-500 uppercase">Adult.</p>
                    </div>
                    <div className="w-px bg-white/5" />
                    <div>
                      <p className="text-white font-bold text-sm">{report.children_attendance}</p>
                      <p className="text-[9px] text-gray-500 uppercase">Niños</p>
                    </div>
                  </div>
                </div>

                {/* Testimony preview for latest */}
                {index === 0 && report.observations && (
                  <p className="mt-3 pt-3 border-t border-white/5 text-gray-500 text-xs italic line-clamp-2">
                    &ldquo;{report.observations}&rdquo;
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* New Report Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onNewReport}
        className="w-full group bg-aviva-gold hover:bg-aviva-gold-dark text-black font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_25px_rgba(218,165,32,0.15)] hover:shadow-[0_0_35px_rgba(218,165,32,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <FilePlus size={18} />
        <span>Nuevo Reporte</span>
      </motion.button>
    </div>
  );
}
