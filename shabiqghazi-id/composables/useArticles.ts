import type {
  IStrapiCollectionResponse,
  IStrapiQueryParams,
} from "~/types/strapi";
import { useStrapi } from "./useStrapi";
import type { IBaseParams } from "~/types/global";
import type { IStrapiArticle } from "~/types/strapi-article";

export const useArticles = () => {
  const { find } = useStrapi();

  // Get all articles with pagination
  const getArticles = (params: IBaseParams = {}) => {
    const defaultParams: IStrapiQueryParams = {
      populate: ["author", "cover", "category"],
      sort: `${params.sortBy ?? "publishedAt"}:${
        params.sortDirection ?? "desc"
      }`,
      pagination: {
        pageSize: params.pageSize,
        page: params.page,
        withCount: true,
      },
      filters: {
        $or: [
          {
            title: { $containsi: params.search ?? "" },
          },
          {
            slug: { $containsi: params.search ?? "" },
          },
          {
            description: { $containsi: params.search ?? "" },
          },
          {
            body: { $containsi: params.search ?? "" },
          },
        ],
      },
    };

    return find<IStrapiCollectionResponse<IStrapiArticle>>(
      "articles",
      defaultParams
    );
  };

  const getLatestArticles = () => {
    const defaultParams: IStrapiQueryParams = {
      populate: ["cover"],
      sort: "publishedAt:desc",
      pagination: {
        limit: 4,
      },
    };

    return find<IStrapiCollectionResponse<IStrapiArticle>>(
      "articles",
      defaultParams
    );
  };

  // Get single article by slug
  const getArticleBySlug = (slug: string) => {
    return find<IStrapiCollectionResponse<IStrapiArticle>>("articles", {
      filters: { slug: { $eq: slug } },
      populate: ["author", "cover", "category", "seo"],
    });
  };

  return {
    getArticles,
    getArticleBySlug,
    getLatestArticles,
  };
};
