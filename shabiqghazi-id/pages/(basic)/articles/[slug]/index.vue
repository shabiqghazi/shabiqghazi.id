<template>
  <div class="px-5 flex flex-col py-32 gap-20 lg:gap-0 items-center">
    <main
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col lg:flex-row lg:gap-0 gap-16"
    >
      <article class="grow flex flex-col gap-8">
        <div class="categories text-xs flex gap-4 items-center justify-between">
          <p class="flex items-center gap-2">
            <CalendarDays :size="10" />
            <span>{{ formatDateHumanize(article?.publishedAt ?? "") }}</span>
          </p>
          <Badge
            variant="secondary"
            class="bg-green-200 text-green-500 text-xs"
          >
            <Tag />
            <span>{{ article?.category.name }}</span>
          </Badge>
        </div>
        <h1 class="text-2xl font-bold text-center">
          {{ article?.title }}
        </h1>
        <NuxtImg
          v-if="article?.cover.url"
          :src="getMediaUrl(article.cover.url)"
          :srcset="getStrapiSrcSet(article.cover.formats)"
          :alt="article.title"
          loading="lazy"
        />
        <div
          class="[&>p]:mb-4 ck-content !leading-loose"
          v-sanitize-html="article?.body"
        />
      </article>
      <div class="flex flex-col">
        <BaseSidebar />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { CalendarDays, Tag } from "lucide-vue-next";
import Badge from "~/components/ui/badge/Badge.vue";
import type { IStrapiArticle } from "~/types/strapi-article";
import { formatDateHumanize } from "~/utilities/data.util";

const { params } = useRoute();
const { getMediaUrl, getStrapiSrcSet } = useStrapi();
const { setBreadcrumbs } = useBreadcrumb();

const { setArticleSeo } = useSeo();

const { slug } = params;

const { data, pending } = await useFetch<IStrapiArticle>(
  `/api/articles/${slug}`
);

const article = computed(() => {
  return data.value;
});
const breadcrumbs = computed(() => [
  { title: "Beranda", route: "/" },
  { title: "Artikel", route: "/articles" },
  {
    title: data.value?.title ?? "",
    route: data.value?.slug ? `articles/${data.value?.slug}` : "/",
  },
]);
setArticleSeo(data.value, breadcrumbs.value);
setBreadcrumbs(breadcrumbs.value);

// 404 if article not found
if (!pending.value && !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Article not found",
  });
}

definePageMeta({
  layout: "basic",
});
</script>
