-- Ensure a policy exists to allow employers to view their own (including inactive) jobs
DROP POLICY IF EXISTS "Authenticated users can view their own jobs" ON public.jobs;

CREATE POLICY "Authenticated users can view their own jobs"
ON public.jobs
FOR SELECT
TO authenticated
USING (auth.uid() = employer_id);