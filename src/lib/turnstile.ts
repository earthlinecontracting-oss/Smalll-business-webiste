import "server-only";

import { env } from "@/lib/env";

type TurnstileVerifyResponse = {
  success: boolean;
};

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!token.trim()) {
    return false;
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileVerifyResponse;
  return result.success === true;
}
