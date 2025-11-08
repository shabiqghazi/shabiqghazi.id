<template>
  <main class="px-5 flex flex-col py-32 gap-20 lg:gap-0 items-center">
    <section
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex flex-col lg:flex-row lg:gap-0 gap-16"
    >
      <div class="grow flex flex-col gap-8">
        <p
          v-if="fetchParams.search"
          class="flex items-center gap-2 justify-center text-center mb-8"
        >
          <Search :size="14" />
          <span>Hasil pencarian untuk '{{ fetchParams.search }}'</span>
        </p>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
          <template v-if="pending">
            <div
              v-for="(_, value) in 3"
              class="flex flex-col space-y-3"
              :key="value"
            >
              <Skeleton class="h-[116px] rounded-xl" />
              <div class="space-y-2">
                <Skeleton class="h-4" />
                <Skeleton class="h-4" />
              </div>
            </div>
          </template>
          <template v-else>
            <template v-for="article in articles" :key="article.slug">
              <ArticleCard :article="article" />
            </template>
            <template v-if="articles.length < 1">
              <div class="md:col-span-3 flex flex-col items-center gap-8">
                <img class="flex max-w-36" :src="NotFoundImg" />
                <p class="font-semibold">Artikel tidak ditemukan</p>
              </div>
            </template>
          </template>
        </div>
        <Pagination
          v-if="articles.length > 0"
          v-slot="{ page }"
          :items-per-page="meta?.pagination.pageSize ?? 6"
          :total="meta?.pagination.total ?? 0"
          :default-page="fetchParams.page"
          @update:page="handlePageChange"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
            </template>

            <PaginationEllipsis :index="4" />

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
      <div class="flex flex-col">
        <BaseSidebar />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
import ArticleCard from "~/components/articles/ArticleCard.vue";
import type { IStrapiCollectionResponse } from "~/types/strapi";
import type { IStrapiArticle } from "~/types/strapi-article";
import NotFoundImg from "~/assets/images/not-found.svg";
import { Skeleton } from "~/components/ui/skeleton";

const route = useRoute();
const router = useRouter();
const { setBreadcrumbs, setPageTitle } = useBreadcrumb();
const { setSeoData } = useSeo();

const fetchParams = computed(() => ({
  page: parseInt((route.query.page as string) ?? "1"),
  pageSize: parseInt((route.query.pageSize as string) ?? "5"),
  search: route.query.search,
}));

const { data, pending } = useFetch<IStrapiCollectionResponse<IStrapiArticle>>(
  `/api/articles`,
  {
    query: fetchParams,
    key: `articles-list-page:${fetchParams.value.page}-pageSize:${fetchParams.value.pageSize}-search:${fetchParams.value.search}`,
    lazy: true,
    server: true,
    getCachedData: (key) =>
      useNuxtApp().payload.data[key] || useNuxtApp().static.data[key],
  }
);

// Handle pagination dengan refresh manual
const handlePageChange = async (page: number) => {
  await router.push(`?page=${page}`);
};

const articles = computed(() => data.value?.data ?? []);
const meta = computed(() => data.value?.meta);

const baseBreadcrumbs = [
  { title: "Beranda", route: "/" },
  { title: "Artikel", route: "/articles" },
];

const breadcrumbs = computed(() => {
  const pages = [...baseBreadcrumbs];

  if (fetchParams.value.search) {
    pages.push({
      title: `Hasil pencarian untuk '${fetchParams.value.search}'`,
      route: `/articles?search=${fetchParams.value.search}`,
    });
  }

  return pages;
});

setSeoData({
  title: "Artikel | Shabiq Ghazi Arkaan's Blog",
  description:
    "Daftar artikel terbaru tentang teknologi, edukasi, pengalaman, dan lainnya di blog pribadi Shabiq Ghazi Arkaan.",
  breadcrumbs: baseBreadcrumbs,
});
setPageTitle("Artikel");
watchEffect(() => {
  setBreadcrumbs(breadcrumbs.value);
});

definePageMeta({
  layout: "basic",
});
</script>
