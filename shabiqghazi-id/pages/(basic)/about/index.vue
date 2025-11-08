<template>
  <main class="px-5 min-h-screen flex flex-col py-32 items-center">
    <section
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col gap-16"
    >
      <article class="flex flex-col gap-20">
        <h1 class="text-2xl font-bold text-center">
          {{ data?.title }}
        </h1>
        <AboutContent :blocks="data?.blocks" />
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import AboutContent from "~/components/about/AboutContent.vue";
import type { IStrapiAbout } from "~/types/strapi-about";

const { getMediaUrl } = useStrapi();
const { setBreadcrumbs, setPageTitle } = useBreadcrumb();

const { data } = useFetch<IStrapiAbout>("/api/about", {
  lazy: true,
  server: true,
  getCachedData: (key) =>
    useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
});

const about = computed(() => {
  return data.value;
});

setPageTitle("Tentang");
setBreadcrumbs([
  {
    title: "Beranda",
    route: "/",
  },
  {
    title: about.value?.title ?? "Tentang",
    route: "/about",
  },
]);

// SEO Meta
useSeoMeta({
  title: () => about.value?.title,
  ogTitle: () => about.value?.seo?.metaTitle,
  description: () => about.value?.seo?.metaDescription || "Read this about",
  ogImage: () =>
    about.value?.seo?.shareImage?.url
      ? getMediaUrl(about.value?.seo?.shareImage?.url)
      : undefined,
});

definePageMeta({
  layout: "basic",
});
</script>
