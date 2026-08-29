<template>
  <Themed name="ResumeView" />
</template>

<script setup>
const title = "Resume | Tyler Ingersoll — Frontend Engineering Leader";
const description =
  "25+ years across frontend architecture, design systems, and engineering leadership: Best Egg, Vanguard, Agilent, and enterprise agency work.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
