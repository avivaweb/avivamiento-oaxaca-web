/**
 * Tipos dedicados para el sistema de Reporte Rápido del Líder de Célula.
 * Alineados a la tabla `celula_reports` en Supabase.
 */

/** Shape del formulario de reporte rápido (client-side) */
export interface ReportFormData {
  adults: number;
  children: number;
  guests: number;
  newDecisions: number;
  testimony: string;
}

/** Resultado del Server Action de envío */
export interface SubmitReportResult {
  success: boolean;
  reportId?: string;
  error?: string;
}

/** Shape para las tarjetas de historial de reportes */
export interface ReportHistoryItem {
  id: string;
  date: string;
  adults_attendance: number;
  children_attendance: number;
  new_decisions: number;
  observations?: string | null;
  created_at: string;
}
