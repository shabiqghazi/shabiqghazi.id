<template>
  <aside class="flex flex-col lg:w-sm gap-12">
    <div class="lg:px-8 flex flex-col gap-4">
      <p class="font-bold">Cari Artikel</p>
      <div class="flex w-full items-center gap-1.5">
        <form
          class="w-full relative"
          @submit.prevent="router.push(`/articles?search=${search}`)"
        >
          <Input
            v-model="search"
            id="keyword"
            type="text"
            placeholder="Cari..."
            class="rounded-xl border-neutral-400 h-12"
          />
          <span
            class="absolute end-0 inset-y-0 flex items-center justify-center px-1"
          >
            <button
              type="submit"
              class="bg-green-200 h-10 w-10 flex justify-center items-center rounded-lg hover:cursor-pointer hover:bg-green-300 active:bg-green-400"
            >
              <Search :size="16" class="text-green-700" />
            </button>
          </span>
        </form>
      </div>
    </div>
    <div class="lg:px-8 flex flex-col gap-4">
      <p class="font-bold">Artikel Terbaru</p>
      <template v-for="article in articles" :key="article.id">
        <base-sidebar-article :article="article" />
      </template>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { Input } from "../ui/input";
import type { IStrapiCollectionResponse } from "~/types/strapi";
import type { IStrapiArticle } from "~/types/strapi-article";

const search = ref<string>("");

const { data } = await useFetch<IStrapiCollectionResponse<IStrapiArticle>>(
  `/api/articles/latest`
);

const articles = computed(() => data.value?.data);

const router = useRouter();
</script>

<style></style>
