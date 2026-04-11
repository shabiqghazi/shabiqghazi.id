<template>
  <main class="px-5 min-h-screen flex flex-col py-32 items-center">
    <section
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col gap-16"
    >
      <article class="flex flex-col gap-20">
        <h1 class="text-2xl font-bold text-center">
          {{ data?.title }}
        </h1>
        <EditorJsRenderer :data="data?.content" />
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import EditorJsRenderer from "~/components/editor/EditorJsRenderer.vue";
import type { IBlogAbout } from "~/types/blog";

const { getMediaUrl } = useMedia();
const { setBreadcrumbs, setPageTitle } = useBreadcrumb();

const { data } = useFetch<IBlogAbout>("/api/about", {
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

useSeoMeta({
  title: () => about.value?.title,
  ogTitle: () => about.value?.seo?.metaTitle ?? about.value?.title,
  description: () =>
    about.value?.seo?.metaDescription || "Read this about",
  ogImage: () =>
    about.value?.seo?.shareImage?.url
      ? getMediaUrl(about.value.seo.shareImage.url)
      : undefined,
});

definePageMeta({
  layout: "basic",
});
</script>
