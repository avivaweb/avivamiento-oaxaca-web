-- 1. Add fotos_urls column to celula_reports
ALTER TABLE public.celula_reports 
ADD COLUMN IF NOT EXISTS fotos_urls text[] DEFAULT ARRAY[]::text[];

-- 2. Create Storage Bucket 'fotos-celulas' if it doesn't exist
-- Note: Creating buckets via SQL in Supabase is done via inserting into storage.buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos-celulas', 'fotos-celulas', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies

-- Policy: Authenticated users can upload to 'fotos-celulas'
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'fotos-celulas' AND
  auth.role() = 'authenticated'
);

-- Policy: Everyone (or just authenticated) can view photos
CREATE POLICY "Anyone can view photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'fotos-celulas');

-- Optional: Allow users to delete their own photos if needed (for cleanup)
CREATE POLICY "Users can delete their own photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'fotos-celulas' AND
  auth.uid() = owner
);
