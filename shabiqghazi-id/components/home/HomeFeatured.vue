<template>
  <section
    id="home-featured"
    class="relative min-h-screen bg-dark py-20 px-5 flex justify-center items-center"
  >
    <div
      class="md:max-w-3xl lg:max-w-4xl xl:max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 h-full"
    >
      <div
        class="flex flex-col items-center md:items-end justify-center md:order-2"
      >
        <figure>
          <img
            :src="featuredImage"
            alt=""
            class="w-72 md:w-72 lg:w-96 h-72 md:h-72 lg:h-96 rounded-full"
          />
        </figure>
      </div>
      <div
        class="flex flex-col gap-6 lg:gap-8 justify-center md:order-1 text-center items-center md:text-left md:items-start"
      >
        <p
          class="leading-16 lg:leading-20 scroll-m-20 text-4xl tracking-tight lg:text-5xl font-light"
        >
          Halo, saya<br />
          <strong class="font-extrabold"> Shabiq Ghazi Arkaan </strong>
        </p>
        <p class="text-xl font-light italic">📖Belajar 🤔Merenung ✍️Menulis</p>
        <div>
          <NuxtLink href="/contact" class="">
            <Button
              variant="outline"
              size="lg"
              class="border border-black flex gap-2 hover:gap-3 hover:cursor-pointer hover:bg-green-300 transition-all duration-200"
            >
              <span>Hubungi Saya</span>
              <ArrowRight :size="16" />
            </Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import featuredImage from "~/assets/images/hero-img.webp";
</script>
