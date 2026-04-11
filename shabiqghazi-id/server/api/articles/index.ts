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

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Math.max(1, parseInt(String(query.page ?? "1"), 10) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(String(query.pageSize ?? "5"), 10) || 5)
  );
  const search = String(query.search ?? "").trim();

  const supabase = useSupabaseAdmin();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from("articles")
    .select(listSelect, { count: "exact" })
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (search) {
    const esc = search.replace(/%/g, "\\%").replace(/_/g, "\\_");
    q = q.or(
      `title.ilike.%${esc}%,slug.ilike.%${esc}%,description.ilike.%${esc}%`
    );
  }

  const { data, error, count } = await q.range(from, to);

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  const total = count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const rows = (data ?? []) as ArticleListRowInput[];
  const mapped = rows.map((row) => mapArticleListRow(row));

  return {
    data: mapped,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
});
