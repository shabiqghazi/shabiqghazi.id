<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 flex">
    <aside
      class="w-56 shrink-0 border-r border-zinc-200 bg-white flex flex-col"
    >
      <div class="p-4 border-b border-zinc-200 font-semibold tracking-tight">
        CMS
      </div>
      <nav class="flex flex-col p-2 gap-0.5 text-sm">
        <NuxtLink
          to="/admin/articles"
          class="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          active-class="bg-zinc-100 font-medium text-zinc-900"
        >
          Artikel
        </NuxtLink>
        <NuxtLink
          v-if="profile?.role === 'super_admin'"
          to="/admin/categories"
          class="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          active-class="bg-zinc-100 font-medium text-zinc-900"
        >
          Kategori
        </NuxtLink>
        <NuxtLink
          v-if="profile?.role === 'super_admin'"
          to="/admin/photos"
          class="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          active-class="bg-zinc-100 font-medium text-zinc-900"
        >
          Galeri
        </NuxtLink>
        <NuxtLink
          v-if="profile?.role === 'super_admin'"
          to="/admin/about"
          class="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          active-class="bg-zinc-100 font-medium text-zinc-900"
        >
          Halaman Tentang
        </NuxtLink>
        <NuxtLink
          v-if="profile?.role === 'super_admin'"
          to="/admin/users"
          class="rounded-md px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          active-class="bg-zinc-100 font-medium text-zinc-900"
        >
          Pengguna
        </NuxtLink>
      </nav>
      <div class="mt-auto p-3 border-t border-zinc-200">
        <NuxtLink
          to="/"
          class="text-xs text-zinc-500 hover:text-zinc-800 block mb-2"
        >
          ← Lihat situs
        </NuxtLink>
        <Button variant="outline" size="sm" class="w-full" @click="logout">
          Keluar
        </Button>
      </div>
    </aside>
    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="h-14 shrink-0 border-b border-zinc-200 bg-white flex items-center justify-between px-6"
      >
        <h1 class="text-sm font-medium text-zinc-800">
          {{ title }}
        </h1>
        <div class="text-xs text-zinc-500">
          <span v-if="profile">{{ profile.full_name || profile.email }}</span>
          <span v-if="profile" class="text-zinc-400"> · {{ profile.role }}</span>
        </div>
      </header>
      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import type { ICmsProfile } from "~/types/blog";

const route = useRoute();
const { adminFetch } = useAdminApi();
const { setToken } = useAdminToken();

const profile = ref<ICmsProfile | null>(null);

const title = computed(() => {
  const p = route.path;
  if (p === "/admin/articles" || p.startsWith("/admin/articles/")) {
    return "Artikel";
  }
  if (p.startsWith("/admin/categories")) return "Kategori";
  if (p.startsWith("/admin/photos")) return "Galeri";
  if (p.startsWith("/admin/about")) return "Halaman Tentang";
  if (p.startsWith("/admin/users")) return "Pengguna";
  return "Panel";
});

onMounted(async () => {
  try {
    const r = await adminFetch<{ profile: ICmsProfile }>("/api/admin/auth/me");
    profile.value = r.profile;
  } catch {
    setToken(null);
    await navigateTo("/admin/login");
  }
});

async function logout() {
  setToken(null);
  await navigateTo("/admin/login");
}
</script>
