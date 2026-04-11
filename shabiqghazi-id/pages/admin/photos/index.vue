<template>
  <div v-if="!allowed" class="text-sm text-zinc-600">Hanya super admin.</div>
  <div v-else class="space-y-6 max-w-2xl">
    <form
      class="border border-zinc-200 rounded-lg p-4 bg-white space-y-3"
      @submit.prevent="add"
    >
      <p class="text-sm font-medium">Foto baru</p>
      <Input v-model="title" placeholder="Judul" class="w-full" />
      <Input v-model="mediaUrl" placeholder="URL gambar (atau unggah)" class="w-full" />
      <input
        ref="fileRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFile"
      />
      <Button type="button" variant="outline" size="sm" @click="fileRef?.click()">
        Unggah file
      </Button>
      <Button type="submit" :disabled="adding">{{ adding ? "…" : "Simpan" }}</Button>
      <p v-if="err" class="text-sm text-destructive">{{ err }}</p>
    </form>
    <ul class="space-y-2 text-sm">
      <li
        v-for="p in list"
        :key="p.id"
        class="flex justify-between gap-2 border border-zinc-200 rounded-md p-2 bg-white items-center"
      >
        <span>{{ p.title }}</span>
        <Button variant="destructive" size="sm" @click="del(p.id)">Hapus</Button>
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
const { token, initTokenFromStorage } = useAdminToken();
const allowed = ref(false);
const list = ref<{ id: string; title: string }[]>([]);
const title = ref("");
const mediaUrl = ref("");
const fileRef = ref<HTMLInputElement | null>(null);
const adding = ref(false);
const err = ref("");

async function refresh() {
  const me = await adminFetch<{ profile: ICmsProfile }>("/api/admin/auth/me");
  allowed.value = me.profile.role === "super_admin";
  if (!allowed.value) return;
  const res = await adminFetch<{ data: { id: string; title: string }[] }>(
    "/api/admin/photos"
  );
  list.value = res.data;
}

onMounted(() => refresh().catch(() => {}));

async function onFile(ev: Event) {
  const f = (ev.target as HTMLInputElement).files?.[0];
  if (!f) return;
  initTokenFromStorage();
  const form = new FormData();
  form.append("file", f);
  const res = await $fetch<{ file: { url: string } }>("/api/admin/upload", {
    method: "POST",
    body: form,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
  });
  mediaUrl.value = res.file.url;
  (ev.target as HTMLInputElement).value = "";
}

async function add() {
  err.value = "";
  if (!title.value.trim() || !mediaUrl.value.trim()) {
    err.value = "Judul dan URL wajib.";
    return;
  }
  adding.value = true;
  try {
    await adminFetch("/api/admin/photos", {
      method: "POST",
      body: { title: title.value.trim(), media_url: mediaUrl.value.trim() },
    });
    title.value = "";
    mediaUrl.value = "";
    await refresh();
  } catch {
    err.value = "Gagal menyimpan.";
  } finally {
    adding.value = false;
  }
}

async function del(id: string) {
  if (!confirm("Hapus foto?")) return;
  await adminFetch(`/api/admin/photos/${id}`, { method: "DELETE" });
  await refresh();
}
</script>
