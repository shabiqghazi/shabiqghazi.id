<template>
  <div class="max-w-3xl space-y-6">
    <ArticleEditorForm @saved="onSaved" />
  </div>
</template>

<script setup lang="ts">
import ArticleEditorForm from "~/components/admin/ArticleEditorForm.vue";

definePageMeta({ layout: "admin" });

const onSaved = async (id: string) => {
  await navigateTo(`/admin/articles/${id}`);
};
</script>
