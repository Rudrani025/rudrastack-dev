import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const OWNER_EMAIL = "rudranigawande228@gmail.com";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(5, "Message is too short").max(2000),
});

export type ContactResult = { ok: true } | { ok: false; error: string };

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const sinceHour = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    // Spam protection: max 3 messages per email per hour, and no exact duplicates.
    const { count: recentCount } = await supabaseAdmin
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("email", data.email)
      .gte("created_at", sinceHour);

    if ((recentCount ?? 0) >= 3) {
      return { ok: false, error: "Too many messages sent recently. Please try again later." };
    }

    const { data: duplicate } = await supabaseAdmin
      .from("contact_messages")
      .select("id")
      .eq("email", data.email)
      .eq("message", data.message)
      .gte("created_at", sinceHour)
      .limit(1);

    if (duplicate && duplicate.length > 0) {
      return { ok: false, error: "This message was already sent. Thank you!" };
    }

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      status: "new",
    });

    if (error) {
      console.error("contact insert failed", { ip, error: error.message });
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    await notifyOwner(data);
    return { ok: true };
  });

async function notifyOwner(data: { name: string; email: string; message: string }) {
  try {
    const { sendOwnerNotification } = await import("./contact-notify.server");
    await sendOwnerNotification({ ...data, to: OWNER_EMAIL });
  } catch (error) {
    // Notification is best-effort: the message is already stored safely.
    console.error("owner notification skipped", error);
  }
}
