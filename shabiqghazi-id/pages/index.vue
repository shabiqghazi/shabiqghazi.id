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
import cover from "~/assets/images/hero-img.png";

const { setSeoData } = useSeo();
const { setBreadcrumbs, setPageTitle } = useBreadcrumb();
const breadcrumbs = [{ title: "Beranda", route: "/" }];

setSeoData({
  title: "Shabiq Ghazi Arkaan's Blog",
  description:
    "Blog pribadi Shabiq Ghazi Arkaan. Artikel tentang teknologi, edukasi, pengalaman, dan lainnya.",
  image: cover,
  breadcrumbs: breadcrumbs,
});
setPageTitle("Beranda");
setBreadcrumbs(breadcrumbs);
</script>
