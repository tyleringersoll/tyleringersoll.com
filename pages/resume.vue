<template>
  <Themed name="ResumeView" />
</template>

<script setup>
const title = "Resume | Tyler Ingersoll";
const description =
  "Tyler Ingersoll’s resume: 25+ years of frontend work, including design systems at Vanguard, instrument interfaces for Agilent, and managing an engineering team at Best Egg.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
