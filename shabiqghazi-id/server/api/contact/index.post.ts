import { defineEventHandler, readBody } from "h3";
import { getHttpClient } from "~/lib/httpClient";

type RecaptchaResponse = {
  success: boolean;
  score?: number;
};
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const httpClient = getHttpClient();

  const res = await httpClient<RecaptchaResponse>(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: config.public.captchaSecretKey,
        response: body.recaptcha_token,
      }),
    }
  );

  if (!res.success || (res.score ?? 0) < 0.5) {
    throw createError({
      statusCode: 403,
      message: "Failed to verify reCAPTCHA",
    });
  }

  return {
    message: "Post created successfully",
    data: body,
  };
});
