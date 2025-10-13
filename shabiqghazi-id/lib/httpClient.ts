import { useRuntimeConfig } from "#imports";
import type { Any } from "../types/global";

export const getHttpClient = <T = Any>() => {
  const config = useRuntimeConfig();

  const httpClient = $fetch.create<T>({
    baseURL: config.public.apiBaseURL,
  });

  return httpClient;
};
