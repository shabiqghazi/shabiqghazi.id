<template>
  <Default>
    <base-page-title :page-title="pageTitle" :page-breadcrumbs="breadcrumbs" />
    <slot />
  </Default>
</template>

<script setup>
import Default from "./default.vue";

const { pageTitle, breadcrumbs } = useBreadcrumb();
</script>
