-- Script para asignar el rol de Pastor General / SuperAdmin (CMAvivamiento)
-- Usuario: smarcky@gmail.com
-- Fecha: 2025-12-19
-- Instrucciones: Ejecutar este script en el Editor SQL de Supabase

BEGIN;

-- 1. Actualizar la metadata del usuario en auth.users (para que el JWT tenga el rol)
UPDATE auth.users
SET raw_app_meta_data = 
  COALESCE(raw_app_meta_data, '{}'::jsonb) || 
  jsonb_build_object(
    'roles', 
    COALESCE(raw_app_meta_data->'roles', '[]'::jsonb) || '["CMAvivamiento"]'::jsonb
  )
WHERE email = 'smarcky@gmail.com';

-- 2. Asegurar que el usuario existe en la tabla pública "User" y asignar el rol
-- Nota: Usamos ON CONFLICT para insertar si no existe (upsert), asumiendo que el email es único.
-- Si el ID no coincide, esto podría fallar, así que mejor buscamos por email primero.

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Obtener el ID del usuario de auth
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'smarcky@gmail.com';

  IF target_user_id IS NOT NULL THEN
    -- Insertar o actualizar en public.User
    INSERT INTO public."User" (id, email, password, roles, "updatedAt")
    VALUES (
      target_user_id::text, 
      'smarcky@gmail.com', 
      'placeholder_hash', -- No se usa si ya existe, solo para nuevos
      ARRAY['CMAvivamiento'],
      NOW()
    )
    ON CONFLICT (email) DO UPDATE
    SET 
      roles = array_append(public."User".roles, 'CMAvivamiento'),
      "updatedAt" = NOW();
      
    RAISE NOTICE 'Rol CMAvivamiento asignado correctamente a smarcky@gmail.com';
  ELSE
    RAISE WARNING 'No se encontró el usuario smarcky@gmail.com en auth.users. Por favor regístrelo primero.';
  END IF;
END $$;

COMMIT;
