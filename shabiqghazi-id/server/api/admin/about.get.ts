export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("about_page")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  if (!data) {
    throw createError({ statusCode: 404, message: "about_page kosong" });
  }
  return data;
});
