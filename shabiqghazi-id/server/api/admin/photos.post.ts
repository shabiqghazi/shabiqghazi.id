export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const body = await readBody<{
    title?: string;
    description?: string | null;
    slug?: string | null;
    media_url?: string;
    media_width?: number | null;
    media_height?: number | null;
    sort_order?: number;
  }>(event);

  if (!body?.title?.trim() || !body?.media_url?.trim()) {
    throw createError({ statusCode: 400, message: "Judul dan URL media wajib" });
  }

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("photos")
    .insert({
      title: body.title.trim(),
      description: body.description ?? null,
      slug: body.slug?.trim() || null,
      media_url: body.media_url.trim(),
      media_width: body.media_width ?? null,
      media_height: body.media_height ?? null,
      sort_order: body.sort_order ?? 0,
    })
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
