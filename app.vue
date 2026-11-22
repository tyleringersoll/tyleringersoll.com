<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const SITE_URL = "https://www.tyleringersoll.com";
const route = useRoute();
const canonicalPath = computed(() => route.path.replace(/\/+$/, "") || "/");

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tyler Ingersoll",
  url: SITE_URL,
  jobTitle: "Engineering Manager",
  knowsAbout: [
    "Frontend Architecture",
    "Design Systems",
    "Engineering Management",
    "Web Performance",
    "Drums",
  ],
  sameAs: [
    "https://github.com/tyleringersoll",
    "https://www.linkedin.com/in/tyleringersoll",
    "https://tyleringersolldrums.com",
    "https://ingersoll.dev",
    "https://www.strava.com/athletes/3303002",
  ],
};

const canonicalUrl = computed(() => `${SITE_URL}${canonicalPath.value}`);

useSeoMeta({ ogUrl: canonicalUrl });

useHead(() => ({
  link: [{ rel: "canonical", href: canonicalUrl.value }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(personSchema),
    },
  ],
}));
</script>
