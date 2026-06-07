'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string; // ISO date string
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/60 backdrop-blur-md border border-aviva-red/30 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(165,0,47,0.15)]">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl font-black text-white tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
        {/* Subtle red glow under */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-aviva-red/40 rounded-full blur-sm" />
      </div>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-aviva-bone/50 font-bold mt-2">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {['Días', 'Hrs', 'Min', 'Seg'].map((l) => (
          <div key={l} className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/60 border border-aviva-red/30 rounded-xl flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-black text-white/20">--</span>
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-aviva-bone/50 font-bold mt-2">{l}</span>
          </div>
        ))}
      </div>
    );
  }

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <p className="text-aviva-red font-black text-2xl uppercase tracking-tight animate-pulse">
          ¡El momento ha llegado!
        </p>
        {label && <p className="text-aviva-bone/60 text-sm mt-2 italic">{label}</p>}
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {label && (
        <p className="text-aviva-bone/40 text-[10px] uppercase tracking-[0.3em] font-bold">{label}</p>
      )}
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Días" />
        <span className="text-aviva-red/60 text-xl font-bold mt-[-20px]">:</span>
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <span className="text-aviva-red/60 text-xl font-bold mt-[-20px]">:</span>
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <span className="text-aviva-red/60 text-xl font-bold mt-[-20px]">:</span>
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
}
