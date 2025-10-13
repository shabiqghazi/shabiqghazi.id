import { useArticles } from "~/composables/useArticles";

export default defineEventHandler(async () => {
  const { getLatestArticles } = useArticles();

  try {
    const response = await getLatestArticles();

    return response;
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
