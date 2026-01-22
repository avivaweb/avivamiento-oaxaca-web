-- Add 'comentario_pastoral' column to celula_reports table
ALTER TABLE public.celula_reports 
ADD COLUMN IF NOT EXISTS comentario_pastoral text;
