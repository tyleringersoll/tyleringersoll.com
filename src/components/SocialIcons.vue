<template>
  <div class="social-icon">
    <a
      :href="props.url"
      :title="computedTitle"
      :aria-label="props.alt"
      target="_blank"
      rel="noopener noreferrer"
      v-html="props.svg"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  svg: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
});

const computedTitle = computed(() => {
  return props.title || `Follow me on ${props.alt}`;
});
</script>

<style lang="scss" scoped>
.social-icon {
  flex: 0 0 auto;
  padding: $spacing-xs;

  a {
    margin: 0;
    padding: 0;
    @include flex-center;
    width: 2.75rem;
    height: 2.75rem;
    border: 2px solid $color-highlight-1;
    border-radius: 50%;
    @include transition(all);
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
      fill: $color-highlight-1 !important;
      max-height: 1rem;
      max-width: 1rem;
      width: 100%;
      height: 100%;
      @include transition(all);

      &.github {
        max-height: 2rem;
        max-width: 2rem;
      }

      &.linkedin {
        max-height: 1.1rem;
        max-width: 1.1rem;
      }

      &.twitter {
        max-height: 1.5rem;
        max-width: 1.5rem;
      }

      &.email {
        max-height: 1rem;
        max-width: 1rem;
      }

      &.strava {
        max-height: 1.2rem;
        max-width: 1.2rem;
      }
    }

    &:hover {
      border: 2px solid $color-highlight-3;

      :deep(svg) {
        fill: $color-highlight-2 !important;
      }
    }

    @include focus-visible-circle(0.5rem);
  }
}
</style>
