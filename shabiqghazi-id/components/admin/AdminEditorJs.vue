<template>
  <div>
    <div
      ref="holderEl"
      class="min-h-[280px] border border-border rounded-md bg-background px-3 py-2 prose prose-sm max-w-none"
    />
    <p v-if="loadError" class="text-sm text-destructive mt-2">{{ loadError }}</p>
  </div>
</template>

<script setup lang="ts">
import type { EditorJsData } from "~/types/blog";
import { normalizeEditorData } from "~/utilities/editorjs.util";

const props = withDefaults(
  defineProps<{
    modelValue: EditorJsData | null;
    placeholder?: string;
  }>(),
  { placeholder: "Mulai menulis…" }
);

const emit = defineEmits<{
  "update:modelValue": [value: EditorJsData];
}>();

const holderEl = ref<HTMLElement | null>(null);
const loadError = ref("");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let editor: any = null;

const { token, initTokenFromStorage } = useAdminToken();

async function uploadByFile(file: File) {
  initTokenFromStorage();
  const form = new FormData();
  form.append("file", file);
  const res = await $fetch<{ success: number; file: { url: string } }>(
    "/api/admin/upload",
    {
      method: "POST",
      body: form,
      headers: token.value
        ? { Authorization: `Bearer ${token.value}` }
        : undefined,
    }
  );
  return res;
}

onMounted(async () => {
  if (!holderEl.value) return;
  try {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;
    const Code = (await import("@editorjs/code")).default;
    const Image = (await import("@editorjs/image")).default;

    const initial = normalizeEditorData(props.modelValue);

    editor = new EditorJS({
      holder: holderEl.value,
      placeholder: props.placeholder,
      data: initial,
      tools: {
        header: {
          class: Header,
          config: { levels: [2, 3, 4], defaultLevel: 2 },
        },
        list: { class: List, inlineToolbar: true },
        quote: { class: Quote, inlineToolbar: true },
        delimiter: Delimiter,
        code: Code,
        image: {
          class: Image,
          config: {
            uploader: { uploadByFile },
          },
        },
      },
      onChange: async () => {
        if (!editor) return;
        const out = await editor.save();
        emit("update:modelValue", out as EditorJsData);
      },
    });
  } catch (e) {
    loadError.value =
      e instanceof Error ? e.message : "Gagal memuat editor";
    console.error(e);
  }
});

onBeforeUnmount(async () => {
  if (editor?.destroy) {
    await editor.destroy();
    editor = null;
  }
});
</script>
