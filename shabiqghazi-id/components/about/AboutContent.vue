<template>
  <div class="flex flex-col gap-8">
    <template v-for="block in props.blocks" :key="block.id">
      <template v-if="block.__component === IStrapiBlockComponent.TEXT">
        <div
          class="[&>p]:mb-4 ck-content !leading-loose"
          v-sanitize-html="(block as IStrapiTextBlock).body"
        ></div>
      </template>
      <template v-if="block.__component === IStrapiBlockComponent.QUOTE">
        <BaseQuote
          :title="(block as IStrapiQuoteBlock).title"
          :body="(block as IStrapiQuoteBlock).body"
        />
      </template>
      <template v-if="block.__component === IStrapiBlockComponent.IMAGE">
        <NuxtImg
          :src="getMediaUrl((block as IStrapiImageBlock).file.url)"
          :srcset="getMediaUrl((block as IStrapiImageBlock).file.url)"
          :alt="(block as IStrapiImageBlock).file.alternativeText"
          loading="lazy"
          class="aspect-square object-cover"
          :height="(block as IStrapiImageBlock).file.height"
          :width="(block as IStrapiImageBlock).file.width"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {
  IStrapiBlock,
  IStrapiImageBlock,
  IStrapiQuoteBlock,
  IStrapiTextBlock,
} from "~/types/strapi";
import BaseQuote from "../base/BaseQuote.vue";

interface Props {
  blocks?: IStrapiBlock[];
}

enum IStrapiBlockComponent {
  TEXT = "shared.ck-editor",
  IMAGE = "shared.media",
  QUOTE = "shared.quote",
}

const { getMediaUrl } = useStrapi();

const props = defineProps<Props>();
</script>
