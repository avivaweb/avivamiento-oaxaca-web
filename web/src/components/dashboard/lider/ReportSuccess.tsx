'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight } from 'lucide-react';

interface ReportSuccessProps {
  onContinue: () => void;
}

export default function ReportSuccess({ onContinue }: ReportSuccessProps) {
  // ── Golden Confetti Burst ──
  const fireConfetti = useCallback(() => {
    const gold = '#DAA520';
    const darkGold = '#B8860B';
    const white = '#ECE7DE';

    // Left burst
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: [gold, darkGold, white],
      shapes: ['circle', 'square'],
      gravity: 0.8,
      scalar: 1.2,
      drift: 0.1,
    });

    // Right burst
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: [gold, darkGold, white],
      shapes: ['circle', 'square'],
      gravity: 0.8,
      scalar: 1.2,
      drift: -0.1,
    });

    // Center shower (delayed)
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.3 },
        colors: [gold, darkGold],
        shapes: ['circle'],
        gravity: 0.6,
        scalar: 0.9,
        ticks: 200,
      });
    }, 300);
  }, []);

  useEffect(() => {
    fireConfetti();

    // Auto-navigate to history after 4 seconds
    const timer = setTimeout(() => {
      onContinue();
    }, 4000);

    return () => clearTimeout(timer);
  }, [fireConfetti, onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md px-6"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
        className="text-center max-w-sm"
      >
        {/* Trophy Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.3 }}
          className="mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-aviva-gold/20 to-aviva-gold/5 border-2 border-aviva-gold/40 flex items-center justify-center shadow-[0_0_50px_rgba(218,165,32,0.2)]"
        >
          <Trophy size={40} className="text-aviva-gold" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-black text-white uppercase tracking-tight mb-3"
        >
          ¡Reporte de <span className="text-aviva-gold">Victoria</span> Enviado!
        </motion.h2>

        {/* Verse / Message */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-sm italic leading-relaxed mb-8 px-4"
        >
          &ldquo;Tu labor está escrita en el libro de las memorias. Cada alma cuenta, cada reporte construye el legado.&rdquo;
        </motion.p>

        {/* Subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-aviva-gold/30 to-transparent mb-8"
        />

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={onContinue}
          className="group inline-flex items-center gap-2 text-aviva-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          <span>Ver mi crecimiento</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Progress hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-gray-600 text-[10px] mt-6 uppercase tracking-widest"
        >
          Redirigiendo automáticamente...
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
