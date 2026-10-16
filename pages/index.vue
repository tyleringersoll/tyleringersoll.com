<template>
  <Themed name="HomeView" />
</template>

<script setup>
const title = "Tyler Ingersoll | Frontend Engineering Leader & Drummer";
const description =
  "Tyler Ingersoll is an engineering manager at Best Egg who leads a team and builds frontend applications. Explore his experience, projects, and drumming.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
