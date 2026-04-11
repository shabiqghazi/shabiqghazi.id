export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return { data: data ?? [] };
});
