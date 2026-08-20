CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'rudra.hobique@gmail.com', false)
$$;

REVOKE EXECUTE ON FUNCTION public.is_portfolio_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_portfolio_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_portfolio_admin() TO service_role;