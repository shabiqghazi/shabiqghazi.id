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
  const body = await readBody<{
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

  if (!body?.title?.trim()) {
    throw createError({ statusCode: 400, message: "Judul wajib" });
  }

  const slug = (body.slug?.trim() && slugify(body.slug)) || slugify(body.title);
  if (!slug) {
    throw createError({ statusCode: 400, message: "Slug tidak valid" });
  }

  const status = body.status === "published" ? "published" : "draft";
  const publishedAt =
    status === "published"
      ? (body.published_at ?? new Date().toISOString())
      : null;

  const supabase = useSupabaseAdmin();
  const insert = {
    title: body.title.trim(),
    slug,
    description: body.description ?? null,
    body: normalizeEditorData(body.body),
    cover_url: body.cover_url ?? null,
    cover_width: body.cover_width ?? null,
    cover_height: body.cover_height ?? null,
    category_id: body.category_id ?? null,
    author_id: ctx.profile.id,
    status,
    published_at: publishedAt,
    meta_title: body.meta_title ?? null,
    meta_description: body.meta_description ?? null,
    meta_keywords: body.meta_keywords ?? null,
    og_image_url: body.og_image_url ?? null,
  };

  const { data: created, error } = await supabase
    .from("articles")
    .insert(insert)
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw createError({
        statusCode: 409,
        message: "Slug sudah dipakai artikel lain",
      });
    }
    throw createError({ statusCode: 500, message: error.message });
  }

  const { data: full, error: fErr } = await supabase
    .from("articles")
    .select(detailSelect)
    .eq("id", created.id)
    .single();

  if (fErr || !full) {
    throw createError({ statusCode: 500, message: fErr?.message ?? "Gagal load" });
  }

  return mapArticleRow(full as unknown as ArticleRowDb);
});
