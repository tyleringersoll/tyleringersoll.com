<template>
  <Themed name="SlugView" />
</template>

<script setup>
// Every real page has its own route, so anything that lands here is a 404.
const event = useRequestEvent();
if (event) setResponseStatus(event, 404, "Page Not Found");

useSeoMeta({
  title: "Page Not Found | Tyler Ingersoll",
  robots: "noindex",
});
</script>
