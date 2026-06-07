'use server';

import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import type { SubmitReportResult } from '@/types/report';

// ── Validación Server-Side (duplicada del cliente para seguridad) ──
const reportSchema = z.object({
  adults: z.number().min(0, 'Valor inválido'),
  children: z.number().min(0, 'Valor inválido'),
  guests: z.number().min(0, 'Valor inválido'),
  newDecisions: z.number().min(0, 'Valor inválido'),
  testimony: z.string().max(500, 'Máximo 500 caracteres').optional().default(''),
}).refine(
  (data) => data.adults + data.children + data.guests > 0,
  { message: 'Debe haber al menos 1 asistente registrado.' }
);

export async function submitCelulaReport(formData: {
  adults: number;
  children: number;
  guests: number;
  newDecisions: number;
  testimony: string;
}): Promise<SubmitReportResult> {
  try {
    // 1. Validación Zod server-side
    const parsed = reportSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Datos inválidos.',
      };
    }

    // 2. Autenticación
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { success: false, error: 'Sesión expirada. Inicia sesión nuevamente.' };
    }

    const userId = session.user.id;

    // 3. Intentar resolver cell_id desde profiles (opcional)
    let cellId: string | null = null;
    const { data: profile } = await supabase
      .from('profiles')
      .select('cell_id')
      .eq('id', userId)
      .single();

    if (profile?.cell_id) {
      cellId = profile.cell_id;
    }

    // 4. Calcular la semana del año
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
    );

    // 5. Insertar en celula_reports
    const { data: report, error: insertError } = await supabase
      .from('celula_reports')
      .insert({
        leader_id: userId,
        cell_id: cellId,
        date: now.toISOString().split('T')[0],
        adults_attendance: parsed.data.adults + parsed.data.guests,
        children_attendance: parsed.data.children,
        new_decisions: parsed.data.newDecisions,
        observations: parsed.data.testimony || null,
        week_number: weekNumber,
        year: now.getFullYear(),
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Error insertando reporte:', insertError);
      return {
        success: false,
        error: 'Error al guardar el reporte. Intenta de nuevo.',
      };
    }

    return { success: true, reportId: report.id };
  } catch (err) {
    console.error('❌ Error inesperado en submitCelulaReport:', err);
    return {
      success: false,
      error: 'Error inesperado. Verifica tu conexión.',
    };
  }
}
