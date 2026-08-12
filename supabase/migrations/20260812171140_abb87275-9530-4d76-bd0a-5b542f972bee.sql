CREATE TABLE public.contact_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','replied')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX contact_messages_created_at_idx ON public.contact_messages (created_at DESC);

GRANT INSERT ON public.contact_messages TO anon;
GRANT INSERT, SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce((auth.jwt() ->> 'email') = 'rudranigawande228@gmail.com', false)
$$;

CREATE POLICY "Anyone can send a contact message"
  ON public.contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 100
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 1 AND 2000
    AND status = 'new'
  );

CREATE POLICY "Only the owner can read messages"
  ON public.contact_messages FOR SELECT TO authenticated
  USING (public.is_portfolio_admin());

CREATE POLICY "Only the owner can update messages"
  ON public.contact_messages FOR UPDATE TO authenticated
  USING (public.is_portfolio_admin())
  WITH CHECK (public.is_portfolio_admin());

CREATE POLICY "Only the owner can delete messages"
  ON public.contact_messages FOR DELETE TO authenticated
  USING (public.is_portfolio_admin());