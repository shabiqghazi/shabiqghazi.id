import { normalizeEditorData } from "~/utilities/editorjs.util";

export default defineEventHandler(async (event) => {
  await requireSuperAdmin(event);
  const patch = await readBody<{
    title?: string;
    content?: unknown;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    og_image_url?: string | null;
  }>(event);

  const updates: Record<string, unknown> = {};
  if (patch.title !== undefined) updates.title = patch.title;
  if (patch.content !== undefined) updates.content = normalizeEditorData(patch.content);
  if (patch.meta_title !== undefined) updates.meta_title = patch.meta_title;
  if (patch.meta_description !== undefined) {
    updates.meta_description = patch.meta_description;
  }
  if (patch.meta_keywords !== undefined) {
    updates.meta_keywords = patch.meta_keywords;
  }
  if (patch.og_image_url !== undefined) {
    updates.og_image_url = patch.og_image_url;
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada perubahan" });
  }

  updates.updated_at = new Date().toISOString();

  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("about_page")
    .update(updates)
    .eq("id", 1)
    .select("*")
    .single();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  return data;
});
