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
  const { slug } = getRouterParams(event);
  const supabase = useSupabaseAdmin();

  const { data, error } = await supabase
    .from("articles")
    .select(detailSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }
  if (!data) {
    throw createError({ statusCode: 404, statusMessage: "Article not found" });
  }

  return mapArticleRow(data as unknown as ArticleRowDb);
});
