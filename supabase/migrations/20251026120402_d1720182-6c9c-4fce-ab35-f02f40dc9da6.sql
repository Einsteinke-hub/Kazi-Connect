-- Create storage bucket for job images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'job-images',
  'job-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- RLS policies for job-images bucket
CREATE POLICY "Anyone can view job images"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-images');

CREATE POLICY "Authenticated users can upload job images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'job-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own job images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'job-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own job images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'job-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add image_url column to jobs table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS image_url TEXT;