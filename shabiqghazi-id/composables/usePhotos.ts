import type {
  IStrapiCollectionResponse,
  IStrapiQueryParams,
} from "~/types/strapi";
import { useStrapi } from "./useStrapi";
import type { IBaseParams } from "~/types/global";
import type { IStrapiPhoto } from "~/types/strapi-photo";

export const usePhotos = () => {
  const { find } = useStrapi();

  // Get all photos with pagination
  const getPhotos = (params: IBaseParams = {}) => {
    const defaultParams: IStrapiQueryParams = {
      populate: 'media',
      sort: `${params.sortBy ?? "publishedAt"}:${
        params.sortDirection ?? "desc"
      }`,
    };

    return find<IStrapiCollectionResponse<IStrapiPhoto>>(
      "photos",
      defaultParams
    );
  };

  const getLatestPhotos = () => {
    const defaultParams: IStrapiQueryParams = {
      populate: 'media',
      sort: "publishedAt:desc",
      pagination: {
        limit: 3,
      },
    };

    return find<IStrapiCollectionResponse<IStrapiPhoto>>(
      "photos",
      defaultParams
    );
  };

  // Get single photo by slug
  const getPhotoBySlug = (slug: string) => {
    return find<IStrapiCollectionResponse<IStrapiPhoto>>("photos", {
      filters: { slug: { $eq: slug } },
      populate: ["author", "cover", "category", "seo"],
    });
  };

  return {
    getPhotos,
    getPhotoBySlug,
    getLatestPhotos,
  };
};
