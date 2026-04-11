<template>
  <div class="space-y-6">
    <div v-if="loading" class="text-sm text-zinc-500">Memuat…</div>
    <template v-else>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2 sm:col-span-2">
          <label class="text-sm font-medium">Judul</label>
          <Input v-model="title" class="w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Slug</label>
          <Input v-model="slug" class="w-full" placeholder="otomatis dari judul jika kosong" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Kategori</label>
          <select
            v-model="categoryId"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          >
            <option value="">— Tanpa kategori —</option>
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >
              {{ c.name }}
            </option>
          </select>
        </div>
        <div class="space-y-2 sm:col-span-2">
          <label class="text-sm font-medium">Ringkasan (meta / kartu artikel)</label>
          <textarea
            v-model="description"
            rows="3"
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div class="space-y-2 sm:col-span-2">
          <label class="text-sm font-medium">Sampul (URL publik)</label>
          <div class="flex gap-2">
            <Input v-model="coverUrl" class="flex-1" placeholder="https://..." />
            <input
              ref="coverFileRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onCoverFile"
            />
            <Button type="button" variant="outline" @click="coverFileRef?.click()">
              Unggah
            </Button>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Status</label>
          <select
            v-model="status"
            class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Terbit</option>
          </select>
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-sm font-medium">Isi (Editor.js)</label>
        <ClientOnly>
          <AdminEditorJs v-model="body" />
          <template #fallback>
            <div class="min-h-[200px] border rounded-md p-4 text-sm text-zinc-500">
              Memuat editor…
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="border border-zinc-200 rounded-lg p-4 space-y-3 bg-white">
        <p class="text-sm font-medium">SEO</p>
        <div class="space-y-2">
          <label class="text-xs text-zinc-500">Meta title</label>
          <Input v-model="metaTitle" class="w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-xs text-zinc-500">Meta description</label>
          <textarea
            v-model="metaDescription"
            rows="2"
            class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
          />
        </div>
        <div class="space-y-2">
          <label class="text-xs text-zinc-500">Meta keywords</label>
          <Input v-model="metaKeywords" class="w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-xs text-zinc-500">Gambar share (og:image URL)</label>
          <Input v-model="ogImageUrl" class="w-full" />
        </div>
      </div>

      <p v-if="formError" class="text-sm text-destructive">{{ formError }}</p>
      <div class="flex gap-2">
        <Button :disabled="saving" @click="save">
          {{ saving ? "Menyimpan…" : "Simpan" }}
        </Button>
        <Button variant="outline" type="button" as-child>
          <NuxtLink to="/admin/articles">Batal</NuxtLink>
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import AdminEditorJs from "~/components/admin/AdminEditorJs.vue";
import type { EditorJsData, IBlogArticle } from "~/types/blog";
import { normalizeEditorData } from "~/utilities/editorjs.util";

const props = defineProps<{
  articleId?: string | null;
}>();

const emit = defineEmits<{
  saved: [id: string];
}>();

const { adminFetch } = useAdminApi();

const loading = ref(!!props.articleId);
const saving = ref(false);
const formError = ref("");
const coverFileRef = ref<HTMLInputElement | null>(null);

const title = ref("");
const slug = ref("");
const description = ref("");
const categoryId = ref("");
const coverUrl = ref("");
const status = ref<"draft" | "published">("draft");
const body = ref<EditorJsData>({ blocks: [] });
const metaTitle = ref("");
const metaDescription = ref("");
const metaKeywords = ref("");
const ogImageUrl = ref("");

const categories = ref<
  { id: string; name: string; slug: string }[]
>([]);

async function loadCategories() {
  const res = await adminFetch<{ data: { id: string; name: string; slug: string }[] }>(
    "/api/admin/categories"
  );
  categories.value = res.data;
}

async function loadArticle() {
  if (!props.articleId) return;
  const a = await adminFetch<IBlogArticle>(
    `/api/admin/articles/${props.articleId}`
  );
  title.value = a.title;
  slug.value = a.slug;
  description.value = a.description ?? "";
  categoryId.value = a.category?.id ?? "";
  coverUrl.value = a.cover?.url ?? "";
  status.value = a.status === "published" ? "published" : "draft";
  body.value = normalizeEditorData(a.body);
  metaTitle.value = a.seo.metaTitle ?? "";
  metaDescription.value = a.seo.metaDescription ?? "";
  metaKeywords.value = a.seo.metaKeywords ?? "";
  ogImageUrl.value = a.seo.shareImage?.url ?? "";
}

onMounted(async () => {
  try {
    await loadCategories();
    if (props.articleId) {
      await loadArticle();
    }
  } catch (e) {
    formError.value = "Gagal memuat data.";
    console.error(e);
  } finally {
    loading.value = false;
  }
});

async function onCoverFile(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  formError.value = "";
  try {
    const form = new FormData();
    form.append("file", file);
    const { token, initTokenFromStorage } = useAdminToken();
    initTokenFromStorage();
    const res = await $fetch<{ file: { url: string } }>("/api/admin/upload", {
      method: "POST",
      body: form,
      headers: token.value
        ? { Authorization: `Bearer ${token.value}` }
        : undefined,
    });
    coverUrl.value = res.file.url;
  } catch {
    formError.value = "Unggah sampul gagal.";
  }
  input.value = "";
}

async function save() {
  formError.value = "";
  saving.value = true;
  try {
    const payload = {
      title: title.value,
      slug: slug.value || undefined,
      description: description.value || null,
      body: body.value,
      cover_url: coverUrl.value || null,
      category_id: categoryId.value || null,
      status: status.value,
      meta_title: metaTitle.value || null,
      meta_description: metaDescription.value || null,
      meta_keywords: metaKeywords.value || null,
      og_image_url: ogImageUrl.value || null,
    };
    if (props.articleId) {
      await adminFetch(`/api/admin/articles/${props.articleId}`, {
        method: "PATCH",
        body: payload,
      });
      emit("saved", props.articleId);
    } else {
      const created = await adminFetch<IBlogArticle>("/api/admin/articles", {
        method: "POST",
        body: payload,
      });
      emit("saved", created.id);
    }
  } catch (e: unknown) {
    const err = e as { data?: { message?: string }; message?: string };
    formError.value =
      err.data?.message ?? err.message ?? "Gagal menyimpan.";
  } finally {
    saving.value = false;
  }
}
</script>
