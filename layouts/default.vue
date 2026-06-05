<template>
  <div class="app-upper">
    <a href="#main-content" class="skip-nav">Skip to main content</a>
    <Themed
      v-if="content.meta"
      name="Header"
      :content="content.meta"
      :navigation="content.navigation || []"
    />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
  </div>
  <Themed
    v-if="content.footer && content.footer.socialHeading"
    name="Footer"
    class="app-sticky-bottom"
    :content="content.footer"
  />
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const store = useContentStore();

const content = computed(() => {
  if (!store.content) {
    return {
      meta: {},
      navigation: [],
      footer: {
        socialHeading: "",
        socialIcons: [],
        legal: [],
      },
    };
  }
  return store.content;
});
</script>
