import { useArticles } from "~/composables/useArticles";

export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const { getArticleBySlug } = useArticles();

  try {
    const response = await getArticleBySlug(slug);

    const { data } = response;

    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw createError({
        status: 500,
        message: "Unknown error",
      });
    }
  }
});
