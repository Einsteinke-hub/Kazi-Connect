-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Employers can insert their own jobs" ON public.jobs;

-- Create a new, more explicit policy for inserting jobs
CREATE POLICY "Authenticated users can insert their own jobs" 
ON public.jobs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = employer_id);

-- Also ensure the update policy is correct
DROP POLICY IF EXISTS "Employers can update their own jobs" ON public.jobs;

CREATE POLICY "Authenticated users can update their own jobs"
ON public.jobs
FOR UPDATE
TO authenticated
USING (auth.uid() = employer_id)
WITH CHECK (auth.uid() = employer_id);

-- Ensure the delete policy is also correct
DROP POLICY IF EXISTS "Employers can delete their own jobs" ON public.jobs;

CREATE POLICY "Authenticated users can delete their own jobs"
ON public.jobs
FOR DELETE
TO authenticated
USING (auth.uid() = employer_id);