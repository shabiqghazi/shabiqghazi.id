<template>
  <Card class="py-0 overflow-clip border-0 shadow flex flex-row gap-0 h-full">
    <NuxtImg
      v-if="props.article.cover.url"
      class="h-24 aspect-square object-cover"
      :src="getMediaUrl(props.article.cover.url)"
      :srcset="getStrapiSrcSet(props.article.cover.formats)"
      :alt="props.article.title"
      loading="lazy"
    />
    <div class="flex flex-col gap-3 grow px-2 py-2">
      <CardContent class="gap-2 flex flex-col px-0">
        <NuxtLink :href="`/articles/${props.article.slug}`">
          <h3 class="font-bold text-sm line-clamp-2">
            {{ props.article.title }}
          </h3>
        </NuxtLink>
        <p class="text-xs flex items-center gap-2">
          <CalendarDays :size="10" />
          <span>{{ formatDateHumanize(props.article.publishedAt ?? "") }}</span>
        </p>
      </CardContent>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from "../ui/card/Card.vue";
import type { IStrapiArticle } from "~/types/strapi-article";
import { formatDateHumanize } from "~/utilities/data.util";
import { CalendarDays } from "lucide-vue-next";

const { getMediaUrl, getStrapiSrcSet } = useStrapi();

interface Props {
  article: IStrapiArticle;
}

const props = defineProps<Props>();
</script>
