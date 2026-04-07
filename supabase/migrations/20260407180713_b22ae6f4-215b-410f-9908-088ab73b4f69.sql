DROP POLICY IF EXISTS "Admins can insert hymns" ON public.hymns;
DROP POLICY IF EXISTS "Admins can update hymns" ON public.hymns;
DROP POLICY IF EXISTS "Admins can delete hymns" ON public.hymns;

CREATE POLICY "Authenticated users can insert hymns"
ON public.hymns
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update hymns"
ON public.hymns
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hymns"
ON public.hymns
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admins can insert daily bible" ON public.daily_bible;
DROP POLICY IF EXISTS "Admins can update daily bible" ON public.daily_bible;
DROP POLICY IF EXISTS "Admins can delete daily bible" ON public.daily_bible;

CREATE POLICY "Authenticated users can insert daily bible"
ON public.daily_bible
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update daily bible"
ON public.daily_bible
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete daily bible"
ON public.daily_bible
FOR DELETE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admins can insert livestreams" ON public.livestreams;
DROP POLICY IF EXISTS "Admins can update livestreams" ON public.livestreams;
DROP POLICY IF EXISTS "Admins can delete livestreams" ON public.livestreams;

CREATE POLICY "Authenticated users can insert livestreams"
ON public.livestreams
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update livestreams"
ON public.livestreams
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete livestreams"
ON public.livestreams
FOR DELETE
TO authenticated
USING (true);