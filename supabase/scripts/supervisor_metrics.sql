-- Script para crear la función de estadísticas del Supervisor
-- Ejecutar en Supabase SQL Editor

-- 1. Aseguramos que existe la relación entre grupos_familiares y usuarios (supervisor)
-- Asumimos que 'grupos_familiares' es la tabla de células/grupos.
-- Si no existe la columna supervisor_id, habría que agregarla:
-- ALTER TABLE public.grupos_familiares ADD COLUMN IF NOT EXISTS supervisor_id uuid REFERENCES auth.users(id);

-- 2. Función RPC para obtener estadísticas
CREATE OR REPLACE FUNCTION public.get_supervisor_stats(input_supervisor_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_attendance_val integer;
  reports_received_val integer;
  total_cells_val integer;
  growth_rate_val integer; -- Porcentaje simulado o calculado
  attention_needed_val json;
  week_start date;
BEGIN
  -- Definir el inicio de la semana (ej. Lunes pasado)
  week_start := date_trunc('week', current_date);

  -- 1. Total Células del Supervisor
  SELECT COUNT(*) INTO total_cells_val
  FROM public.grupos_familiares
  WHERE supervisor_id = input_supervisor_id;

  -- 2. Reportes recibidos esta semana (asumiendo que celula_reports tiene cell_id y date)
  -- Nota: Necesitamos unir con grupos_familiares para filtrar por supervisor
  SELECT COUNT(DISTINCT cr.cell_id) INTO reports_received_val
  FROM public.celula_reports cr
  JOIN public.grupos_familiares gf ON cr.cell_id = gf.id
  WHERE gf.supervisor_id = input_supervisor_id
  AND cr.date >= week_start;

  -- 3. Asistencia Total de la semana
  SELECT COALESCE(SUM(cr.adults_attendance + cr.children_attendance), 0) INTO total_attendance_val
  FROM public.celula_reports cr
  JOIN public.grupos_familiares gf ON cr.cell_id = gf.id
  WHERE gf.supervisor_id = input_supervisor_id
  AND cr.date >= week_start;

  -- 4. Crecimiento (Simulado por ahora para demo, o comparar con semana anterior)
  -- Lógica real requeriría comparar con SUM de week_start - 7 days
  growth_rate_val := 5; -- Placeholder

  -- 5. Zona de Atención (Células con invitados=0 por 3 semanas)
  -- Esta query es compleja, simplificaremos buscando células con 0 invitados en SU ÚLTIMO reporte
  SELECT json_agg(t) INTO attention_needed_val
  FROM (
      SELECT gf.nombre, gf.id
      FROM public.grupos_familiares gf
      JOIN public.celula_reports cr ON gf.id = cr.cell_id
      WHERE gf.supervisor_id = input_supervisor_id
      AND cr.date >= week_start
      AND cr.new_decisions = 0 -- Usamos nuevas decisiones/invitados como métrica
      -- En un caso real, verificaríamos las últimas 3 semanas
  ) t;

  -- Retornar objeto JSON
  RETURN json_build_object(
    'total_cells', COALESCE(total_cells_val, 0),
    'reports_received', COALESCE(reports_received_val, 0),
    'total_attendance', COALESCE(total_attendance_val, 0),
    'growth_rate', growth_rate_val,
    'attention_needed', COALESCE(attention_needed_val, '[]'::json)
  );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.get_supervisor_stats(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_supervisor_stats(uuid) TO service_role;
