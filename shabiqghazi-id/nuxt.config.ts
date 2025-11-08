// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: "2025-05-15",

  ssr: true,

  routeRules: {
    // List artikel - cache 5 menit dengan SWR
    "/articles": {
      swr: 60 * 5, // 5 menit
      // Alternatif: isr untuk revalidate on-demand
      // isr: 60 * 5,
    },

    // Detail artikel - cache lebih lama karena jarang berubah
    "/articles/**": {
      swr: 60 * 60, // 1 jam
    },

    // API routes juga bisa di-cache
    "/api/articles": {
      swr: 60 * 5, // Cache API 5 menit
    },

    "/api/articles/**": {
      swr: 60 * 60, // Cache detail artikel 1 jam
    },

    "/": {
      swr: 60 * 60,
    },

    "/about": {
      swr: 60 * 60,
    },
  },

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
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  },

  plugins: [{ src: "~/plugins/vue-recaptcha-v3.client.ts", mode: "client" }],

  nitro: {
    preset: "node-server",
  },

  experimental: {
    payloadExtraction: true,
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
