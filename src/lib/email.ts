import "server-only";

import { env } from "@/lib/env";

/**
 * Outbound email helper (Resend).
 * Server-only: API keys stay on the server.
 */
export async function sendEmail(input: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  void env.RESEND_API_KEY;
  void env.QUOTE_INBOX_EMAIL;
  void input;
  throw new Error("Email sending is not wired up yet. Use Resend from a Server Action.");
}
