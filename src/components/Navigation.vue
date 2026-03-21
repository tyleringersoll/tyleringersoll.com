<template>
  <nav class="navigation" aria-label="Main navigation">
    <div class="container">
      <ul class="navigation__items">
        <li
          v-for="(item, index) in content"
          :key="index"
          class="navigation__item"
        >
          <router-link :to="item.url" :innerHTML="item.name" />
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
  padding-bottom: $spacing-xs;

  @include respond-to(sm) {
    position: sticky;
    top: 0;
    z-index: $z-index-sticky;
    background-color: var(--color-bg-nav);
  }

  &__items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: $spacing-sm;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border-bottom: 2px solid var(--color-accent-line);
  }

  &__item {
    display: none;
    margin: 0 0 $spacing-sm 0;
    @include transition(all);

    @include respond-to(sm) {
      display: inline-block;
      margin: 0 $spacing-lg $spacing-sm 0;
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

    &:hover {
      &::before {
        transform: scaleX(1);
      }
    }
  }

  &__toggle {
    display: none;
    align-items: center;
    align-self: center;

    @include respond-to(sm) {
      display: flex;
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

    @include respond-below(sm) {
      pointer-events: none;
      cursor: default;
    }
  }
}
</style>
