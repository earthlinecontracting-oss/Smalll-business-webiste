import "server-only";

import { z } from "zod";

import { publicEnvSchema } from "@/lib/env.public";

/**
 * Full environment validation. This file is server-only.
 *
 * Public (safe in the browser — also exported from env.public.ts):
 * - NEXT_PUBLIC_SITE_URL
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - NEXT_PUBLIC_TURNSTILE_SITE_KEY
 *
 * Server-only (never import this module from a Client Component):
 * - SUPABASE_SERVICE_ROLE_KEY
 * - RESEND_API_KEY
 * - TURNSTILE_SECRET_KEY
 * - QUOTE_INBOX_EMAIL
 *
 * The `server-only` import makes the Next.js build fail if a client file
 * imports this module.
 */
const envSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  QUOTE_INBOX_EMAIL: z.string().email(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  QUOTE_INBOX_EMAIL: process.env.QUOTE_INBOX_EMAIL,
});

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error(
    "Missing or invalid environment variables. Copy .env.example to .env.local and fill in every value.",
  );
}

export const env = parsed.data;
