import { getHttpClient } from "~/lib/httpClient";
import type { Any } from "~/types/global";
import type { IStrapiFileVariant, IStrapiQueryParams } from "~/types/strapi";
import { buildQuery } from "~/utilities/build-query.util";

export const useStrapi = () => {
  const httpClient = getHttpClient();

  // Find single entry
  const findOneById = async <T = Any>(
    contentType: string,
    id: string | number,
    params: IStrapiQueryParams = {}
  ): Promise<T> => {
    const query = buildQuery(params);
    const endpoint = `/${contentType}/${id}${query ? `?${query}` : ""}`;

    return httpClient(endpoint);
  };

  // Find multiple entries
  const find = async <T = Any>(
    contentType: string,
    params: IStrapiQueryParams = {}
  ): Promise<T> => {
    const query = buildQuery(params);
    const endpoint = `/${contentType}${query ? `?${query}` : ""}`;

    return httpClient(endpoint);
  };

  // Get media URL helper
  function getMediaUrl(path: string) {
    return `/api/image-proxy?url=${encodeURIComponent(path)}`;
  }

  function getStrapiSrcSet(formats: IStrapiFileVariant) {
    return Object.values(formats)
      .map((format) => `${getMediaUrl(format.url)} ${format.width}w`)
      .join(", ");
  }

  return {
    find,
    findOneById,
    buildQuery,
    getMediaUrl,
    getStrapiSrcSet,
  };
};
