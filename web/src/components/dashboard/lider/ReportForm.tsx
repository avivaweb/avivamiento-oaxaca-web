'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Baby, UserPlus, Sparkles, Heart, Send, Loader2, Minus, Plus } from 'lucide-react';
import { submitCelulaReport } from '@/lib/actions/submitCelulaReport';
import type { ReportFormData, SubmitReportResult } from '@/types/report';

// ── Zod Schema (client-side mirror) ──
const reportSchema = z.object({
  adults: z.number().min(0),
  children: z.number().min(0),
  guests: z.number().min(0),
  newDecisions: z.number().min(0),
  testimony: z.string().max(500),
});

type FormValues = z.infer<typeof reportSchema>;

interface ReportFormProps {
  onSuccess: (result: SubmitReportResult) => void;
}

// ── Counter Component ──
function NumericCounter({
  value,
  onChange,
  label,
  icon: Icon,
  variant = 'default',
}: {
  value: number;
  onChange: (val: number) => void;
  label: string;
  icon: React.ElementType;
  variant?: 'default' | 'gold';
}) {
  const isGold = variant === 'gold';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`flex items-center gap-1 text-xs uppercase tracking-widest font-bold ${isGold ? 'text-aviva-gold' : 'text-gray-400'}`}>
        <Icon size={14} />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isGold
              ? 'bg-aviva-gold/10 border border-aviva-gold/30 text-aviva-gold hover:bg-aviva-gold/20'
              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
            }`}
        >
          <Minus size={18} />
        </button>
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className={`w-16 h-14 text-center text-2xl font-black rounded-xl border outline-none transition-all ${isGold
              ? 'bg-aviva-gold/5 border-aviva-gold/40 text-aviva-gold focus:border-aviva-gold focus:shadow-[0_0_20px_rgba(218,165,32,0.15)]'
              : 'bg-aviva-onyx border-white/10 text-white focus:border-aviva-gold'
            }`}
        />
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isGold
              ? 'bg-aviva-gold/10 border border-aviva-gold/30 text-aviva-gold hover:bg-aviva-gold/20'
              : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
            }`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}

// ── Card Wrapper ──
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ReportForm({ onSuccess }: ReportFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      adults: 0,
      children: 0,
      guests: 0,
      newDecisions: 0,
      testimony: '',
    },
  });

  const values = watch();

  const onSubmit = async (data: FormValues) => {
    // Client-side validation: at least 1 attendee
    if (data.adults + data.children + data.guests === 0) {
      setServerError('Registra al menos 1 persona en El Altar.');
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await submitCelulaReport({
        adults: data.adults,
        children: data.children,
        guests: data.guests,
        newDecisions: data.newDecisions,
        testimony: data.testimony || '',
      });

      if (result.success) {
        onSuccess(result);
      } else {
        setServerError(result.error || 'Error desconocido.');
      }
    } catch {
      setServerError('Error de conexión. Verifica tu internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAttendance = values.adults + values.children + values.guests;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pb-28">
      {/* ═══════════════════════════════════════════════════════════
          CARD 1 — EL ALTAR (Asistencia)
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-aviva-red/10 flex items-center justify-center">
            <Heart size={20} className="text-aviva-red" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-tight">El Altar</h3>
            <p className="text-[11px] text-gray-500 italic">Asistencia de esta semana</p>
          </div>
          {totalAttendance > 0 && (
            <div className="ml-auto bg-aviva-gold/10 border border-aviva-gold/30 rounded-lg px-3 py-1">
              <span className="text-aviva-gold font-black text-lg">{totalAttendance}</span>
              <span className="text-aviva-gold/60 text-[10px] ml-1 uppercase">total</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <NumericCounter
            value={values.adults}
            onChange={(v) => setValue('adults', v, { shouldValidate: true })}
            label="Adultos"
            icon={Users}
          />
          <NumericCounter
            value={values.children}
            onChange={(v) => setValue('children', v, { shouldValidate: true })}
            label="Niños"
            icon={Baby}
          />
          <NumericCounter
            value={values.guests}
            onChange={(v) => setValue('guests', v, { shouldValidate: true })}
            label="Invitados"
            icon={UserPlus}
          />
        </div>

        {errors.adults && (
          <p className="text-aviva-red text-xs mt-3 text-center font-medium">{errors.adults.message}</p>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          CARD 2 — LA COSECHA (Nuevas Decisiones)
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-aviva-gold/20 rounded-2xl p-5 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-aviva-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-aviva-gold/10 border border-aviva-gold/20 flex items-center justify-center">
            <Sparkles size={20} className="text-aviva-gold" />
          </div>
          <div>
            <h3 className="text-base font-black text-aviva-gold uppercase tracking-tight">La Cosecha</h3>
            <p className="text-[11px] text-gray-500 italic">Vidas entregadas a Cristo</p>
          </div>
        </div>

        <div className="flex justify-center relative z-10">
          <NumericCounter
            value={values.newDecisions}
            onChange={(v) => setValue('newDecisions', v)}
            label="Nuevas decisiones"
            icon={Heart}
            variant="gold"
          />
        </div>

        {values.newDecisions > 0 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-aviva-gold/70 text-[11px] mt-4 italic font-medium"
          >
            🕊️ ¡Gloria a Dios! {values.newDecisions} {values.newDecisions === 1 ? 'vida nueva' : 'vidas nuevas'} para el Reino.
          </motion.p>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          CARD 3 — TESTIMONIO DE GLORIA
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        custom={2}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-white/10 rounded-2xl p-5 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-aviva-wine/20 flex items-center justify-center">
            <Sparkles size={20} className="text-aviva-bone/80" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-tight">Testimonio de Gloria</h3>
            <p className="text-[11px] text-gray-500 italic">Milagros y avances de la semana</p>
          </div>
        </div>

        <textarea
          value={values.testimony}
          onChange={(e) => setValue('testimony', e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="¿Qué hizo Dios esta semana en tu Altar? Sanidades, restauraciones, provisiones..."
          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white text-sm placeholder:text-gray-600 focus:border-aviva-gold focus:shadow-[0_0_15px_rgba(218,165,32,0.08)] outline-none transition-all resize-none italic"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-[10px] ${(values.testimony?.length || 0) > 450 ? 'text-aviva-red' : 'text-gray-600'}`}>
            {values.testimony?.length || 0}/500
          </span>
        </div>
      </motion.div>

      {/* ═══════ Error Display ═══════ */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-aviva-red/10 border border-aviva-red/30 rounded-xl p-4 text-center"
        >
          <p className="text-aviva-red text-sm font-medium">{serverError}</p>
        </motion.div>
      )}

      {/* ═══════ Submit Button ═══════ */}
      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full group relative overflow-hidden bg-aviva-gold hover:bg-aviva-gold-dark text-black font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(218,165,32,0.2)] hover:shadow-[0_0_40px_rgba(218,165,32,0.35)] active:scale-[0.98]"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <span className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Enviar Reporte de Victoria</span>
              </>
            )}
          </span>
        </button>
      </motion.div>
    </form>
  );
}
