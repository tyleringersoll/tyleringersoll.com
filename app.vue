<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const SITE_URL = "https://www.tyleringersoll.com";
const route = useRoute();
const canonicalPath = route.path.replace(/\/+$/, "") || "/";

useHead({
  link: [{ rel: "canonical", href: `${SITE_URL}${canonicalPath}` }],
});
</script>
