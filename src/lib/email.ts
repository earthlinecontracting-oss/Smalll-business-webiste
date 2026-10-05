import "server-only";

import { env } from "@/lib/env";

/**
 * Outbound email helper (Resend).
 * Server-only: API keys stay on the server.
 */
export async function sendEmail(input: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const key = env.RESEND_API_KEY;
  const placeholder = key.includes("your-resend") || key.length < 8;

  if (placeholder) {
    console.info("Quote email skipped (Resend is not configured yet).");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: env.QUOTE_INBOX_EMAIL,
      subject: input.subject,
      text: input.text,
      html: input.html,
      reply_to: input.replyTo,
    }),
  });

  if (!response.ok) {
    console.error("Resend rejected the quote email.", response.status);
    throw new Error("The quote email could not be sent.");
  }
}
