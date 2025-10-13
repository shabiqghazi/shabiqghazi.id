import qs from "qs";
import type { IStrapiQueryParams } from "~/types/strapi";

export const buildQuery = (payload: IStrapiQueryParams): string => {
  return qs.stringify(payload, {
    encodeValuesOnly: true,
  });
};
