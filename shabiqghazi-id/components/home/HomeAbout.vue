<template>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center relative overflow-clip py-32 lg:py-0"
  >
    <div
      class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white lg:px-20 px-5"
    >
      <p class="leading-loose" data-aos="fade-up">
        Aku suka <strong class="font-semibold">memperhatikan</strong> segala
        hal,
        <strong class="font-semibold">merenungkan alam semesta</strong> dari
        sesuatu sekecil
        <strong class="font-semibold">partikel subatomik</strong> hingga seluas
        <strong class="font-semibold">galaksi</strong>, mencari jawaban atas
        pertanyaan-pertanyaan terkait
        <strong class="font-semibold">arti kehadiran manusia di </strong>
        <span
          class="tooltip"
          data-tooltip="Tepi Lautan Kosmik - Konsep yang diperkenalkan oleh Carl Sagan untuk menggambarkan posisi kita dalam alam semesta yang luas dan tak terbatas."
        >
          tepi <strong class="font-semibold">lautan kosmik</strong>
        </span>
        yang luas dan kosong ini.
      </p>
    </div>
    <figure
      class="absolute lg:static right-0 bottom-0 top-0 left-0 flex flex-col items-center lg:aspect-[5/4]"
    >
      <img
        :src="homeAbout2"
        alt=""
        class="w-full h-full object-cover brightness-50 lg:brightness-50"
      />
    </figure>
  </div>
  <div
    class="bg-neutral-800 grid grid-cols-1 lg:grid-cols-2 items-center relative overflow-clip py-32 lg:py-0"
  >
    <figure
      class="absolute lg:static right-0 bottom-0 top-0 left-0 flex flex-col items-center lg:aspect-[5/4]"
    >
      <img
        :src="homeAbout1"
        alt=""
        class="w-full h-full object-cover brightness-50 lg:brightness-50"
      />
    </figure>
    <div
      class="flex flex-col lg:pb-0 gap-8 font-light z-10 text-white lg:px-20 px-5"
    >
      <p class="leading-loose" data-aos="fade-up">
        Menjadi <strong class="font-semibold">sendirian</strong> adalah
        <strong class="font-semibold">energiku</strong>. Terkadang, untuk
        <strong class="font-semibold">memahami alam semesta</strong>, kita perlu
        <strong class="font-semibold">menjauh dari keramaian</strong>, mencoba
        <strong class="font-semibold">menyendiri</strong> dalam
        <strong class="font-semibold">keheningan</strong> untuk mendengar
        <strong class="font-semibold">bisikannya</strong>, yang memberitahukan
        <strong class="font-semibold">jawaban</strong> atas mengapa di tengah
        <strong class="font-semibold">alam yang luas</strong> ini
        <strong class="font-semibold">manusia</strong> hadir sebagai
        <strong class="font-semibold">makhluk yang sangat kecil</strong>.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import homeAbout1 from "~/assets/images/home-about2.webp";
import homeAbout2 from "~/assets/images/home-about3.webp";
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
