export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return { data: data ?? [] };
});
