export default defineEventHandler(async (event) => {
  const ctx = await requireAuthorOrAdmin(event);
  const { id } = getRouterParams(event);
  const supabase = useSupabaseAdmin();

  const { data: existing, error: exErr } = await supabase
    .from("articles")
    .select("author_id")
    .eq("id", id)
    .maybeSingle();

  if (exErr) {
    throw createError({ statusCode: 500, message: exErr.message });
  }
  if (!existing) {
    throw createError({ statusCode: 404, message: "Artikel tidak ada" });
  }
  if (
    ctx.profile.role === "author" &&
    existing.author_id !== ctx.profile.id
  ) {
    throw createError({ statusCode: 403, message: "Bukan artikel Anda" });
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return { ok: true };
});
