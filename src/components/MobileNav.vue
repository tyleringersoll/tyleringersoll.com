<template>
  <nav class="mobile-nav mobile-nav--spin">
    <button
      class="mobile-nav__button"
      :class="{ 'mobile-nav__button--active': nav.isOpen }"
      type="button"
      tabindex="0"
      @click="onClick"
      aria-label="Toggle mobile navigation"
      :aria-expanded="nav.isOpen"
    >
      <span class="mobile-nav__box">
        <span class="mobile-nav__inner" />
      </span>
    </button>
    <div
      class="mobile-nav__overlay"
      :class="{ 'mobile-nav__overlay--active': nav.isOpen }"
      @click.self="onClick"
    >
      <ul v-if="nav.isOpen" class="mobile-nav__items">
        <li
          v-for="(item, index) in content"
          class="mobile-nav__item"
          :key="index"
          @keydown.enter="() => onKeydown(item.url)"
          @click="onClick"
        >
          <router-link :to="item.url" v-html="item.name" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { reactive, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  content: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["nav:clicked"]);

const nav = reactive({ isOpen: false });

const toggleMenuState = () => {
  if (nav.isOpen) {
    document.body.classList.add("menu-open");
  } else {
    document.body.classList.remove("menu-open");
  }
};

const onClick = () => {
  nav.isOpen = !nav.isOpen;
  toggleMenuState();
  emit("nav:clicked", nav.isOpen);
};

const onKeydown = (url) => {
  router.push(url);
  onClick();
};

onUnmounted(() => {
  if (nav.isOpen) {
    document.body.classList.remove("menu-open");
  }
});
</script>

<style lang="scss" scoped>
$menu-padding-x: 0;
$menu-padding-y: 0;
$menu-layer-width: 40px;
$menu-layer-height: 4px;
$menu-layer-spacing: 6px;
$menu-layer-color: $color-highlight-1;
$menu-layer-border-radius: 4px;
$menu-hover-opacity: 1;
$menu-active-layer-color: $menu-layer-color;
$menu-active-hover-opacity: $menu-hover-opacity;
$menu-hover-use-filter: true;
$menu-hover-filter: opacity(100%);
$menu-active-hover-filter: $menu-hover-filter;

.mobile-nav {
  &__button {
    position: fixed;
    top: 0;
    right: 0;
    padding: $menu-padding-y $menu-padding-x;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-property: opacity, filter, background-color;
    transition-duration: $transition-fast;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: $color-gray-8;
    border: 0;
    border-radius: 50%;
    margin: $spacing-sm;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
    overflow: visible;
    z-index: $z-index-overlay;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

    &:focus {
      outline: 0;
    }

    &:hover {
      @if $menu-hover-use-filter == true {
        filter: $menu-hover-filter;
      } @else {
        opacity: $menu-hover-opacity;
      }
    }

    &--active {
      &:hover {
        @if $menu-hover-use-filter == true {
          filter: $menu-active-hover-filter;
        } @else {
          opacity: $menu-active-hover-opacity;
        }
      }

      .mobile-nav__inner,
      .mobile-nav__inner::before,
      .mobile-nav__inner::after {
        background-color: $menu-active-layer-color;
      }
    }

    &:focus-visible {
      outline: 2px solid $color-highlight-5;
      outline-offset: 2px;
      @include transition(all);
    }
  }

  &__box {
    width: $menu-layer-width;
    height: $menu-layer-height * 3 + $menu-layer-spacing * 2;
    display: inline-block;
    position: relative;
  }

  &__inner {
    display: block;
    top: 50%;
    margin-top: $menu-layer-height / -2;

    &,
    &::before,
    &::after {
      width: $menu-layer-width;
      height: $menu-layer-height;
      background-color: $menu-layer-color;
      border-radius: $menu-layer-border-radius;
      position: absolute;
      @include transition-fast(transform);
    }

    &::before,
    &::after {
      content: "";
      display: block;
    }

    &::before {
      top: ($menu-layer-spacing + $menu-layer-height) * -1;
    }

    &::after {
      bottom: ($menu-layer-spacing + $menu-layer-height) * -1;
    }
  }

  &--spin {
    .mobile-nav__inner {
      transition-duration: 0.22s;
      transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);

      &::before {
        transition: top 0.1s 0.25s ease-in, opacity 0.1s ease-in;
      }

      &::after {
        transition: bottom 0.1s 0.25s ease-in,
          transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
    }

    .mobile-nav__button--active .mobile-nav__inner {
      transform: rotate(225deg);
      transition-delay: 0.12s;
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);

      &::before {
        top: 0;
        opacity: 0;
        transition: top 0.1s ease-out, opacity 0.1s 0.12s ease-out;
      }

      &::after {
        bottom: 0;
        transform: rotate(-90deg);
        transition: bottom 0.1s ease-out,
          transform 0.22s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $color-gray-8;
    transform: translateX(120vw);
    @include transition-slow(all);
    transition-delay: 0.3s;
    z-index: $z-index-modal;
    pointer-events: none;

    &::after {
      content: "";
      background-image: url("../assets/drum_bg.png");
      background-size: cover;
      position: absolute;
      top: $spacing-sm;
      right: 0;
      bottom: 0;
      left: -3rem;
      opacity: 0;
      transition: opacity 0.5s 0.75s ease-in;
      z-index: -1;
    }

    &--active {
      transform: translateX(0);
      pointer-events: auto;

      &::after {
        opacity: 0.04;
      }
    }
  }

  &__items {
    list-style-type: none;
    margin-top: 6rem;
    padding: $spacing-md $spacing-xl;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }

  &__item {
    margin: 0 0 $spacing-lg;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    @include text-uppercase;
    text-decoration: none;
    @include transition(all);
    cursor: pointer;

    @include respond-to(sm) {
      display: inline-block;
      margin: 0 $spacing-lg $spacing-sm 0;
    }
  }

  a {
    color: white;
    font-weight: 600;
    @include text-uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: $color-highlight-1;
    }

    &:focus-visible {
      color: $color-highlight-1;
      outline-offset: 3px;
      @include transition(all);
    }
  }

  :deep(.router-link-exact-active) {
    color: $color-highlight-2;

    &:focus-visible {
      color: $color-highlight-2;
    }
  }
}
</style>
