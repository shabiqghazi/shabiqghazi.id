<template>
  <section id="footer" class="py-20 md:px-20 px-5 bg-neutral-800 text-white">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div class="flex flex-col items-start gap-4">
        <div class="font-light text-xl">
          <NuxtLink href="/">
            <span class="font-extrabold">shabiq</span>ghazi
            <span class="text-base">.id</span>
          </NuxtLink>
        </div>
        <div>
          <p class="italic text-neutral-400">Ad maiora natus sum</p>
        </div>
        <NuxtLink href="https://shabiqghazi.github.io" target="_blank">
          <Button
            class="bg-green-300 text-neutral-800 hover:cursor-pointer hover:bg-green-200"
          >
            <span>Lihat Situs Portfolio</span><Globe :size="16" />
          </Button>
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-lg font-bold">Tautan</p>
        <div class="flex flex-col gap-3 text-neutral-400">
          <NuxtLink href="/about">Tentang</NuxtLink>
          <NuxtLink href="/articles">Artikel</NuxtLink>
          <NuxtLink href="/gallery">Galeri</NuxtLink>
          <NuxtLink href="/contact">Kontak</NuxtLink>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-lg font-bold">Sosial</p>
        <div class="flex flex-col gap-3 text-neutral-400">
          <NuxtLink
            href="mailto:contact@shabiqghazi.id"
            target="_blank"
            class="flex items-center gap-2"
          >
            <Mail :size="16" /><span>contact@shabiqghazi.id</span>
          </NuxtLink>
          <NuxtLink
            href="https://instagram.com/shabiqghazi"
            target="_blank"
            class="flex items-center gap-2"
          >
            <Instagram :size="16" /><span>shabiqghazi</span>
          </NuxtLink>
          <NuxtLink
            href="https://linkedin.com/in/shabiqghazi"
            target="_blank"
            class="flex items-center gap-2"
          >
            <Linkedin :size="16" /><span>Shabiq Ghazi Arkaan</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Globe, Instagram, Linkedin, Mail } from "lucide-vue-next";
import Button from "../ui/button/Button.vue";
</script>

<style></style>
