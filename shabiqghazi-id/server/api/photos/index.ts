import { usePhotos } from "~/composables/usePhotos";

export default defineEventHandler(async () => {
  const { getPhotos } = usePhotos();

  try {
    const response = await getPhotos();

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
