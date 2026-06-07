'use client';

import TimelineItem, { type TimelineMilestone } from '@/components/nosotros/TimelineItem';

/* ═══════════════════════════════════════════════════════════
   TIMELINE DATA — Dual-Tone Copy: Pastoral + Profético
   ═══════════════════════════════════════════════════════════ */
const MILESTONES: TimelineMilestone[] = [
  {
    year: '2015',
    title: 'El Diseño Original',
    pastoral:
      'El nacimiento de una familia. Un grupo de personas hambientas de propósito se reunieron para descubrir el diseño eterno de sus vidas.',
    prophetic:
      'El establecimiento del altar legal en Oaxaca. Un pacto generacional fue sellado: la restauración de la identidad original comenzó.',
  },
  {
    year: '2018',
    title: 'San Raymundo Jalpan',
    pastoral:
      'Un hogar para los hijos. La familia creció y encontró un lugar físico que representara la grandeza del propósito.',
    prophetic:
      'Territorio conquistado. El establecimiento del auditorio marcó la transición de un grupo a un centro de influencia territorial.',
  },
  {
    year: '2023',
    title: 'Ejército Celular',
    pastoral:
      'La iglesia en cada mesa. Grupos Familiares se multiplicaron llevando la Vida Zoé a cada hogar, cada colonia, cada historia.',
    prophetic:
      'Expansión explosiva en las 7 zonas. Lo que era uno se convirtió en un ejército desplegado estratégicamente para reformar la ciudad.',
  },
  {
    year: '2026',
    title: 'Pasión',
    pastoral:
      'La cosecha de la Vida Zoé. El fruto de años de siembra se manifiesta: familias restauradas, identidades reactivadas, legados establecidos.',
    prophetic:
      'Manifestación de la Gloria Postrera. El tiempo de la canción ha llegado. Lo mayor está por delante — 1,000 Altares encendidos.',
  },
];

export default function TimelineWrapper() {
  return (
    <div className="relative">
      {MILESTONES.map((item, index) => (
        <TimelineItem
          key={item.year}
          item={item}
          index={index}
          isLast={index === MILESTONES.length - 1}
        />
      ))}
    </div>
  );
}
