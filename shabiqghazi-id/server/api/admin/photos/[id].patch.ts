export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const { id } = getRouterParams(event);
  const patch = await readBody<Record<string, unknown>>(event);

  const allowed = [
    "title",
    "description",
    "slug",
    "media_url",
    "media_width",
    "media_height",
    "sort_order",
  ] as const;
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in patch) updates[key] = patch[key];
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada perubahan" });
  }

  updates.updated_at = new Date().toISOString();

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("photos")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
