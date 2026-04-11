export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const { id } = getRouterParams(event);
  const supabase = useSupabaseAdmin();
  const { error } = await supabase.from("photos").delete().eq("id", id);
  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return { ok: true };
});
