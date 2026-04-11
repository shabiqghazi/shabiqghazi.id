<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center gap-4">
      <p class="text-sm text-zinc-600">
        Kelola draft dan artikel terbit.
      </p>
      <Button as-child>
        <NuxtLink to="/admin/articles/new">Artikel baru</NuxtLink>
      </Button>
    </div>
    <div
      v-if="pending"
      class="text-sm text-zinc-500"
    >
      Memuat…
    </div>
    <div
      v-else-if="error"
      class="text-sm text-destructive"
    >
      Gagal memuat daftar.
    </div>
    <div v-else class="border border-zinc-200 rounded-lg bg-white overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-zinc-50 border-b border-zinc-200 text-left">
          <tr>
            <th class="p-3 font-medium">Judul</th>
            <th class="p-3 font-medium">Status</th>
            <th class="p-3 font-medium w-40">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="a in list"
            :key="a.id"
            class="border-b border-zinc-100 last:border-0"
          >
            <td class="p-3">
              <span class="font-medium">{{ a.title }}</span>
              <span class="block text-xs text-zinc-500">{{ a.slug }}</span>
            </td>
            <td class="p-3">
              <span
                class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                :class="
                  a.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-zinc-200 text-zinc-700'
                "
              >
                {{ a.status === "published" ? "Terbit" : "Draft" }}
              </span>
            </td>
            <td class="p-3">
              <Button variant="link" class="h-auto p-0 text-green-600" as-child>
                <NuxtLink :to="`/admin/articles/${a.id}`">Edit</NuxtLink>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import type { IBlogArticle, IBlogArticleCollection } from "~/types/blog";

definePageMeta({ layout: "admin" });

const { adminFetch } = useAdminApi();

const list = ref<IBlogArticle[]>([]);
const pending = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const res = await adminFetch<IBlogArticleCollection>("/api/admin/articles", {
      query: { page: 1, pageSize: 50 },
    });
    list.value = res.data;
  } catch {
    error.value = true;
  } finally {
    pending.value = false;
  }
});
</script>
