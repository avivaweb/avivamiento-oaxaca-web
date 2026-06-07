-- ============================================================================
-- RPC: get_supervisor_stats
-- Propósito: Retorna métricas agregadas para el dashboard de SupervisorView
-- Requiere: Tabla celula_reports con campos (supervisor_id, attendance, created_at, status)
--           Tabla profiles con campos (id, full_name, rol)
-- ============================================================================
-- NOTA: Verificar el esquema exacto de celula_reports antes de ejecutar.
--       Los nombres de columnas son inferidos del código frontend existente.
-- ============================================================================

CREATE OR REPLACE FUNCTION get_supervisor_stats(input_supervisor_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
    v_total_cells INT;
    v_reports_received INT;
    v_total_attendance INT;
    v_prev_attendance INT;
    v_growth_rate NUMERIC;
BEGIN
    -- 1. Total de células asignadas a este supervisor
    SELECT COUNT(DISTINCT cell_id)
    INTO v_total_cells
    FROM celula_reports
    WHERE supervisor_id = input_supervisor_id;

    -- 2. Reportes recibidos esta semana
    SELECT COUNT(*)
    INTO v_reports_received
    FROM celula_reports
    WHERE supervisor_id = input_supervisor_id
      AND created_at >= date_trunc('week', NOW());

    -- 3. Asistencia total esta semana
    SELECT COALESCE(SUM(attendance), 0)
    INTO v_total_attendance
    FROM celula_reports
    WHERE supervisor_id = input_supervisor_id
      AND created_at >= date_trunc('week', NOW());

    -- 4. Asistencia semana anterior (para calcular crecimiento)
    SELECT COALESCE(SUM(attendance), 0)
    INTO v_prev_attendance
    FROM celula_reports
    WHERE supervisor_id = input_supervisor_id
      AND created_at >= date_trunc('week', NOW()) - INTERVAL '7 days'
      AND created_at < date_trunc('week', NOW());

    -- 5. Calcular tasa de crecimiento
    IF v_prev_attendance > 0 THEN
        v_growth_rate := ROUND(((v_total_attendance::NUMERIC - v_prev_attendance) / v_prev_attendance) * 100, 1);
    ELSE
        v_growth_rate := 0;
    END IF;

    -- 6. Construir JSON de respuesta
    SELECT json_build_object(
        'total_cells', v_total_cells,
        'reports_received', v_reports_received,
        'total_attendance', v_total_attendance,
        'growth_rate', v_growth_rate,
        'attention_needed', COALESCE((
            SELECT json_agg(json_build_object('id', cr.cell_id, 'nombre', cr.cell_name))
            FROM (
                SELECT DISTINCT cell_id, cell_name
                FROM celula_reports
                WHERE supervisor_id = input_supervisor_id
                  AND cell_id NOT IN (
                      SELECT DISTINCT cell_id
                      FROM celula_reports
                      WHERE supervisor_id = input_supervisor_id
                        AND created_at >= date_trunc('week', NOW()) - INTERVAL '14 days'
                        AND guests > 0
                  )
            ) cr
        ), '[]'::json),
        'recent_reports', COALESCE((
            SELECT json_agg(json_build_object(
                'id', cr.id,
                'leader_name', p.full_name,
                'cell_name', cr.cell_name,
                'status', cr.status,
                'date', cr.created_at
            ) ORDER BY cr.created_at DESC)
            FROM celula_reports cr
            LEFT JOIN profiles p ON p.id = cr.user_id
            WHERE cr.supervisor_id = input_supervisor_id
              AND cr.created_at >= date_trunc('week', NOW()) - INTERVAL '7 days'
            LIMIT 20
        ), '[]'::json)
    ) INTO result;

    RETURN result;
END;
$$;

-- Permisos: solo usuarios autenticados pueden ejecutar esta función
GRANT EXECUTE ON FUNCTION get_supervisor_stats(UUID) TO authenticated;
