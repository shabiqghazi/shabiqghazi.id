import { mapPhotoRow, type PhotoRowDb } from "~/server/utils/blog-mappers";

export default defineEventHandler(async () => {
  const supabase = useSupabaseAdmin();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusCode: 500, message: error.message });
  }

  const rows = (data ?? []) as PhotoRowDb[];

  return {
    data: rows.map((row) => mapPhotoRow(row)),
  };
});
