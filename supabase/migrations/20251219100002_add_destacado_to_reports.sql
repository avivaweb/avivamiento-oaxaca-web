-- Add 'destacado' column to celula_reports table
ALTER TABLE public.celula_reports 
ADD COLUMN IF NOT EXISTS destacado boolean DEFAULT false;

-- Grant access to the new column (implicitly covered by existing grants usually, but good to be safe if specific column grants existed, though usually simple table grants cover it)
-- No extra grants needed as we have GRANT ALL ON TABLE
