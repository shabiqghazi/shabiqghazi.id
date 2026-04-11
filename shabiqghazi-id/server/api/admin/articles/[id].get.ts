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
  const supabase = useSupabaseAdmin();

  const { data: row, error } = await supabase
    .from("articles")
    .select(detailSelect)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  if (!row) {
    throw createError({ statusCode: 404, message: "Artikel tidak ada" });
  }

  const authorId = (row as { author_id?: string }).author_id;
  if (
    ctx.profile.role === "author" &&
    authorId &&
    authorId !== ctx.profile.id
  ) {
    throw createError({ statusCode: 403, message: "Bukan artikel Anda" });
  }

  return mapArticleRow(row as unknown as ArticleRowDb);
});
