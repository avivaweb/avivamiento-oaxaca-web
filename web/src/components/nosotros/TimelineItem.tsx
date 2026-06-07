'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export interface TimelineMilestone {
  year: string;
  title: string;
  pastoral: string;
  prophetic: string;
  accent?: string; // override accent color per node
}

/** Cinematic Image with golden border and Onyx Blur load */
function ImagePlaceholder({ item }: { item: TimelineMilestone }) {
  return (
    <div className="w-full aspect-[16/10] rounded-2xl bg-[#333333] border-2 border-aviva-gold/40 flex items-center justify-center group-hover:border-aviva-gold transition-colors duration-500 relative overflow-hidden">
      <Image 
        src={`/images/timeline/${item.year}.jpg`}
        alt={`Hito Histórico: ${item.title}`}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOM81z5HwAGaQK0ZrcAagAAAABJRU5ErkJggg=="
      />
    </div>
  );
}

interface TimelineItemProps {
  item: TimelineMilestone;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 group">

      {/* ────── LEFT COLUMN (content on even rows, empty on odd — desktop only) ────── */}
      <div className={`hidden md:flex ${isEven ? 'justify-end' : ''}`}>
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full"
          >
            <CardContent item={item} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full flex items-center"
          >
            <ImagePlaceholder item={item} />
          </motion.div>
        )}
      </div>

      {/* ────── CENTER SPINE ────── */}
      <div className="flex flex-col items-center relative">
        {/* Connector line top */}
        {index > 0 && (
          <div className="w-px flex-1 bg-gradient-to-b from-aviva-gold/20 to-aviva-gold/60" />
        )}

        {/* Year node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          className="relative z-10 flex-shrink-0"
        >
          <div className="w-20 h-20 rounded-full bg-black border-[3px] border-aviva-gold flex items-center justify-center shadow-[0_0_30px_rgba(218,165,32,0.3)] group-hover:shadow-[0_0_50px_rgba(218,165,32,0.5)] transition-shadow duration-500">
            <span className="text-aviva-gold font-black text-lg tracking-tighter">{item.year}</span>
          </div>
        </motion.div>

        {/* Connector line bottom */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-aviva-gold/60 to-aviva-gold/20" />
        )}
      </div>

      {/* ────── RIGHT COLUMN ────── */}
      <div className={`${isEven ? '' : 'md:flex md:items-start'}`}>
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full hidden md:flex items-center"
          >
            <ImagePlaceholder item={item} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md w-full"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* ────── MOBILE CARD (shown below the node on small screens) ────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:hidden col-span-1 mt-4 mb-12 ml-12"
      >
        <CardContent item={item} />
        <div className="mt-4">
          <ImagePlaceholder item={item} />
        </div>
      </motion.div>
    </div>
  );
}

/** Shared card layout for the milestone content */
function CardContent({ item }: { item: TimelineMilestone }) {
  return (
    <div className="bg-aviva-onyx/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-aviva-gold/30 transition-all duration-500 group/card">
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic mb-6 leading-tight">
        {item.title}
      </h3>

      {/* Dual Tone Copy */}
      <div className="space-y-4">
        {/* Pastoral */}
        <div className="border-l-2 border-aviva-gold/40 pl-4">
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-aviva-gold block mb-1">
            Pastoral
          </span>
          <p className="text-aviva-bone/80 text-sm leading-relaxed font-light">
            {item.pastoral}
          </p>
        </div>

        {/* Profético */}
        <div className="border-l-2 border-aviva-red/60 pl-4">
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-aviva-red block mb-1">
            Profético
          </span>
          <p className="text-aviva-bone/60 text-sm leading-relaxed font-light italic">
            {item.prophetic}
          </p>
        </div>
      </div>
    </div>
  );
}
