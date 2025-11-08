import type { IStrapiArticle } from "~/types/strapi-article";

interface ISEOParam {
  title?: string;
  description?: string;
  image?: string | null;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalMeta?: any;
  breadcrumbs?: IBreadcrumb[];
}

interface IBreadcrumb {
  title: string;
  route: string;
}

export const useSeo = () => {
  const { setPageTitle, setPageDescription } = useBreadcrumb();

  const setSeoData = ({
    title,
    description,
    image,
    type = "website",
    additionalMeta = [],
    breadcrumbs,
  }: ISEOParam) => {
    useHead({
      title,
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: type },
        ...(image ? [{ property: "og:image", content: image }] : []),
        ...additionalMeta,
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: getStructuredBreadcrumbs(breadcrumbs),
          }),
        },
      ],
    });

    // Set untuk layout juga
    setPageTitle(title);
    setPageDescription(description);
  };

  const getStructuredBreadcrumbs = (breadcrumbs?: IBreadcrumb[]) => {
    const { $config } = useNuxtApp();
    const siteURL = $config.public.siteURL ?? "/";

    return breadcrumbs?.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: item.route ? `${siteURL}/${item.route}` : undefined,
    }));
  };

  const setArticleSeo = (
    article: IStrapiArticle | null,
    breadcrumbs: IBreadcrumb[]
  ) => {
    setSeoData({
      title: article?.seo.metaTitle ?? "Shabiq Ghazi Arkaan",
      description: article?.seo.metaDescription ?? "Shabiq Ghazi Arkaan",
      image: article?.seo?.shareImage?.url ?? null,
      type: "article",
      additionalMeta: [
        { property: "article:published_time", content: article?.publishedAt },
        { property: "article:author", content: article?.author.name },
        { property: "article:section", content: article?.category.name },
        { name: "keywords", content: article?.seo.metaKeywords },
      ],
      breadcrumbs,
    });
  };

  return {
    setSeoData,
    setArticleSeo,
  };
};
