import "server-only";

import { z } from "zod";

import { publicEnvSchema } from "@/lib/env.public";

/**
 * Full environment validation. This file is server-only.
 *
 * Public (safe in the browser — also exported from env.public.ts):
 * - NEXT_PUBLIC_SITE_URL
 * - NEXT_PUBLIC_TURNSTILE_SITE_KEY
 *
 * Server-only (never import this module from a Client Component):
 * - RESEND_API_KEY
 * - RESEND_FROM_EMAIL
 * - TURNSTILE_SECRET_KEY
 * - QUOTE_INBOX_EMAIL
 * - GOOGLE_SERVICE_ACCOUNT_JSON (Drive gallery sync; empty until configured)
 * - GOOGLE_DRIVE_GALLERY_FOLDER_ID
 *
 * The `server-only` import makes the Next.js build fail if a client file
 * imports this module.
 */
const envSchema = publicEnvSchema.extend({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z
    .string()
    .min(5)
    .refine((value) => /@/.test(value), "RESEND_FROM_EMAIL must include an @"),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  QUOTE_INBOX_EMAIL: z.string().email(),
  GOOGLE_SERVICE_ACCOUNT_JSON: z.string().default(""),
  GOOGLE_DRIVE_GALLERY_FOLDER_ID: z.string().default(""),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  QUOTE_INBOX_EMAIL: process.env.QUOTE_INBOX_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_JSON: process.env.GOOGLE_SERVICE_ACCOUNT_JSON ?? "",
  GOOGLE_DRIVE_GALLERY_FOLDER_ID: process.env.GOOGLE_DRIVE_GALLERY_FOLDER_ID ?? "",
});

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error(
    "Missing or invalid environment variables. Copy .env.example to .env.local and fill in every value.",
  );
}

export const env = parsed.data;
