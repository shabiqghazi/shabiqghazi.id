<template>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center px-5 lg:pl-20 lg:pr-0 gap-20 relative overflow-clip py-32 lg:py-0"
  >
    <div class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white">
      <p class="leading-loose" data-aos="fade-up">
        Aku suka <strong class="font-semibold">memperhatikan</strong> segala
        hal,
        <strong class="font-semibold">merenungkan alam semesta</strong> dari
        sesuatu sekecil
        <strong class="font-semibold">partikel subatomik</strong> hingga seluas
        <strong class="font-semibold">galaksi</strong>, mencari jawaban atas
        pertanyaan-pertanyaan terkait
        <strong class="font-semibold">arti kehadiran manusia</strong>
        <span
          class="tooltip"
          data-tooltip="Tepi Lautan Kosmik - Konsep yang diperkenalkan oleh Carl Sagan untuk menggambarkan posisi kita dalam alam semesta yang luas dan tak terbatas."
        >
          di tepi <strong class="font-semibold">lautan kosmik</strong>
        </span>
        yang luas dan kosong ini. Blog ini adalah catatan
        <strong class="font-semibold">perjalanan panjangku</strong> dalam usaha
        untuk menemukan
        <strong class="font-semibold">jawaban-jawaban</strong> itu.
      </p>

      <div>
        <NuxtLink href="/about" prefetch data-aos="fade-up">
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

<style>
.tooltip {
  position: relative;
  color: white;
  border-radius: 6px;
  font: inherit;
}

.tooltip:hover {
  color: #34d399;
  cursor: pointer;
}

/* tooltip box */
.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 50%;
  width: 244px;
  display: flex;
  transform: translateX(-50%) translateY(-8px);
  bottom: 100%; /* tampil di atas elemen */
  background: rgba(20, 20, 20, 0.95);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 13px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 20;
}

/* tampilkan saat hover/focus */
.tooltip:hover::after,
.tooltip:focus::after {
  opacity: 1;
  transform: translateX(-50%) translateY(-12px);
}
</style>
