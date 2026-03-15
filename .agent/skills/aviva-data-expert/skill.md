# Skill: Aviva Data Expert

Define rules and best practices for managing and validating ministerial data for the Avivamiento Oaxaca CRM.

## Cell Report Validation Rules

### 1. No Negative Numbers
- All attendance fields (`asistencia_adultos`, `asistencia_ninos`, `nuevos_invitados`) must be greater than or equal to zero.
- Any attempt to report a negative number should be blocked at the business logic level.

### 2. Report Date Alignment
- Reports are generally associated with a specific week.
- The `fecha` (date) of the report must always be the **Sunday** of the week being reported (the nearest Sunday to the report creation if not specified, or the Sunday of that specific ministerial week).

### 3. Ministerial Integrity
- Ensure that the `celula_id` exists and is active before allowing a report submission.
- Validate that the user submitting the report is the authorized Leader or a Supervisor of that cell.

## Data Consistency
- Use the term `rol` for the hierarchy field in the `profiles` table.
- Maintain the 'Aviva Design System' aesthetics even in data-driven components (e.g., Skeleton loaders with pulse effect from `aviva-wine` to `black`).
