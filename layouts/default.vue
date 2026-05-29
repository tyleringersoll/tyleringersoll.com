<template>
  <div class="app-upper">
    <a href="#main-content" class="skip-nav">Skip to main content</a>
    <Header
      v-if="content.meta"
      :content="content.meta"
      :navigation="content.navigation || []"
    />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
  </div>
  <Footer
    v-if="content.footer && content.footer.socialHeading"
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
