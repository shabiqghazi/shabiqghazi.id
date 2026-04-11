<template>
  <div class="max-w-3xl space-y-6">
    <ArticleEditorForm
      :article-id="id"
      @saved="onSaved"
    />
    <div class="flex justify-end">
      <Button variant="destructive" :disabled="deleting" @click="remove">
        {{ deleting ? "Menghapus…" : "Hapus artikel" }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import ArticleEditorForm from "~/components/admin/ArticleEditorForm.vue";

definePageMeta({ layout: "admin" });

const route = useRoute();
const id = computed(() => String(route.params.id));
const { adminFetch } = useAdminApi();
const deleting = ref(false);

const onSaved = async () => {
  await navigateTo("/admin/articles");
};

async function remove() {
  if (!confirm("Hapus artikel ini?")) return;
  deleting.value = true;
  try {
    await adminFetch(`/api/admin/articles/${id.value}`, { method: "DELETE" });
    await navigateTo("/admin/articles");
  } catch {
    alert("Gagal menghapus.");
  } finally {
    deleting.value = false;
  }
}
</script>
