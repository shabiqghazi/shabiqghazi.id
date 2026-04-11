import { mapArticleListRow, type ArticleListRowInput } from "~/server/utils/blog-mappers";

const adminListSelect = `
  id, title, slug, description, created_at, published_at, updated_at,
  cover_url, cover_width, cover_height, status,
  meta_title, meta_description, meta_keywords, og_image_url,
  category:categories ( id, name, slug, description ),
  author:profiles!articles_author_id_fkey ( id, full_name, email )
`;

export default defineEventHandler(async (event) => {
  const ctx = await requireAuthorOrAdmin(event);
  const query = getQuery(event);
  const page = Math.max(1, parseInt(String(query.page ?? "1"), 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(String(query.pageSize ?? "20"), 10) || 20)
  );

  const supabase = useSupabaseAdmin();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("articles")
    .select(adminListSelect, { count: "exact" })
    .order("updated_at", { ascending: false });

  if (ctx.profile.role === "author") {
    q = q.eq("author_id", ctx.profile.id);
  }

  const { data, error, count } = await q.range(from, to);

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const rows = (data ?? []) as ArticleListRowInput[];

  return {
    data: rows.map((row) => mapArticleListRow(row)),
    meta: { pagination: { page, pageSize, pageCount, total } },
  };
});
