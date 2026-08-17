REVOKE EXECUTE ON FUNCTION public.is_portfolio_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_portfolio_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_portfolio_admin() TO service_role;