<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const SITE_URL = "https://www.tyleringersoll.com";
const route = useRoute();
const canonicalPath = route.path.replace(/\/+$/, "") || "/";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tyler Ingersoll",
  url: SITE_URL,
  jobTitle: "Director of Software Engineering",
  knowsAbout: [
    "Frontend Architecture",
    "Design Systems",
    "Engineering Leadership",
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

useHead({
  link: [{ rel: "canonical", href: `${SITE_URL}${canonicalPath}` }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(personSchema),
    },
  ],
});
</script>
