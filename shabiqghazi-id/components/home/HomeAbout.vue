<template>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:pl-20 lg:pr-0 gap-20 relative overflow-clip py-32 lg:py-0"
  >
    <div class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white">
      <p class="font-bold">Tentang saya</p>
      <p class="leading-loose">
        <strong class="font-semibold">Saya bukan siapa-siapa</strong>, saya
        hanya yang ingin menjadi lebih baik dari hari kemarin. Saya percaya
        <strong class="font-semibold">pertumbuhan lahir dari keheningan</strong
        >, bukan kebisingan. Situs ini saya buat hanya untuk menyimpan hal-hal
        yang <strong class="font-semibold">tidak ingin saya lupakan</strong>.
      </p>
      <div>
        <NuxtLink href="/about">
          <Button
            variant="default"
            size="lg"
            class="flex gap-2 hover:gap-3 bg-white text-black hover:cursor-pointer hover:bg-green-300 hover:text-black border border-neutral-300 transition-all duration-200"
          >
            <span>More About Me</span>
          </Button>
        </NuxtLink>
      </div>
    </div>
    <div
      class="absolute lg:static right-0 bottom-0 top-0 left-0 flex flex-col items-center"
    >
      <img :src="homeAbout" alt="" class="w-full h-full object-cover brightness-50 lg:brightness-50" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import homeAbout from "~/assets/images/home-about.jpeg";
</script>

<style></style>
