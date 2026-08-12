/**
 * Owner email notification for new contact messages.
 *
 * Sending requires a verified sender domain to be configured for the project.
 * Until then this logs and no-ops, so contact submissions never fail because
 * of email configuration. Once a sender domain and template registry exist,
 * this is the single place that needs to change.
 */
export async function sendOwnerNotification(payload: {
  name: string;
  email: string;
  message: string;
  to: string;
}) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  const senderDomain = process.env["EMAIL_SENDER_DOMAIN"];

  if (!apiKey || !senderDomain) {
    console.log("[contact] owner notification pending email domain setup", {
      to: payload.to,
      from: payload.email,
    });
    return { sent: false as const, reason: "email_not_configured" as const };
  }

  const received = new Date().toISOString();
  const body = [
    "You received a new message from your portfolio.",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message,
    "",
    "Received:",
    received,
    "",
    "View message:",
    "https://rudra-pixel-quest.lovable.app/admin",
  ].join("\n");

  const response = await fetch("https://api.lovable.dev/v1/emails/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      domain: senderDomain,
      to: payload.to,
      subject: "New Message — RudraStack.dev",
      text: body,
    }),
  });

  if (!response.ok) {
    console.error("[contact] owner notification failed", response.status);
    return { sent: false as const, reason: "send_failed" as const };
  }

  return { sent: true as const };
}
