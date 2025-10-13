<template>
  <div>
    <HomeFeatured />
    <HomeAbout />
    <HomeArticles />
  </div>
</template>

<script setup lang="ts">
import HomeAbout from "~/components/home/HomeAbout.vue";
import HomeArticles from "~/components/home/HomeArticles.vue";
import HomeFeatured from "~/components/home/HomeFeatured.vue";

const { setBreadcrumbs, setPageTitle } = useBreadcrumb();
const breadcrumbs = [{ title: "Beranda", route: "/" }];

setPageTitle("Shabiq Ghazi Arkaan");
setBreadcrumbs(breadcrumbs);
</script>
