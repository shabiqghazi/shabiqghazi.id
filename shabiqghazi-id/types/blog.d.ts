export interface EditorJsData {
  time?: number;
  blocks: Array<{ id?: string; type: string; data: Record<string, unknown> }>;
  version?: string;
}

export interface IBlogCover {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number }> | null;
}

export interface IBlogArticle {
  id: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  /** Hanya diisi dari API admin */
  status?: "draft" | "published";
  title: string;
  slug: string;
  description: string | null;
  body: EditorJsData;
  cover: IBlogCover | null;
  category: {
    id?: string;
    name: string;
    slug: string;
    description?: string | null;
  };
  author: { name: string; email: string | null };
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    shareImage: { url: string } | null;
  };
}

export interface IBlogPhoto {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  media: IBlogCover;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogAbout {
  title: string;
  content: EditorJsData;
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    shareImage: { url: string } | null;
  };
}

export interface IBlogCollectionMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface IBlogArticleCollection {
  data: IBlogArticle[];
  meta: IBlogCollectionMeta;
}

export interface IBlogPhotoCollection {
  data: IBlogPhoto[];
}

export type CmsRole = "super_admin" | "author";

export interface ICmsProfile {
  id: string;
  email: string | null;
  full_name: string;
  role: CmsRole;
}
