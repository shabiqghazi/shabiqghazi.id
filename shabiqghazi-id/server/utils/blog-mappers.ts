import type { EditorJsData, IBlogAbout, IBlogArticle, IBlogPhoto } from "~/types/blog";
import { normalizeEditorData } from "~/utilities/editorjs.util";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
} | null;

type AuthorRow = {
  id: string;
  full_name: string;
  email: string | null;
} | null;

export type ArticleRowDb = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  body: unknown;
  cover_url: string | null;
  cover_width: number | null;
  cover_height: number | null;
  category_id: string | null;
  author_id: string;
  status?: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
  category?: CategoryRow;
  author?: AuthorRow;
};

export type PhotoRowDb = {
  id: string;
  title: string;
  description: string | null;
  slug: string | null;
  media_url: string;
  media_width: number | null;
  media_height: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ArticleListRowInput = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  cover_width: number | null;
  cover_height: number | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  status?: string;
  category?: CategoryRow;
  author?: AuthorRow;
};

/** Ringkas untuk daftar artikel (tanpa kolom body). */
export function mapArticleListRow(row: ArticleListRowInput): IBlogArticle {
  return mapArticleRow({
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    body: { blocks: [] },
    cover_url: row.cover_url,
    cover_width: row.cover_width,
    cover_height: row.cover_height,
    category_id: null,
    author_id: "",
    status: row.status,
    published_at: row.published_at,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    meta_keywords: row.meta_keywords,
    og_image_url: row.og_image_url,
    created_at: row.created_at,
    updated_at: row.updated_at,
    category: row.category,
    author: row.author,
  });
}

export function mapArticleRow(row: ArticleRowDb): IBlogArticle {
  const body = normalizeEditorData(row.body);
  const cat = row.category;
  const author = row.author;
  const statusOut =
    row.status === "draft" || row.status === "published"
      ? row.status
      : undefined;

  return {
    id: row.id,
    documentId: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? row.created_at,
    ...(statusOut ? { status: statusOut } : {}),
    title: row.title,
    slug: row.slug,
    description: row.description,
    body,
    cover: row.cover_url
      ? {
          url: row.cover_url,
          alternativeText: row.title,
          width: row.cover_width ?? undefined,
          height: row.cover_height ?? undefined,
          formats: null,
        }
      : null,
    category: cat
      ? {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
        }
      : { name: "-", slug: "-", description: null },
    author: {
      name: author?.full_name || author?.email || "Penulis",
      email: author?.email ?? null,
    },
    seo: {
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      metaKeywords: row.meta_keywords,
      shareImage: row.og_image_url ? { url: row.og_image_url } : null,
    },
  };
}

export function mapPhotoRow(row: PhotoRowDb): IBlogPhoto {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    slug: row.slug,
    media: {
      url: row.media_url,
      alternativeText: row.title,
      width: row.media_width ?? undefined,
      height: row.media_height ?? undefined,
      formats: null,
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapAboutRow(row: {
  title: string;
  content: unknown;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
}): IBlogAbout {
  const content = normalizeEditorData(row.content) as EditorJsData;
  return {
    title: row.title,
    content,
    seo: {
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      metaKeywords: row.meta_keywords,
      shareImage: row.og_image_url ? { url: row.og_image_url } : null,
    },
  };
}
