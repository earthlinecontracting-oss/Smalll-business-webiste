import "server-only";

import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";

/**
 * Service-role Supabase client.
 *
 * DANGER: this key bypasses Row Level Security. Anyone who has it can read and
 * write every row. Use only in trusted server code (admin jobs, webhooks).
 * Never import this file into a Client Component or expose it to the browser.
 */
export function createSupabaseAdminClient() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
