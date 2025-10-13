import type { IBaseStrapiContent, IStrapiFile, IStrapiSEO } from "./strapi";

export interface IStrapiPhoto extends IBaseStrapiContent {
  title: string;
  description: string;
  slug: string;
  media: IStrapiFile;
  seo: IStrapiSEO;
}
