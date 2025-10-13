<template>
  <Head>
    <Title>{{ pageTitle }}</Title>
    <Meta name="description" :content="pageDescription" />
  </Head>
  <div>
    <BaseNavbar />
    <slot />
    <BaseFooter />
  </div>
</template>

<script setup>
const { pageTitle, pageDescription } = useBreadcrumb();
</script>
