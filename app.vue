<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import data from "~/data/content";

const SITE_URL = "https://www.tyleringersoll.com";
const route = useRoute();
const canonicalPath = computed(() => route.path.replace(/\/+$/, "") || "/");
const indexablePage = computed(() =>
  ["/", "/resume", "/architecture"].includes(canonicalPath.value)
);
const currentRole = data.content.resume.find((entry) => entry.roles?.length)?.roles[0];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: data.content.meta.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/profile_avatar.webp`,
  jobTitle: currentRole?.subheading.split(" · ")[0],
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: data.content.meta.name,
  url: `${SITE_URL}/`,
  publisher: { "@id": personSchema["@id"] },
};

const canonicalUrl = computed(() =>
  indexablePage.value ? `${SITE_URL}${canonicalPath.value}` : undefined
);

useSeoMeta({ ogUrl: canonicalUrl });

useHead(() => ({
  link: indexablePage.value ? [{ rel: "canonical", href: canonicalUrl.value }] : [],
  script: indexablePage.value ? [
    {
      key: "person-schema",
      type: "application/ld+json",
      innerHTML: JSON.stringify(personSchema),
    },
    ...(canonicalPath.value === "/" ? [{
      key: "website-schema",
      type: "application/ld+json",
      innerHTML: JSON.stringify(websiteSchema),
    }] : []),
  ] : [],
}));
</script>
