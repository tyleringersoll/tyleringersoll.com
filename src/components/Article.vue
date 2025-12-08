<template>
  <article class="article">
    <component
      v-if="props.article.heading"
      :is="headingLevel"
      :class="{ 'first-heading': props.index === 0 }"
      v-html="props.article.heading"
    />
    <component
      v-if="props.article.subheading"
      :is="subheadingLevel"
      class="article__subheading"
      v-html="props.article.subheading"
    />
    <p v-if="inlineStyle" class="article__inline-theme">
      <span
        v-for="(para, paraIndex) in props.article.content"
        :key="paraIndex"
        class="article__inline-item"
      >
        <span class="article__inline" v-html="para" />
        <span
          v-if="props.article.content.length - 1 !== paraIndex"
          class="article__bullet"
          >&bull;</span
        >
      </span>
    </p>
    <p
      v-else
      v-for="(para, paraIndex) in props.article.content"
      :key="paraIndex"
      :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
      v-html="para"
    />
    <slot />
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  article: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: -1,
  },
});

const headingLevel = computed(() => {
  return props.article.headingLevel ? `h${props.article.headingLevel}` : "h3";
});

const subheadingLevel = computed(() => {
  const headingLvl = props.article.headingLevel || 3;
  const subheadingLvl = Math.min(headingLvl + 1, 6);
  return `h${subheadingLvl}`;
});

const inlineStyle = computed(() => {
  return props.article.contentStyle && props.article.contentStyle === "inline";
});
</script>

<style lang="scss" scoped>
.article {
  &__subheading {
    margin-top: -$spacing-lg;
    margin-bottom: $spacing-sm;
    font-size: 0.9em;
    font-weight: 400;
    color: $color-gray-2;
    font-style: italic;
    @include transition(color);

    @include respond-to(sm) {
      margin-top: -$spacing-lg;
      margin-bottom: $spacing-md;
    }
  }

  &__inline {
    @include transition-fast(all);

    &:hover {
      color: $color-highlight-1;
      cursor: default;
    }

    &-theme {
      line-height: $line-height-body;
      text-transform: lowercase;
    }

    &-item {
      display: inline-block;
      white-space: nowrap;
    }
  }

  &__bullet {
    margin: 0 0.4rem;
  }

  :deep(ul),
  :deep(ol) {
    margin: $spacing-sm 0;
    padding-left: 1.5rem;
    line-height: $line-height-body;
  }

  :deep(li) {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    p {
      margin: 0;
      display: inline;
    }
  }

  :deep(ul) {
    list-style-type: disc;

    ul {
      list-style-type: circle;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  :deep(ol) {
    list-style-type: decimal;
  }

  &__bullet-item {
    padding-left: 1rem;
    text-indent: -0.5rem;
  }
}
</style>
