import {
  mapArticleListRow,
  type ArticleListRowInput,
} from "~/server/utils/blog-mappers";

const listSelect = `
  id, title, slug, description, created_at, published_at, updated_at,
  cover_url, cover_width, cover_height,
  meta_title, meta_description, meta_keywords, og_image_url,
  category:categories ( id, name, slug, description ),
  author:profiles!articles_author_id_fkey ( id, full_name, email )
`;

export default defineEventHandler(async () => {
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select(listSelect)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(4);

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  const rows = (data ?? []) as ArticleListRowInput[];

  return {
    data: rows.map((row) => mapArticleListRow(row)),
    meta: {},
  };
});
