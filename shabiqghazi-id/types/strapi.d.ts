import type { Any } from "./global";

export interface IStrapiSingleResponse<T = Any> {
  data: T;
  meta?: Record<string, Any>;
  error?: IStrapiError;
}

export interface IStrapiCollectionResponse<T = Any> {
  data: Array<T>;
  meta?: IStrapiMeta;
  error?: IStrapiError;
}

export interface IBaseStrapiContent {
  id: number;
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface IStrapiFile extends IBaseStrapiContent {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IStrapiFileVariant;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
}

export interface IStrapiFileVariant {
  large: IStrapiMediaFormat;
  small: IStrapiMediaFormat;
  medium: IStrapiMediaFormat;
  thumbnail: IStrapiMediaFormat;
}

export interface IStrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: string;
}

export interface IStrapiError {
  status: number;
  name: string;
  message: string;
  details?: string;
}

export interface IStrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IStrapiMeta {
  pagination: IStrapiPagination;
}

export interface IStrapiSEO {
  metaTitle: string;
  metaDescription: string;
  shareImage: IStrapiFile;
  metaKeywords: string;
}

export interface IStrapiQueryParams {
  populate?: string | string[] | Record<string, Any>;
  fields?: string[];
  filters?: Record<string, Any>;
  sort?: string | string[];
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: "live" | "preview";
  locale?: string;
}

enum IStrapiBlockComponent {
  TEXT = "shared.ck-editor",
  IMAGE = "shared.media",
  QUOTE = "shared.quote",
}

interface IStrapiBaseBlock {
  __component: IStrapiBlockComponent;
  id: number;
}

export interface IStrapiTextBlock extends IStrapiBaseBlock {
  body: string;
}

export interface IStrapiImageBlock extends IStrapiBaseBlock {
  file: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

export interface IStrapiQuoteBlock extends IStrapiBaseBlock {
  title: string;
  body: string;
}

export type IStrapiBlock =
  | IStrapiTextBlock
  | IStrapiImageBlock
  | IStrapiQuoteBlock;
