-- Add payment_reference column to jobs table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS payment_reference TEXT;