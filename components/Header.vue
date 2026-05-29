<template>
  <header v-if="content" class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__brand">
        <img
          class="header__avatar"
          src="/profile_glitch_subtle.webp"
          :alt="`Profile image of ${content.name}`"
          width="44"
          height="44"
        />
        <span class="header__name" v-html="content.name" />
      </NuxtLink>

      <nav class="header__nav" aria-label="Main navigation">
        <ul class="header__nav-items">
          <li
            v-for="(item, index) in navigation"
            :key="index"
            class="header__nav-item"
          >
            <NuxtLink :to="item.url">{{ item.name }}</NuxtLink>
          </li>
        </ul>
        <ThemeToggle />
      </nav>

      <MobileNav class="header__mobile-nav" :content="navigation" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
  navigation: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: $z-index-sticky;
  border-bottom: 1px solid var(--color-border);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: var(--color-bg-header);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: -1;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: $spacing-xs $container-padding-x;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    text-decoration: none;
    color: var(--color-text-primary);
    @include transition(color);
    @include focus-visible(3px);

    &:hover {
      color: var(--color-link);
    }
  }

  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid var(--color-accent-line);
    object-fit: cover;
    flex-shrink: 0;

    @include respond-to(sm) {
      width: 44px;
      height: 44px;
    }
  }

  &__name {
    font-size: 1rem;
    font-weight: 700;
    @include text-uppercase;
    color: inherit;

    @include respond-to(sm) {
      font-size: 1.1rem;
    }
  }

  &__nav {
    display: none;

    @include respond-to(sm) {
      display: flex;
      align-items: center;
      gap: $spacing-md;
    }
  }

  &__nav-items {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__nav-item {
    margin: 0;

    &::before {
      display: block;
      content: "";
      padding-bottom: 4px;
      border-top: 2px solid var(--color-accent-line);
      transform: scaleX(0);
      transform-origin: 0% 50%;
      @include transition(transform, 250ms, ease-in-out);
    }

    &:hover::before {
      transform: scaleX(1);
    }

    a {
      color: var(--color-nav-link);
      font-size: 1rem;
      font-weight: 600;
      @include text-uppercase;
      text-decoration: none;

      &:hover {
        color: var(--color-link);
      }

      @include focus-visible(3px);
    }

    :deep(.router-link-exact-active) {
      color: var(--color-active-nav);
      text-decoration: underline;
      text-decoration-color: var(--color-accent-line);
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
  }

  &__mobile-nav {
    @include respond-to(sm) {
      display: none;
    }
  }
}
</style>
