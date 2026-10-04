import { createBrowserClient } from "@supabase/ssr";

import { publicEnv } from "@/lib/env.public";

/**
 * Browser Supabase client.
 * Use in Client Components for the signed-in user.
 * Uses the anon key only. Never put the service role key here.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL,
    publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
