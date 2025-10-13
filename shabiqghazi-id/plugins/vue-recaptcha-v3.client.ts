import { defineNuxtPlugin } from "#app";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: config.public.captchaSiteKey, // Replace with your site key
    loaderOptions: {
      autoHideBadge: true, // Optional: Automatically hides the badge
      explicitRenderParameters: {
        //badge: 'bottomleft', //incase you don't want to hide it
      },
    },
  });
});
