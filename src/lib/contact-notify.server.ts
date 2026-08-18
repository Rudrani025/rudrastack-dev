/**
 * Owner email notification for new contact messages.
 *
 * Sends through the connected Gmail account via the Lovable connector gateway.
 * Credentials stay server-side only.
 */
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

function encodeSubject(subject: string) {
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOwnerNotification(payload: {
  name: string;
  email: string;
  message: string;
  to: string;
}) {
  const lovableApiKey = process.env["LOVABLE_API_KEY"];
  const gmailKey = process.env["GOOGLE_MAIL_API_KEY"];

  if (!lovableApiKey || !gmailKey) {
    console.error("[contact] gmail connector not configured");
    return { sent: false as const, reason: "email_not_configured" as const };
  }

  const received = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = [
    "New Portfolio Contact",
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
    `Reply to Visitor: mailto:${payload.email}`,
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#2b1a3d;line-height:1.6">
  <h2 style="margin:0 0 16px">New Portfolio Contact</h2>
  <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
  <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
  <p style="margin:0 0 4px"><strong>Message:</strong></p>
  <p style="margin:0 0 16px;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
  <p style="margin:0 0 16px"><strong>Received:</strong><br />${escapeHtml(received)}</p>
  <p style="margin:0">
    <a href="mailto:${escapeHtml(payload.email)}?subject=${encodeURIComponent("Re: your message on RudraStack.dev")}"
       style="display:inline-block;background:#7c3aed;color:#ffffff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold">
      Reply to Visitor
    </a>
  </p>
</div>`;

  const boundary = `rudrastack_${Date.now()}`;
  const raw = [
    `To: ${payload.to}`,
    `Reply-To: ${payload.name} <${payload.email}>`,
    `Subject: ${encodeSubject("New Message from RudraStack.dev")}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": gmailKey,
    },
    body: JSON.stringify({ raw: toBase64Url(raw) }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[contact] gmail send failed [${response.status}]: ${body}`);
    return { sent: false as const, reason: "send_failed" as const };
  }

  return { sent: true as const };
}
