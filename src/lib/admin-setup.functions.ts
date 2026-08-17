import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DEFAULT_OWNER_EMAIL = "rudranigawande228@gmail.com";

/**
 * One-time bootstrap so the portfolio owner can create her own admin account
 * without a public registration page. It only ever accepts the owner email and
 * refuses once that account exists. Passwords are handled by Cloud Auth.
 */
export const bootstrapAdminAccount = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        email: z.string().trim().email().max(255),
        password: z.string().min(10, "Use at least 10 characters").max(72),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const ownerEmail = process.env["ADMIN_EMAIL"] ?? DEFAULT_OWNER_EMAIL;
    if (data.email.toLowerCase() !== ownerEmail) {
      return { ok: false as const, error: "This email is not allowed to be an admin." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listError) return { ok: false as const, error: "Setup unavailable right now." };

    const already = existing.users.some((u) => u.email?.toLowerCase() === ownerEmail);
    if (already) {
      return {
        ok: false as const,
        error: "Admin account already exists. Use login or Forgot Password.",
      };
    }

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error) return { ok: false as const, error: error.message };

    return { ok: true as const };
  });

export const adminAccountExists = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (error) return { exists: true };
  return { exists: data.users.some((u) => u.email?.toLowerCase() === OWNER_EMAIL) };
});
