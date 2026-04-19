<template>
  <section v-if="musicContent" class="music container">
    <template v-for="(entry, idx) in musicContent" :key="idx">
      <Article :article="entry" :index="idx" />
      <div v-if="entry.cta" class="music-cta-wrap">
        <a
          :href="entry.cta.url"
          :target="entry.cta.external ? '_blank' : null"
          :rel="entry.cta.external ? 'noopener noreferrer' : null"
          class="music-cta-btn"
        >
          {{ entry.cta.label }} →
        </a>
      </div>
    </template>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const store = useContentStore();
const { content } = storeToRefs(store);

const musicContent = computed(() => {
  if (!content.value) return null;
  return content.value.music ?? null;
});
</script>

<style lang="scss" scoped>
.music {
  max-width: 900px;
  padding-bottom: $spacing-xl;
}

.music-cta-wrap {
  margin-top: $spacing-md;
  margin-bottom: $spacing-lg;
}

.music-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.75rem;

  @include respond-below(sm) {
    width: 100%;
    justify-content: center;
  }
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  background-color: var(--color-link);
  color: #fff;
  border: 2px solid var(--color-link);
  @include transition(all);

  &:hover {
    background-color: var(--color-link-hover);
    border-color: var(--color-link-hover);
    color: #1a1a1a;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }
}
</style>
