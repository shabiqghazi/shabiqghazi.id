<template>
  <main class="px-5 flex flex-col py-32 items-center">
    <section class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full">
      <div class="grow flex flex-col gap-8">
        <div class="w-full sm:w-auto gap-1 flex flex-col">
          <Carousel
            class="relative w-full"
            @init-api="(val) => (emblaMainApi = val)"
            :plugins="[
              Autoplay({
                delay: 2000,
              }),
            ]"
          >
            <CarouselContent class="w-full m-0 flex gap-4">
              <CarouselItem
                v-for="photo in photos.slice(0, 3)"
                :key="photo.id"
                class="w-full p-0"
              >
                <div>
                  <Card class="p-0 overflow-clip">
                    <CardContent class="flex items-center justify-center p-0">
                      <NuxtImg
                        :src="getMediaUrl(photo.media.url)"
                        :srcset="getStrapiSrcSet(photo.media.formats)"
                        :alt="photo.title"
                        loading="lazy"
                        class="md:aspect-video aspect-square object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="-left-4" />
            <CarouselNext class="-right-4" />
          </Carousel>
        </div>
      </div>
    </section>
    <section class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full">
      <div class="flex flex-col lg:flex-row py-20 gap-20 lg:gap-0">
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <template v-for="photo in photos" :key="photo.id">
            <NuxtImg
              :src="getMediaUrl(photo.media.url)"
              :srcset="getStrapiSrcSet(photo.media.formats)"
              :alt="photo.title"
              loading="lazy"
              class="object-cover h-full w-full rounded-xl aspect-square overflow-clip"
            />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { CarouselApi } from "@/components/ui/carousel";
import { watchOnce } from "@vueuse/core";
import { ref } from "vue";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { IStrapiPhoto } from "~/types/strapi-photo";
import type { IStrapiCollectionResponse } from "~/types/strapi";

const { setBreadcrumbs, setPageTitle } = useBreadcrumb();

const { getMediaUrl, getStrapiSrcSet } = useStrapi();

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});

const { data } = useFetch<IStrapiCollectionResponse<IStrapiPhoto>>(
  `/api/photos`,
  {
    lazy: true,
    server: true,
    getCachedData: (key) =>
      useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  }
);

const photos = computed(() => data.value?.data ?? []);

const breadcrumbs = [
  { title: "Beranda", route: "/" },
  { title: "Galeri", route: "/gallery" },
];

setPageTitle("Galeri");
setBreadcrumbs(breadcrumbs);

definePageMeta({
  layout: "basic",
});
</script>
