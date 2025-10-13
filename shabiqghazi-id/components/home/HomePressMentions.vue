<template>
  <div class="flex flex-col gap-10">
  <h2 class="font-bold text-white text-4xl text-center">What the Media Says</h2>
  <div class="flex justify-center gap-10">
    <Carousel
      class="relative w-full max-w-xl"
      :plugins="[
        Autoplay({
          delay: 2000,
        }),
      ]"
    >
      <CarouselContent>
        <CarouselItem v-for="(_, index) in 2" :key="index">
          <HomePressMentionItem />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="-left-4 md:-left-12" />
      <CarouselNext class="-right-4 md:-right-12" />
    </Carousel>
  </div>
  </div>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
</script>

<style></style>
