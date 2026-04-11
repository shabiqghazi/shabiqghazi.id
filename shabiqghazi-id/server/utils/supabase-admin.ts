import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function useSupabaseAdmin(): SupabaseClient {
  const config = useRuntimeConfig();
  const url = config.supabaseUrl as string;
  const key = config.supabaseServiceKey as string;
  if (!url || !key) {
    throw createError({
      statusCode: 500,
      message: "Supabase server env belum diset (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)",
    });
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
