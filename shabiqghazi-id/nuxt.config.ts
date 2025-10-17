// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import type { IStrapiArticle } from "./types/strapi-article";

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
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ["/"],
      ignore: ["/admin", "/api"],
    },
  },

  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) return;

      // Fetch semua artikel dari Strapi
      const articles = await fetchArticles();

      if (articles.length) {
        const articleRoutes = articles.map(
          (article: IStrapiArticle) => `/articles/${article.slug}`
        );

        nitroConfig.prerender = nitroConfig.prerender || { routes: [] };
        nitroConfig.prerender.routes = [
          ...(nitroConfig.prerender.routes || []),
          ...articleRoutes,
        ];
      }
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/articles": { prerender: true },
    "/articles/**": { prerender: true },
    "/gallery": { prerender: true },
    "/about": { prerender: true },
    "/contact": { prerender: true },
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

// Helper function untuk fetch articles dari Strapi
async function fetchArticles() {
  try {
    const apiBase = process.env.API_BASE_URL || "http://localhost:1337/api";
    const response = await fetch(`${apiBase}/articles?fields[0]=slug`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
