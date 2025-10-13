<template>
  <blockquote class="w-full bg-neutral-200 p-5 rounded-xl">
    <p class="italic">
      {{ props.body }}
    </p>
  </blockquote>
</template>
<script setup lang="ts">
interface Props {
  title?: string;
  body: string;
}

const props = defineProps<Props>();
</script>
