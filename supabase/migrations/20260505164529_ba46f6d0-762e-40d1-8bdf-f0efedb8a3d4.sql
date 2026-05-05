
-- Create site_settings table for storing config like logo URL
CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings viewable by everyone"
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert site settings"
ON public.site_settings FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update site settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Create storage bucket for site assets (logo etc)
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);

CREATE POLICY "Site assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can upload site assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can update site assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets');
