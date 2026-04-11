import type { EditorJsData } from "~/types/blog";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ");
}

function flattenListItems(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  const out: string[] = [];
  for (const item of items) {
    if (typeof item === "string") out.push(item);
    else if (item && typeof item === "object" && "content" in item) {
      const c = (item as { content?: unknown }).content;
      if (typeof c === "string") out.push(c);
      else if (Array.isArray(c)) out.push(...flattenListItems(c));
    } else if (Array.isArray(item)) out.push(...flattenListItems(item));
  }
  return out;
}

export function editorJsToPlainText(
  data: EditorJsData | null | undefined
): string {
  if (!data?.blocks?.length) return "";
  const parts: string[] = [];
  for (const block of data.blocks) {
    const d = block.data ?? {};
    switch (block.type) {
      case "paragraph":
      case "header":
        parts.push(stripHtml(String((d as { text?: string }).text ?? "")));
        break;
      case "quote":
        parts.push(stripHtml(String((d as { text?: string }).text ?? "")));
        break;
      case "list":
        parts.push(
          flattenListItems((d as { items?: unknown }).items)
            .map((s) => stripHtml(s))
            .join(" ")
        );
        break;
      case "code":
        parts.push(String((d as { code?: string }).code ?? ""));
        break;
      default:
        break;
    }
  }
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

export function normalizeEditorData(
  raw: unknown
): EditorJsData {
  if (
    raw &&
    typeof raw === "object" &&
    Array.isArray((raw as EditorJsData).blocks)
  ) {
    return raw as EditorJsData;
  }
  return { blocks: [] };
}
