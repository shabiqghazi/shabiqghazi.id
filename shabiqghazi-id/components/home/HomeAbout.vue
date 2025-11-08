<template>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:pl-20 lg:pr-0 gap-20 relative overflow-clip py-32 lg:py-0"
  >
    <div class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white">
      <p class="font-bold">Tentang saya</p>
      <p class="leading-loose">
        Aku suka <strong class="font-semibold">memperhatikan</strong> segala
        hal,
        <strong class="font-semibold">merenungkan alam semesta</strong> dari
        sesuatu sekecil
        <strong class="font-semibold">partikel subatomik</strong> hingga seluas
        <strong class="font-semibold">galaksi</strong>, mencari jawaban atas
        pertanyaan-pertanyaan terkait
        <strong class="font-semibold">arti kehadiran manusia</strong> di tepi
        <strong class="font-semibold">lautan kosmik</strong> yang luas ini. Blog
        ini adalah catatan
        <strong class="font-semibold">perjalanan panjangku</strong> dalam usaha
        untuk menemukan
        <strong class="font-semibold">jawaban-jawaban</strong> itu.
      </p>

      <div>
        <NuxtLink href="/about" prefetch>
          <Button
            variant="default"
            size="lg"
            class="flex gap-2 hover:gap-3 bg-white text-black hover:cursor-pointer hover:bg-green-300 hover:text-black border border-neutral-300 transition-all duration-200"
          >
            <span>Selengkapnya</span>
          </Button>
        </NuxtLink>
      </div>
    </div>
    <figure
      class="absolute lg:static right-0 bottom-0 top-0 left-0 flex flex-col items-center lg:aspect-square"
    >
      <img
        :src="homeAbout"
        alt=""
        class="w-full h-full object-cover brightness-50 lg:brightness-50"
      />
    </figure>
  </div>
</template>

<script lang="ts" setup>
import homeAbout from "~/assets/images/home-about2.webp";
</script>

<style></style>
