import type { IBaseStrapiContent, IStrapiFile, IStrapiSEO } from "./strapi";

export interface IStrapiCategory extends IBaseStrapiContent {
  name: string;
  slug: string;
  description: string | null;
}

export interface IStrapiAuthor extends IBaseStrapiContent {
  name: string;
  email: string;
}

export interface IStrapiArticle extends IBaseStrapiContent {
  title: string;
  description: string;
  slug: string;
  body: string;
  cover: IStrapiFile;
  author: IStrapiAuthor;
  category: IStrapiCategory;
  seo: IStrapiSEO;
}
