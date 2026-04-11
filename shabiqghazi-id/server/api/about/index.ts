import { mapAboutRow } from "~/server/utils/blog-mappers";

export default defineEventHandler(async () => {
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
    throw createError({ statusCode: 404, message: "About page missing" });
  }

  return mapAboutRow({
    title: data.title,
    content: data.content,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    meta_keywords: data.meta_keywords,
    og_image_url: data.og_image_url,
  });
});
