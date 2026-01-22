-- Script to setup QA user smarcky@gmail.com
-- This script assumes the user has already registered via the frontend or auth.
-- It ensures the profile exists and has the correct role 'Pastor General'.

BEGIN;

DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- 1. Get user ID from auth.users
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'smarcky@gmail.com';

  IF target_user_id IS NOT NULL THEN
    -- 2. Upsert into public.profiles
    INSERT INTO public.profiles (id, full_name, role, zone, phone, updated_at)
    VALUES (
      target_user_id,
      'Smarcky QA',
      'Pastor General',
      'Central',
      '5555555555',
      NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
      role = 'Pastor General',
      updated_at = NOW();

    RAISE NOTICE 'Updated public.profiles for smarcky@gmail.com to Pastor General';
    
    -- 3. Also update auth.users metadata just in case RLS/Middleware uses it
    UPDATE auth.users
    SET raw_app_meta_data = 
      COALESCE(raw_app_meta_data, '{}'::jsonb) || 
      jsonb_build_object('role', 'Pastor General')
    WHERE id = target_user_id;
    
  ELSE
    RAISE NOTICE 'User smarcky@gmail.com not found. Please register the user first.';
  END IF;
END $$;

COMMIT;
