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
        id="open-sidebar"
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
            id="close-sidebar"
            class="hover:bg-neutral-200 p-1 hover:cursor-pointer active:bg-neutral-300"
          >
            <X @click="navOpen = false" />
          </button>
        </div>
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/about" class="nav-link" prefetch>Tentang</NuxtLink>
        <NuxtLink to="/articles" class="nav-link">Artikel</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link">Galeri</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" prefetch>Kontak</NuxtLink>
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
