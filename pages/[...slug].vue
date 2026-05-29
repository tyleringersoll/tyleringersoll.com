<template>
  <section v-if="pageContent" :class="[pageClass, 'container']">
    <transition
      name="fade"
      mode="out-in"
      v-for="(article, index) in pageContent"
      :key="index"
    >
      <Article :article="article" :index="index" />
    </transition>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const route = useRoute();
const store = useContentStore();

const pageContent = computed(() => {
  if (!store.content) return null;

  const routePath = route.path;
  const routeName = routePath === "/" ? "home" : routePath.slice(1);

  return store.content[routeName] || null;
});

const pageClass = computed(() => {
  const routePath = route.path;
  return routePath === "/" ? "home" : routePath.slice(1);
});
</script>
