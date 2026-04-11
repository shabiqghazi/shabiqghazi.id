import { randomUUID } from "node:crypto";

export default defineEventHandler(async (event) => {
  await requireAuthorOrAdmin(event);

  const form = await readMultipartFormData(event);
  if (!form?.length) {
    throw createError({ statusCode: 400, message: "File kosong" });
  }

  const file = form.find((f) => f.name === "file" && f.filename && f.data);
  if (!file?.filename || !file.data) {
    throw createError({ statusCode: 400, message: "Field file wajib" });
  }

  const ext = file.filename.includes(".")
    ? file.filename.slice(file.filename.lastIndexOf("."))
    : "";
  const path = `uploads/${randomUUID()}${ext}`;

  const supabase = useSupabaseAdmin();
  const { error: upErr } = await supabase.storage
    .from("media")
    .upload(path, file.data, {
      contentType: file.type ?? "application/octet-stream",
      upsert: false,
    });

  if (upErr) {
    throw createError({ statusCode: 500, message: upErr.message });
  }

  const { data: pub } = supabase.storage.from("media").getPublicUrl(path);

  return {
    success: 1,
    file: { url: pub.publicUrl },
  };
});
