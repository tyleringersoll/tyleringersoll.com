<template>
  <div class="app-upper">
    <Header
      v-if="content.meta"
      :content="content.meta"
      :navigation="content.navigation || []"
    />
    <main>
      <slot />
    </main>
  </div>
  <Footer
    v-if="content.footer && content.footer.socialHeading && route.path !== '/'"
    class="app-sticky-bottom"
    :content="content.footer"
  />
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const route = useRoute();
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
