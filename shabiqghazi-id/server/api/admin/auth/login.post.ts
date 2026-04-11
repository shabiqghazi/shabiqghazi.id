import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string;
    password?: string;
  }>(event);
  const config = useRuntimeConfig();
  const url = config.public.supabaseUrl as string;
  const anon = config.public.supabaseAnonKey as string;
  if (!url || !anon) {
    throw createError({
      statusCode: 500,
      message: "NUXT_PUBLIC_SUPABASE_URL / NUXT_PUBLIC_SUPABASE_ANON_KEY belum diset",
    });
  }
  if (!body?.email || !body?.password) {
    throw createError({ statusCode: 400, message: "Email dan password wajib" });
  }

  const anonClient = createClient(url, anon);
  const { data, error } = await anonClient.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  });
  if (error || !data.session) {
    throw createError({
      statusCode: 401,
      message: error?.message ?? "Login gagal",
    });
  }

  const admin = useSupabaseAdmin();
  const { data: profile, error: pErr } = await admin
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", data.user.id)
    .single();

  if (pErr || !profile) {
    throw createError({
      statusCode: 403,
      message:
        "User belum punya profil CMS. Tambahkan baris di tabel profiles untuk user ini.",
    });
  }

  return {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at: data.session.expires_at,
    user: { id: data.user.id, email: data.user.email },
    profile,
  };
});
