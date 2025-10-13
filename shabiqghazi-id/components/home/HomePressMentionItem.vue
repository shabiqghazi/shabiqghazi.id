<template>
  <div class="grid-rows-2">
    <Card class="grid grid-cols-5 gap-0 py-0 overflow-clip border-black/50">
      <img
        :src="pressMentionItem"
        alt=""
        class="h-full w-full object-left object-cover col-span-2"
      />
      <CardContent class="flex flex-col col-span-3 px-6 py-4 gap-4">
        <div class="flex flex-col gap-4 grow">
          <h3 class="text-sm font-bold">
            Tunjukkan! Alumni UIN Bandung Sanggup menjadi Generasi Emas
            Indonesia 2045
          </h3>
          <p class="text-xs">
            UIN Bandung memberikan anugerah Adhi Djati Utama kepada wisudawan
            terbaik Shabiq Ghazi Arkaan, ST, alumnus Program Studi Teknik
            Informatika ...
          </p>
        </div>
        <NuxtLink
          href="https://kanal31.com/tunjukkan-alumni-uin-bandung-sanggup-menjadi-generasi-emas-indonesia-2045/"
          target="_blank"
        >
          <Button
            size="sm"
            variant="outline"
            class="hover:cursor-pointer hover:bg-green-300 border-black border"
          >
            Go to site
            <SquareArrowOutUpRight :size="14" />
          </Button>
        </NuxtLink>
      </CardContent>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { SquareArrowOutUpRight } from "lucide-vue-next";
import { Button } from "../ui/button";
import Card from "../ui/card/Card.vue";
import pressMentionItem from "~/assets/images/press-mention-item.jpg";
</script>

<style></style>
