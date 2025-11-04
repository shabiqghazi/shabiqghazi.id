<template>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:pl-20 lg:pr-0 gap-20 relative overflow-clip py-32 lg:py-0"
  >
    <div class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white">
      <p class="font-bold">Tentang saya</p>
      <p class="leading-loose">
        Aku berusaha menjalani hidup dengan
        <strong class="font-semibold">kesadaran dan arah yang jelas</strong>.
        Bagiku, belajar bukan sekadar mencari jawaban ,
        <strong class="font-semibold">tapi memahami prosesnya </strong>. Aku
        ingin terus berkembang, berpikir jernih, dan
        <strong class="font-semibold">membangun hal-hal yang bermanfaat</strong>
        . Baik untuk diriku sendiri maupun untuk lingkungan tempat aku tumbuh.
      </p>
      <div>
        <NuxtLink href="/about">
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
    <div
      class="absolute lg:static right-0 bottom-0 top-0 left-0 flex flex-col items-center"
    >
      <img
        :src="homeAbout"
        alt=""
        class="w-full h-full object-cover brightness-50 lg:brightness-50"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import homeAbout from "~/assets/images/home-about.jpeg";
</script>

<style></style>
