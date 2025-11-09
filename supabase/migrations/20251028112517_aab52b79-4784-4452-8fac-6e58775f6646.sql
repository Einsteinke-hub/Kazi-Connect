-- Add company contact fields to jobs table
ALTER TABLE public.jobs 
ADD COLUMN company_email TEXT,
ADD COLUMN company_phone TEXT;