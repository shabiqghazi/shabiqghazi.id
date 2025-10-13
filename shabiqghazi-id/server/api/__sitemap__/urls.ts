import { getHttpClient } from "~/lib/httpClient";
import { IStrapiCollectionResponse } from "~/types/strapi";
import { IStrapiArticle } from "~/types/strapi-article";

export default defineSitemapEventHandler(async () => {
  const httpClient = getHttpClient();
  const config = useRuntimeConfig();

  const { data: articles } = await httpClient<
    IStrapiCollectionResponse<IStrapiArticle>
  >("/articles", {
    query: {
      fields: ["title", "slug", "updatedAt"],
      sort: "publishedAt:asc",
    },
  });

  const mappedArticles =
    articles?.map((item) => ({
      loc: `${config.public.siteURL}/articles/${item.slug}`,
      _sitemap: "articles",
      lastmod: item.updatedAt,
    })) ?? [];

  return mappedArticles;
});
