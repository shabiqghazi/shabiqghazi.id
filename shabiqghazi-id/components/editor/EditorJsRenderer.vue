<template>
  <div class="editor-js-content [&>p]:mb-4 !leading-loose space-y-6">
    <template v-for="(block, i) in blocks" :key="i">
      <div v-if="block.type === 'paragraph'" v-html="safeHtml(text(block))" />

      <div
        v-else-if="block.type === 'header'"
        :class="headerClass(block)"
        role="heading"
        :aria-level="headerLevel(block)"
        v-html="safeHtml(text(block))"
      />

      <blockquote
        v-else-if="block.type === 'quote'"
        class="border-l-4 border-green-500 pl-4 italic text-muted-foreground"
      >
        <div v-html="safeHtml(quoteText(block))" />
        <cite v-if="quoteCaption(block)" class="block text-sm not-italic mt-2">
          {{ quoteCaption(block) }}
        </cite>
      </blockquote>

      <ul
        v-else-if="block.type === 'list' && listStyle(block) === 'unordered'"
        class="list-disc pl-6 space-y-1"
      >
        <li v-for="(item, j) in listItemsFlat(block)" :key="j" v-html="safeHtml(item)" />
      </ul>
      <ol
        v-else-if="block.type === 'list' && listStyle(block) === 'ordered'"
        class="list-decimal pl-6 space-y-1"
      >
        <li v-for="(item, j) in listItemsFlat(block)" :key="j" v-html="safeHtml(item)" />
      </ol>

      <pre
        v-else-if="block.type === 'code'"
        class="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto text-sm font-mono"
      ><code>{{ codeText(block) }}</code></pre>

      <figure v-else-if="block.type === 'image'" class="my-6">
        <img
          v-if="imageUrl(block)"
          :src="imageUrl(block)!"
          :alt="imageCaption(block) || ''"
          class="rounded-lg max-w-full h-auto mx-auto"
          loading="lazy"
        />
        <figcaption
          v-if="imageCaption(block)"
          class="text-center text-sm text-muted-foreground mt-2"
        >
          {{ imageCaption(block) }}
        </figcaption>
      </figure>

      <hr v-else-if="block.type === 'delimiter'" class="border-t border-border my-8" />
    </template>
  </div>
</template>

<script setup lang="ts">
import sanitizeHtml from "sanitize-html";
import type { EditorJsData } from "~/types/blog";

const props = defineProps<{
  data: EditorJsData | null | undefined;
}>();

const blocks = computed(() => props.data?.blocks ?? []);

const safeHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "br",
      "mark",
      "code",
      "kbd",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });

function text(block: { data?: Record<string, unknown> }) {
  return String(block.data?.text ?? "");
}

function headerLevel(block: { data?: Record<string, unknown> }) {
  const l = Number(block.data?.level ?? 2);
  if (l >= 1 && l <= 6) return l;
  return 2;
}

function headerClass(block: { data?: Record<string, unknown> }) {
  const l = headerLevel(block);
  if (l === 1) return "text-3xl font-bold mt-8 mb-4";
  if (l === 2) return "text-2xl font-semibold mt-6 mb-3";
  return "text-xl font-semibold mt-4 mb-2";
}

function quoteText(block: { data?: Record<string, unknown> }) {
  return String(block.data?.text ?? "");
}

function quoteCaption(block: { data?: Record<string, unknown> }) {
  const c = block.data?.caption;
  return c ? String(c) : "";
}

function listStyle(block: { data?: Record<string, unknown> }) {
  return block.data?.style === "ordered" ? "ordered" : "unordered";
}

function listItemsFlat(block: { data?: Record<string, unknown> }): string[] {
  const items = block.data?.items;
  if (!Array.isArray(items)) return [];
  const out: string[] = [];
  const walk = (arr: unknown[]) => {
    for (const x of arr) {
      if (typeof x === "string") out.push(x);
      else if (x && typeof x === "object" && "content" in x) {
        const c = (x as { content?: unknown }).content;
        if (typeof c === "string") out.push(c);
        else if (Array.isArray(c)) walk(c as unknown[]);
      } else if (Array.isArray(x)) walk(x);
    }
  };
  walk(items as unknown[]);
  return out;
}

function codeText(block: { data?: Record<string, unknown> }) {
  return String(block.data?.code ?? "");
}

function imageUrl(block: { data?: Record<string, unknown> }) {
  const f = block.data?.file;
  if (f && typeof f === "object" && "url" in f) {
    return String((f as { url?: string }).url ?? "");
  }
  return "";
}

function imageCaption(block: { data?: Record<string, unknown> }) {
  const c = block.data?.caption;
  return c ? String(c) : "";
}
</script>
