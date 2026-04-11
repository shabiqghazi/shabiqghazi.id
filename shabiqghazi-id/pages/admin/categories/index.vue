<template>
  <div v-if="!allowed" class="text-sm text-zinc-600">
    Hanya super admin.
  </div>
  <div v-else class="max-w-xl space-y-6">
    <form class="border border-zinc-200 rounded-lg p-4 bg-white space-y-3" @submit.prevent="add">
      <p class="text-sm font-medium">Kategori baru</p>
      <Input v-model="newName" placeholder="Nama" class="w-full" />
      <Input v-model="newSlug" placeholder="Slug (opsional)" class="w-full" />
      <Button type="submit" :disabled="adding">{{ adding ? "…" : "Tambah" }}</Button>
      <p v-if="err" class="text-sm text-destructive">{{ err }}</p>
    </form>
    <ul class="border border-zinc-200 rounded-lg bg-white divide-y divide-zinc-100">
      <li
        v-for="c in list"
        :key="c.id"
        class="p-3 flex justify-between gap-4 items-center text-sm"
      >
        <div>
          <span class="font-medium">{{ c.name }}</span>
          <span class="block text-xs text-zinc-500">{{ c.slug }}</span>
        </div>
        <Button variant="destructive" size="sm" @click="del(c.id)">
          Hapus
        </Button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import type { ICmsProfile } from "~/types/blog";

definePageMeta({ layout: "admin" });

const { adminFetch } = useAdminApi();
const allowed = ref(false);
const list = ref<{ id: string; name: string; slug: string }[]>([]);
const newName = ref("");
const newSlug = ref("");
const adding = ref(false);
const err = ref("");

async function refresh() {
  const me = await adminFetch<{ profile: ICmsProfile }>("/api/admin/auth/me");
  allowed.value = me.profile.role === "super_admin";
  if (!allowed.value) return;
  const res = await adminFetch<{ data: { id: string; name: string; slug: string }[] }>(
    "/api/admin/categories"
  );
  list.value = res.data;
}

onMounted(() => refresh().catch(() => {}));

async function add() {
  err.value = "";
  adding.value = true;
  try {
    await adminFetch("/api/admin/categories", {
      method: "POST",
      body: {
        name: newName.value,
        slug: newSlug.value || undefined,
      },
    });
    newName.value = "";
    newSlug.value = "";
    await refresh();
  } catch (e: unknown) {
    const x = e as { data?: { message?: string } };
    err.value = x.data?.message ?? "Gagal menambah.";
  } finally {
    adding.value = false;
  }
}

async function del(id: string) {
  if (!confirm("Hapus kategori?")) return;
  await adminFetch(`/api/admin/categories/${id}`, { method: "DELETE" });
  await refresh();
}
</script>
