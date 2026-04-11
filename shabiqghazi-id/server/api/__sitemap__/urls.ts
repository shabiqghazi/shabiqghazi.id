export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();
  const supabase = useSupabaseAdmin();

  const { data: articles, error } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: true });

  if (error) {
    console.error("[sitemap] articles", error.message);
    return [];
  }

  const base = config.public.siteURL ?? "";
  return (
    articles?.map((item) => ({
      loc: `${base}/articles/${item.slug}`,
      _sitemap: "articles",
      lastmod: item.updated_at,
    })) ?? []
  );
});
