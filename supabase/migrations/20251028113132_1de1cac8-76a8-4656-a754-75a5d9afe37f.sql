-- Update existing jobs with sample contact information
UPDATE public.jobs 
SET 
  company_email = CASE company
    WHEN 'Nairobi Tech Labs' THEN 'jobs@nairotechlabs.co.ke'
    WHEN 'Mombasa Logistics Co.' THEN 'careers@mombasalogistics.co.ke'
    WHEN 'Kisumu Cloud Services' THEN 'hr@kisumucloud.co.ke'
    ELSE company_email
  END,
  company_phone = CASE company
    WHEN 'Nairobi Tech Labs' THEN '0712345678'
    WHEN 'Mombasa Logistics Co.' THEN '0723456789'
    WHEN 'Kisumu Cloud Services' THEN '0734567890'
    ELSE company_phone
  END
WHERE company_email IS NULL OR company_phone IS NULL;