<template>
  <Card class="py-0 overflow-clip border-0 shadow flex flex-row gap-3 h-full">
    <NuxtImg
      :src="getMediaUrl(props.article.cover.url)"
      :srcset="getStrapiSrcSet(props.article.cover.formats)"
      :alt="props.article.title"
      loading="lazy"
      class="aspect-square md:w-42 w-32 object-cover"
    />
    <div class="flex flex-col gap-3 justify-between">
      <CardContent class="px-3 pt-3 gap-2 flex flex-col">
        <p class="text-xs flex items-center gap-2">
          <CalendarDays :size="10" />
          <span>
            {{ formatDateHumanize(props.article.createdAt) }}
          </span>
        </p>
        <NuxtLink :href="`/articles/${props.article.slug}`">
          <h3 class="font-bold text-sm">
            {{ props.article.title }}
          </h3>
        </NuxtLink>
        <p
          class="text-sm md:line-clamp-3 line-clamp-2"
          v-clean-html-tag="props.article.body"
        ></p>
      </CardContent>
      <CardFooter class="px-0 pt-0 pb-3">
        <NuxtLink :href="`/articles/${props.article.slug}`" class="">
          <Button
            size="sm"
            variant="link"
            class="hover:cursor-pointer hover:text-green-400 text-green-500 text-xs h-fit py-1 flex hover:gap-2 items-center"
          >
            <span> Baca Selengkapnya </span>
            <ArrowRight :size="12" />
          </Button>
        </NuxtLink>
      </CardFooter>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from "../ui/card/Card.vue";
import CardFooter from "../ui/card/CardFooter.vue";
import Button from "../ui/button/Button.vue";
import { ArrowRight, CalendarDays } from "lucide-vue-next";
import type { IStrapiArticle } from "~/types/strapi-article";
import { formatDateHumanize } from "~/utilities/data.util";

const { getMediaUrl, getStrapiSrcSet } = useStrapi();

interface IProps {
  article: IStrapiArticle;
}

const props = defineProps<IProps>();
</script>

<style></style>
