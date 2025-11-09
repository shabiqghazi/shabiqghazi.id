<template>
  <div
    class="fixed w-full top-0 flex justify-center bg-white/60 backdrop-blur-xl h-20 z-20 px-5 transition-all duration-500"
  >
    <nav
      id="navbar"
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full flex justify-between items-center"
    >
      <div class="font-light">
        <a href="/"
          ><span class="font-extrabold">shabiq</span>ghazi<span class="text-xs"
            >.id</span
          ></a
        >
      </div>
      <button
        type="button"
        id="open-sidebar"
        aria-label="Buka sidebar"
        class="md:hidden hover:bg-neutral-200 p-1 hover:cursor-pointer active:bg-neutral-300"
      >
        <Menu @click="navOpen = true" />
      </button>
      <div
        id="sidebar"
        class="flex flex-col md:flex-row md:justify-end md:items-center fixed md:static h-screen md:h-fit w-screen md:w-fit top-0 gap-8 md: md:bg-transparent md:p-0 px-5 transition-all font-light bg-white"
        :class="navOpen ? 'left-0' : 'left-full'"
      >
        <div class="flex justify-end items-center h-20 md:hidden">
          <button
            type="button"
            id="close-sidebar"
            aria-label="Tutup sidebar"
            class="hover:bg-neutral-200 p-1 hover:cursor-pointer active:bg-neutral-300"
          >
            <X @click="navOpen = false" />
          </button>
        </div>
        <NuxtLink to="/" class="hover:text-green-500">Beranda</NuxtLink>
        <NuxtLink to="/about" class="hover:text-green-500" prefetch>
          Tentang
        </NuxtLink>
        <NuxtLink to="/articles" class="hover:text-green-500">Artikel</NuxtLink>
        <NuxtLink to="/gallery" class="hover:text-green-500">Galeri</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-green-500" prefetch>
          <Button class="flex bg-black hover:cursor-pointer hover:bg-green-400">
            Hubungi Saya
          </Button>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";

const navOpen = ref<boolean>(false);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    navOpen.value = false;
  }
);
</script>
