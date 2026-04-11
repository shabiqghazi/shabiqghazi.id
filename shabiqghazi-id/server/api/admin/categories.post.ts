import { slugify } from "~/utilities/slugify";

export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const body = await readBody<{
    name?: string;
    slug?: string;
    description?: string | null;
  }>(event);
  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, message: "Nama wajib" });
  }
  const slug = (body.slug?.trim() && slugify(body.slug)) || slugify(body.name);
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: body.name.trim(),
      slug,
      description: body.description ?? null,
    })
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
