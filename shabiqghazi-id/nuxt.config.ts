// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: "2025-05-15",

  ssr: true,

  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxtjs/sitemap",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
  ],

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      apiMediaURL: process.env.API_MEDIA_URL,
      apiBaseURL: process.env.API_BASE_URL,
      siteURL: process.env.SITE_URL,
      captchaSiteKey: process.env.NUXT_PUBLIC_CAPTCHA_SITE_KEY,
    },
    captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
  },

  plugins: [{ src: "~/plugins/vue-recaptcha-v3.client.ts", mode: "client" }],

  nitro: {
    preset: "vercel",
  },

  experimental: {
    payloadExtraction: false,
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  googleFonts: {
    families: {
      Montserrat: [300, 400, 500, 600, 700],
      "JetBrains+Mono": true, // untuk kode
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  alias: {
    lucide: "lucide-vue-next",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
    },
  },
});
