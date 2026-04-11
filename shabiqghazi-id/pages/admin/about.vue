<template>
  <div v-if="!allowed" class="text-sm text-zinc-600">Hanya super admin.</div>
  <div v-else class="max-w-3xl space-y-6">
    <div class="space-y-2">
      <label class="text-sm font-medium">Judul halaman</label>
      <Input v-model="pageTitle" class="w-full" />
    </div>
    <div class="space-y-2">
      <label class="text-sm font-medium">Konten</label>
      <ClientOnly>
        <AdminEditorJs v-model="content" />
        <template #fallback>
          <div class="min-h-[160px] border rounded-md p-4 text-sm text-zinc-500">
            Memuat editor…
          </div>
        </template>
      </ClientOnly>
    </div>
    <div class="border border-zinc-200 rounded-lg p-4 space-y-3 bg-white">
      <p class="text-sm font-medium">SEO</p>
      <Input v-model="metaTitle" placeholder="Meta title" class="w-full" />
      <textarea
        v-model="metaDescription"
        placeholder="Meta description"
        rows="2"
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
      />
      <Input v-model="metaKeywords" placeholder="Keywords" class="w-full" />
      <Input v-model="ogImageUrl" placeholder="og:image URL" class="w-full" />
    </div>
    <p v-if="err" class="text-sm text-destructive">{{ err }}</p>
    <Button :disabled="saving" @click="save">{{ saving ? "…" : "Simpan" }}</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import AdminEditorJs from "~/components/admin/AdminEditorJs.vue";
import type { EditorJsData, ICmsProfile } from "~/types/blog";
import { normalizeEditorData } from "~/utilities/editorjs.util";

definePageMeta({ layout: "admin" });

const { adminFetch } = useAdminApi();
const allowed = ref(false);
const pageTitle = ref("");
const content = ref<EditorJsData>({ blocks: [] });
const metaTitle = ref("");
const metaDescription = ref("");
const metaKeywords = ref("");
const ogImageUrl = ref("");
const saving = ref(false);
const err = ref("");

onMounted(async () => {
  try {
    const me = await adminFetch<{ profile: ICmsProfile }>("/api/admin/auth/me");
    allowed.value = me.profile.role === "super_admin";
    if (!allowed.value) return;
    const row = await adminFetch<{
      title: string;
      content: unknown;
      meta_title: string | null;
      meta_description: string | null;
      meta_keywords: string | null;
      og_image_url: string | null;
    }>("/api/admin/about");
    pageTitle.value = row.title;
    content.value = normalizeEditorData(row.content);
    metaTitle.value = row.meta_title ?? "";
    metaDescription.value = row.meta_description ?? "";
    metaKeywords.value = row.meta_keywords ?? "";
    ogImageUrl.value = row.og_image_url ?? "";
  } catch {
    err.value = "Gagal memuat.";
  }
});

async function save() {
  err.value = "";
  saving.value = true;
  try {
    await adminFetch("/api/admin/about", {
      method: "PATCH",
      body: {
        title: pageTitle.value,
        content: content.value,
        meta_title: metaTitle.value || null,
        meta_description: metaDescription.value || null,
        meta_keywords: metaKeywords.value || null,
        og_image_url: ogImageUrl.value || null,
      },
    });
  } catch {
    err.value = "Gagal menyimpan.";
  } finally {
    saving.value = false;
  }
}
</script>
