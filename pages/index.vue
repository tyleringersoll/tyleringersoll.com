<template>
  <Themed name="HomeView" />
</template>

<script setup>
const title = "Tyler Ingersoll | Frontend Engineering Leader & Drummer";
const description =
  "Tyler Ingersoll leads frontend engineering teams building enterprise fintech applications, and has spent three decades as a touring and session drummer.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
