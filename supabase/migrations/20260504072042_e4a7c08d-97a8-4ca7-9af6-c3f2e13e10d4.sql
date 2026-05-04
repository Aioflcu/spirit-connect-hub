
-- Create galleries table
CREATE TABLE public.galleries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caption TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Galleries viewable by everyone" ON public.galleries FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert galleries" ON public.galleries FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update galleries" ON public.galleries FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete galleries" ON public.galleries FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-bucket', 'gallery-bucket', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('messages-bucket', 'messages-bucket', true);

-- Storage policies for gallery-bucket
CREATE POLICY "Gallery images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-bucket');
CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery-bucket');
CREATE POLICY "Authenticated users can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery-bucket');
CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery-bucket');

-- Storage policies for messages-bucket
CREATE POLICY "Messages files are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'messages-bucket');
CREATE POLICY "Authenticated users can upload messages files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'messages-bucket');
CREATE POLICY "Authenticated users can update messages files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'messages-bucket');
CREATE POLICY "Authenticated users can delete messages files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'messages-bucket');
