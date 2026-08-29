<template>
  <Themed name="ArchitectureView" />
</template>

<script setup>
const title = "How This Site Is Built | Tyler Ingersoll";
const description =
  "The architecture of tyleringersoll.com: Nuxt 3 prerendering, a multi-theme design system, 100/100/100/100 Lighthouse scores, and a 99%-coverage test suite.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
