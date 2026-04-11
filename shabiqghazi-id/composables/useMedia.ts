export const useMedia = () => {
  const getMediaUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return `/api/image-proxy?url=${encodeURIComponent(path)}`;
  };

  const getStrapiSrcSet = (
    formats: Record<string, { url: string; width: number }> | null | undefined
  ) => {
    if (!formats || typeof formats !== "object") return undefined;
    return Object.values(formats)
      .filter((f) => f?.url && f?.width)
      .map((f) => `${getMediaUrl(f.url)} ${f.width}w`)
      .join(", ");
  };

  return { getMediaUrl, getStrapiSrcSet };
};
