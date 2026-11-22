<template>
  <Themed name="ArchitectureView" />
</template>

<script setup>
const title = "How This Site Is Built | Tyler Ingersoll";
const description =
  "How tyleringersoll.com is built: prerendered Nuxt pages, two themes on shared design tokens, a Storybook component workshop, and Lighthouse and accessibility checks in CI.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
