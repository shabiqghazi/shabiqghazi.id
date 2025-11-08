<template>
  <section id="home-articles" class="px-5 py-32 flex justify-center">
    <div
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col items-center gap-20 justify-center"
    >
      <h2 class="font-bold text-4xl text-center">Artikel Terbaru</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <template v-for="article in articles" :key="article.id">
          <HomeArticleCard :article="article" />
        </template>
      </div>
      <NuxtLink href="/articles">
        <Button
          variant="default"
          size="lg"
          class="flex gap-2 hover:gap-3 hover:cursor-pointer hover:bg-green-300 hover:text-black border border-black transition-all duration-200"
        >
          <span>Selengkapnya</span>
        </Button>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { IStrapiCollectionResponse } from "~/types/strapi";
import type { IStrapiArticle } from "~/types/strapi-article";

const { data } = useFetch<IStrapiCollectionResponse<IStrapiArticle>>(
  `/api/articles/latest`,
  {
    key: "latest-article",
    lazy: true,
    server: true,
    getCachedData: (key) =>
      useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  }
);

const articles = computed(() => data.value?.data);
</script>

<style></style>
