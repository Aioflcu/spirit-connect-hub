
-- Drop existing restrictive policies for site-assets uploads
DROP POLICY IF EXISTS "Authenticated users can upload site assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update site assets" ON storage.objects;

-- Allow public uploads to site-assets bucket
CREATE POLICY "Anyone can upload site assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Anyone can update site assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'site-assets');
