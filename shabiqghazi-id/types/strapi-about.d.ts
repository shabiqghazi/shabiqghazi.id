import type { IStrapiSEO, IStrapiBlock } from "./strapi";

export interface IStrapiAbout extends IBaseStrapiContent {
  title: string;
  blocks: IStrapiBlock[];
  seo: IStrapiSEO;
}
