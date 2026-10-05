import { z } from "zod";

/**
 * Browser-safe environment variables only (NEXT_PUBLIC_*).
 * Import this from Client Components. Never put secrets here.
 */
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
});

if (!parsed.success) {
  console.error("Invalid public environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error(
    "Missing or invalid NEXT_PUBLIC_* variables. Copy .env.example to .env.local and fill in every value.",
  );
}

export const publicEnv = parsed.data;
