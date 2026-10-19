<template>
  <Themed name="HomeView" />
</template>

<script setup>
const title = "Tyler Ingersoll | Frontend Engineering Leader & Drummer";
const description =
  "Tyler Ingersoll is an engineering manager at Best Egg who still writes frontend code. He’s also played drums for more than 30 years.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
