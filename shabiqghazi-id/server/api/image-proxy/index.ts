export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const config = useRuntimeConfig();
  const imagePath = query.url;

  if (!imagePath || typeof imagePath !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Image path required",
    });
  }

  const strapiBaseUrl = config.public.apiMediaURL;
  const imageUrl = `${strapiBaseUrl}${imagePath}`;

  const res = await fetch(imageUrl);

  if (!res.ok) {
    throw createError({
      statusCode: res.status,
      statusMessage: res.statusText,
    });
  }

  // Forward headers and stream the image
  const contentType = res.headers.get("content-type") || "image/jpeg";
  event.node.res.setHeader("Content-Type", contentType);
  event.node.res.setHeader("Cache-Control", "public, max-age=86400"); // 1 hari

  return res.body;
});
