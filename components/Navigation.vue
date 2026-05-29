<template>
  <nav class="navigation" aria-label="Main navigation">
    <div class="container">
      <ul class="navigation__items">
        <li
          v-for="(item, index) in content"
          :key="index"
          class="navigation__item"
        >
          <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
        </li>
        <li class="navigation__toggle" style="margin-left: auto">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  content: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.navigation {
  @include respond-to(sm) {
    position: sticky;
    top: 0;
    z-index: $z-index-sticky;
    background-color: var(--color-bg-primary);
    border-bottom: 1px solid var(--color-border);
  }

  &__items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: $spacing-sm;
    list-style-type: none;
    margin: 0;
    padding: $spacing-xs 0 $spacing-md;
    overflow: hidden;
  }

  &__item {
    display: none;
    margin: 0;
    @include transition(all);

    @include respond-to(sm) {
      display: inline-block;
      margin: 0 $spacing-lg 0 0;
    }

    &::before {
      display: block;
      content: "";
      padding-bottom: $spacing-sm;
      border-top: 2px solid var(--color-accent-line);
      transform: scaleX(0);
      transform-origin: 0% 50%;
      @include transition(transform, 250ms, ease-in-out);
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }

  &__toggle {
    display: none;
    align-items: center;
    align-self: center;

    @include respond-to(sm) {
      display: flex;
      margin-bottom: 10px;
    }
  }

  a {
    color: var(--color-nav-link);
    font-size: 1.1rem;
    font-weight: 600;
    @include text-uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--color-link);
    }

    @include focus-visible(3px);
  }

  :deep(.router-link-exact-active) {
    display: inline-block;
    color: var(--color-active-nav);
    text-decoration: underline;
    text-decoration-color: var(--color-accent-line);
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;

    @include respond-below(sm) {
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
