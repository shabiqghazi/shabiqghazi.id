<template>
  <div v-if="!allowed" class="text-sm text-zinc-600">Hanya super admin.</div>
  <div v-else class="border border-zinc-200 rounded-lg bg-white overflow-hidden max-w-2xl">
    <table class="w-full text-sm">
      <thead class="bg-zinc-50 border-b border-zinc-200 text-left">
        <tr>
          <th class="p-3 font-medium">Nama</th>
          <th class="p-3 font-medium">Email</th>
          <th class="p-3 font-medium">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="u in list"
          :key="u.id"
          class="border-b border-zinc-100 last:border-0"
        >
          <td class="p-3">{{ u.full_name || "—" }}</td>
          <td class="p-3 text-zinc-600">{{ u.email }}</td>
          <td class="p-3">
            <span class="text-xs rounded-full bg-zinc-100 px-2 py-0.5">{{ u.role }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="p-3 text-xs text-zinc-500 border-t border-zinc-100">
      User baru: buat di Supabase Authentication, lalu tambahkan baris di
      <code>profiles</code> dengan <code>id</code> sama dengan UUID auth user.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ICmsProfile } from "~/types/blog";

definePageMeta({ layout: "admin" });

const { adminFetch } = useAdminApi();
const allowed = ref(false);
const list = ref<
  { id: string; email: string | null; full_name: string; role: string }[]
>([]);

onMounted(async () => {
  try {
    const me = await adminFetch<{ profile: ICmsProfile }>("/api/admin/auth/me");
    allowed.value = me.profile.role === "super_admin";
    if (!allowed.value) return;
    const res = await adminFetch<{
      data: { id: string; email: string | null; full_name: string; role: string }[];
    }>("/api/admin/profiles");
    list.value = res.data;
  } catch {
    /* ignore */
  }
});
</script>
