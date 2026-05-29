<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const SITE_URL = "https://www.tyleringersoll.com";
const route = useRoute();

const canonicalPath = computed(() => {
  const stripped = route.path.replace(/\/+$/, "");
  return stripped || "/";
});

useHead({
  link: [{ rel: "canonical", href: () => `${SITE_URL}${canonicalPath.value}` }],
});
</script>
