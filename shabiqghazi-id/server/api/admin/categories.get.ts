export default defineEventHandler(async (event) => {
  await requireAuthorOrAdmin(event);
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, created_at")
    .order("name", { ascending: true });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  return { data: data ?? [] };
});
