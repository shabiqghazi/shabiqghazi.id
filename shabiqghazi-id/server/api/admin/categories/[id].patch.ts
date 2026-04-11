import { slugify } from "~/utilities/slugify";

export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const { id } = getRouterParams(event);
  const patch = await readBody<{
    name?: string;
    slug?: string;
    description?: string | null;
  }>(event);

  const updates: Record<string, unknown> = {};
  if (patch.name !== undefined) updates.name = patch.name;
  if (patch.description !== undefined) updates.description = patch.description;
  if (patch.slug !== undefined && String(patch.slug).trim() !== "") {
    updates.slug = slugify(String(patch.slug));
  } else if (patch.name !== undefined && patch.slug === undefined) {
    updates.slug = slugify(patch.name);
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada perubahan" });
  }

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw createError({ statusCode: 409, message: "Slug kategori sudah ada" });
    }
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
