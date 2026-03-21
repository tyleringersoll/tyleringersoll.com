<template>
  <section v-if="musicContent" class="music container">
    <template v-for="(entry, idx) in musicContent" :key="idx">
      <Article v-if="entry.headingLevel <= 2" :article="entry" :index="idx" />
      <article v-else class="music-section">
        <div
          class="music-section__left"
          role="button"
          tabindex="0"
          @click="toggle(idx)"
          @keydown.enter.prevent="toggle(idx)"
          @keydown.space.prevent="toggle(idx)"
        >
          <span
            class="music-section__caret"
            :class="{ 'music-section__caret--open': isExpanded(idx) }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <span class="music-section__dates">{{ entry.years }}</span>
        </div>
        <component
          :is="`h${entry.headingLevel}`"
          class="music-section__heading"
          role="button"
          tabindex="0"
          @click="toggle(idx)"
          @keydown.enter.prevent="toggle(idx)"
          @keydown.space.prevent="toggle(idx)"
        >{{ entry.heading }}</component>
        <transition name="music-expand">
          <div v-if="isExpanded(idx)" class="music-section__content">
            <p
              v-for="(para, pIdx) in entry.content"
              :key="pIdx"
              :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
              v-html="para"
            />
          </div>
        </transition>
      </article>
    </template>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useContentStore } from "@/store";
import Article from "@/components/Article.vue";

const store = useContentStore();
const { content, isLoading } = storeToRefs(store);

const musicContent = computed(() => {
  if (isLoading.value || !content.value) return null;
  const sections = content.value.music ?? null;
  if (!sections) return null;
  const intro = sections.filter((s) => s.headingLevel <= 2);
  const projects = sections.filter((s) => s.headingLevel > 2);
  return [...intro, ...projects];
});

const expandedSections = ref(new Set());

const isExpanded = (idx) => expandedSections.value.has(idx);

const toggle = (idx) => {
  const set = new Set(expandedSections.value);
  if (set.has(idx)) {
    set.delete(idx);
  } else {
    set.add(idx);
  }
  expandedSections.value = set;
};
</script>

<style lang="scss" scoped>
.music-section {
  display: grid;
  grid-template-columns: 9rem 1fr;
  column-gap: $spacing-sm;
  align-items: center;

  &__left {
    display: flex;
    align-items: center;
    gap: 0.4em;
    padding-top: $spacing-xs;
    cursor: pointer;
    user-select: none;
  }

  &__dates {
    font-size: 1rem;
    color: var(--color-text-secondary);
    white-space: nowrap;
    line-height: 1.2;
  }

  &__left:hover + .music-section__heading::before,
  &__left:has(.music-section__caret--open) + .music-section__heading::before {
    transform: scaleX(1);
  }

  &__left:has(.music-section__caret--open) + .music-section__heading {
    color: var(--color-active-nav);
  }

  &__caret {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--color-text-muted);
    @include transition(transform);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__heading {
    display: block;
    width: fit-content;
    padding-top: $spacing-xs;
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    cursor: pointer;
    user-select: none;
    position: relative;
    @include transition(color);

    &::before {
      content: "";
      position: absolute;
      top: calc(#{$spacing-xs} - 4px);
      left: 0;
      right: 0;
      height: 2px;
      background-color: $color-highlight-3;
      transform: scaleX(0);
      transform-origin: 0% 50%;
      @include transition(transform, 250ms, ease-in-out);
    }

    &:hover {
      color: $color-highlight-1;

      &::before {
        transform: scaleX(1);
      }
    }
  }

  &__content {
    grid-column: 1 / -1;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: $spacing-sm $spacing-lg;
    margin: $spacing-sm 0 $spacing-md;
  }
}

.article__bullet-item {
  padding-left: 1rem;
  text-indent: -0.5rem;
}

.music-expand {
  &-enter-active,
  &-leave-active {
    transition: max-height 0.3s ease, opacity 0.2s ease;
    overflow: hidden;
    max-height: 2000px;
  }

  &-enter-from,
  &-leave-to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
