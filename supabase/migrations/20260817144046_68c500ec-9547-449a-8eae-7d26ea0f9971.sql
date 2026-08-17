CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'rudranigawande228@gmail.com', false)
$$;