import { slugify } from "~/utilities/slugify";
import { normalizeEditorData } from "~/utilities/editorjs.util";
import { mapArticleRow, type ArticleRowDb } from "~/server/utils/blog-mappers";

const detailSelect = `
  id, title, slug, description, body, created_at, published_at, updated_at,
  cover_url, cover_width, cover_height,
  meta_title, meta_description, meta_keywords, og_image_url,
  category_id, author_id, status,
  category:categories ( id, name, slug, description ),
  author:profiles!articles_author_id_fkey ( id, full_name, email )
`;

export default defineEventHandler(async (event) => {
  const ctx = await requireAuthorOrAdmin(event);
  const { id } = getRouterParams(event);
  const patch = await readBody<{
    title?: string;
    slug?: string;
    description?: string | null;
    body?: unknown;
    cover_url?: string | null;
    cover_width?: number | null;
    cover_height?: number | null;
    category_id?: string | null;
    status?: "draft" | "published";
    published_at?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    og_image_url?: string | null;
  }>(event);

  const supabase = useSupabaseAdmin();
  const { data: existing, error: exErr } = await supabase
    .from("articles")
    .select("author_id")
    .eq("id", id)
    .maybeSingle();

  if (exErr) {
    throw createError({ statusCode: 500, message: exErr.message });
  }
  if (!existing) {
    throw createError({ statusCode: 404, message: "Artikel tidak ada" });
  }
  if (
    ctx.profile.role === "author" &&
    existing.author_id !== ctx.profile.id
  ) {
    throw createError({ statusCode: 403, message: "Bukan artikel Anda" });
  }

  const updates: Record<string, unknown> = {};

  if (patch.title !== undefined) updates.title = patch.title;
  if (patch.description !== undefined) updates.description = patch.description;
  if (patch.body !== undefined) updates.body = normalizeEditorData(patch.body);
  if (patch.cover_url !== undefined) updates.cover_url = patch.cover_url;
  if (patch.cover_width !== undefined) updates.cover_width = patch.cover_width;
  if (patch.cover_height !== undefined) updates.cover_height = patch.cover_height;
  if (patch.category_id !== undefined) updates.category_id = patch.category_id;
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

  if (patch.slug !== undefined && String(patch.slug).trim() !== "") {
    updates.slug = slugify(String(patch.slug));
  }

  if (patch.status !== undefined) {
    updates.status = patch.status;
    if (patch.status === "published") {
      updates.published_at =
        patch.published_at ?? new Date().toISOString();
    } else {
      updates.published_at = null;
    }
  } else if (patch.published_at !== undefined) {
    updates.published_at = patch.published_at;
  }

  if (Object.keys(updates).length === 0) {
    throw createError({ statusCode: 400, message: "Tidak ada perubahan" });
  }

  updates.updated_at = new Date().toISOString();

  const { error: upErr } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id);

  if (upErr) {
    if (upErr.code === "23505") {
      throw createError({
        statusCode: 409,
        message: "Slug sudah dipakai artikel lain",
      });
    }
    throw createError({ statusCode: 500, message: upErr.message });
  }

  const { data: full, error: fErr } = await supabase
    .from("articles")
    .select(detailSelect)
    .eq("id", id)
    .single();

  if (fErr || !full) {
    throw createError({ statusCode: 500, message: fErr?.message ?? "Gagal load" });
  }

  return mapArticleRow(full as unknown as ArticleRowDb);
});
