import type { H3Event } from "h3";
import type { ICmsProfile } from "~/types/blog";

export interface AdminAuthContext {
  userId: string;
  email: string | null;
  profile: ICmsProfile;
  accessToken: string;
}

export async function requireAuth(event: H3Event): Promise<AdminAuthContext> {
  const header = getHeader(event, "authorization");
  const token = header?.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const supabase = useSupabaseAdmin();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("id, email, full_name, role")
    .eq("id", user.id)
    .single();
  if (pErr || !profile) {
    throw createError({
      statusCode: 403,
      message: "Profil CMS tidak ditemukan. Tambahkan baris di tabel profiles.",
    });
  }
  return {
    userId: user.id,
    email: user.email ?? null,
    profile: profile as ICmsProfile,
    accessToken: token,
  };
}

export async function requireSuperAdmin(event: H3Event): Promise<AdminAuthContext> {
  const ctx = await requireAuth(event);
  if (ctx.profile.role !== "super_admin") {
    throw createError({ statusCode: 403, message: "Hanya super admin" });
  }
  return ctx;
}

export async function requireAuthorOrAdmin(
  event: H3Event
): Promise<AdminAuthContext> {
  const ctx = await requireAuth(event);
  if (ctx.profile.role !== "super_admin" && ctx.profile.role !== "author") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }
  return ctx;
}
