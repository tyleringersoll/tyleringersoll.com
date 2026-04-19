<template>
  <div
    class="timeline-item"
    :class="{
      'timeline-item--expanded': expanded,
      'timeline-item--expandable': expandable,
    }"
  >
    <div
      class="timeline-item__trigger"
      v-bind="expandable ? { role: 'button', tabindex: 0, 'aria-expanded': expanded } : {}"
      @click="expandable && $emit('toggle')"
      @keydown.enter.prevent="expandable && $emit('toggle')"
      @keydown.space.prevent="expandable && $emit('toggle')"
    >
      <div class="timeline-item__left">
        <span class="timeline-item__dates">{{ dates }}</span>
      </div>
      <div class="timeline-item__axis" aria-hidden="true">
        <span class="timeline-item__node">
          <span v-if="expandable" class="timeline-item__icon">
            <span class="timeline-item__icon-bar timeline-item__icon-bar--h" />
            <span class="timeline-item__icon-bar timeline-item__icon-bar--v" />
          </span>
        </span>
      </div>
      <component :is="titleTag" class="timeline-item__title" :id="titleId || undefined">{{ title }}</component>
    </div>
    <div
      v-if="expandable"
      class="timeline-item__content-wrapper"
      :aria-hidden="!expanded"
      :inert="!expanded"
    >
      <div class="timeline-item__content">
        <slot />
      </div>
    </div>
    <div v-else class="timeline-item__content timeline-item__content--visible">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  dates: { type: String, default: "" },
  title: { type: String, default: "" },
  titleTag: { type: String, default: "h4" },
  titleId: { type: String, default: "" },
  expandable: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
});

defineEmits(["toggle"]);
</script>

<style lang="scss" scoped>
.timeline-item {
  display: grid;
  grid-template-columns: var(--col-date) var(--col-axis) 1fr;
  column-gap: var(--col-gap);
  padding: 0.75rem 0;

  &__trigger {
    grid-column: 1 / -1;
    grid-row: 1;
    display: grid;
    grid-template-columns: var(--col-date) var(--col-axis) 1fr;
    column-gap: var(--col-gap);
    align-items: center;
  }

  &--expandable &__trigger {
    cursor: pointer;
    user-select: none;
    @include focus-visible;
  }

  &__left {
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__dates {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-secondary);
    white-space: nowrap;
    line-height: 1.4;
    @include transition(color);

    @include respond-below(xs) {
      font-size: 0.7rem;
      letter-spacing: 0.1em;
    }
  }

  &__axis {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  &__node {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid var(--color-text-muted);
    background: var(--section-bg, var(--color-bg-primary));
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }

  &__title {
    grid-column: 3;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.4;
    @include transition(color);
  }

  &__icon {
    position: relative;
    display: inline-block;
    width: 0.55rem;
    height: 0.55rem;
  }

  &__icon-bar {
    position: absolute;
    background: currentColor;
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &--h {
      top: 50%;
      left: 0;
      right: 0;
      height: 1.5px;
      transform: translateY(-50%);
    }

    &--v {
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1.5px;
      transform: translateX(-50%);
    }
  }

  // Hover states (expandable only)
  &--expandable &__trigger:hover {
    .timeline-item__title {
      color: var(--color-accent-line);
    }

    .timeline-item__node {
      border-color: var(--color-accent-line);
      color: var(--color-accent-line);
    }
  }

  // Expanded state
  &--expanded {
    .timeline-item__title {
      color: var(--color-accent-line);
    }

    .timeline-item__node {
      border-color: var(--color-accent-line);
      color: var(--color-accent-line);
    }

    .timeline-item__icon-bar--v {
      transform: translateX(-50%) rotate(90deg);
      opacity: 0;
    }
  }

  // Expandable content wrapper (animated)
  &__content-wrapper {
    grid-column: 3;
    grid-row: 2;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    visibility: hidden;
    transition:
      max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease,
      visibility 0s linear 0.45s;

    @include respond-below(sm) {
      grid-column: 1 / -1;
      position: relative;
      z-index: 2;
      background: var(--section-bg, var(--color-bg-primary));
    }
  }

  &--expanded &__content-wrapper {
    max-height: 200rem;
    opacity: 1;
    visibility: visible;
    transition:
      max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s ease 0.1s,
      visibility 0s linear 0s;
  }

  // Content (shared between expandable and static)
  &__content {
    padding: $spacing-sm 0 $spacing-md;

    :deep(p) {
      margin: 0 0 $spacing-sm;
      line-height: 1.8;
    }

    :deep(p:last-child) {
      margin-bottom: 0;
    }

    :deep(strong) {
      color: var(--color-text-primary);
    }
  }

  // Static (always-visible) content positioning
  &__content--visible {
    grid-column: 3;
    grid-row: 2;
  }
}
</style>
