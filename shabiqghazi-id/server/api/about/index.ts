import { useAbout } from "~/composables/useAbout";

export default defineEventHandler(async () => {
  const { getAbout } = useAbout();

  try {
    const response = await getAbout();

    const { data } = response;

    return data;
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
