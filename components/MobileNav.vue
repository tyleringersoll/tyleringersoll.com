<template>
  <nav class="mobile-nav mobile-nav--spin" aria-label="Mobile navigation">
    <button
      ref="hamburgerBtn"
      class="mobile-nav__button"
      :class="{ 'mobile-nav__button--active': nav.isOpen }"
      type="button"
      @click="toggleNav"
      :aria-label="nav.isOpen ? 'Close mobile navigation' : 'Open mobile navigation'"
      :aria-expanded="nav.isOpen"
      aria-controls="mobile-navigation-panel"
    >
      <span class="mobile-nav__box">
        <span class="mobile-nav__inner" />
      </span>
    </button>
    <div
      class="mobile-nav__overlay"
      :class="{ 'mobile-nav__overlay--active': nav.isOpen }"
      :aria-hidden="!nav.isOpen"
      v-bind="nav.isOpen ? {} : { inert: '' }"
      @click.self="closeNav"
    >
      <div
        id="mobile-navigation-panel"
        ref="panelEl"
        class="mobile-nav__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabindex="-1"
        @keydown.tab="handleTabKey"
        @keydown.escape="closeNav"
      >
        <div class="mobile-nav__panel-header">
          <span class="mobile-nav__title">Menu</span>
          <button
            class="mobile-nav__close"
            type="button"
            aria-label="Close mobile navigation"
            @click="closeNav"
          >
            <span class="mobile-nav__close-icon" aria-hidden="true" />
          </button>
        </div>

        <ul class="mobile-nav__items">
          <li v-for="(item, index) in content" class="mobile-nav__item" :key="index">
            <NuxtLink :to="item.url" @click="closeFromLink">{{ item.name }}</NuxtLink>
          </li>
          <li class="mobile-nav__item mobile-nav__item--toggle">
            <ThemeCycle v-if="store.hasMultipleThemes" />
            <ThemeToggle v-if="store.supportsModes" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { useThemeStore } from "~/stores/theme";

const route = useRoute();
const store = useThemeStore();

defineProps({
  content: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["nav:clicked"]);

const nav = reactive({ isOpen: false });
const hamburgerBtn = ref(null);
const panelEl = ref(null);
const restoreFocusOnClose = ref(true);
let desktopMediaQuery;

const syncBodyMenuState = (isOpen) => {
  if (import.meta.client) {
    document.body.classList.toggle("menu-open", isOpen);
  }
};

const queueFocus = async (getElement) => {
  if (!import.meta.client) return;

  await nextTick();
  window.setTimeout(() => {
    const element = getElement();
    if (element && typeof element.focus === "function") {
      element.focus({ preventScroll: true });
    }
  }, 0);
};

const focusFirstMenuControl = () => {
  queueFocus(() => getFocusableElements()[0] || panelEl.value);
};

const restoreToggleFocus = () => {
  queueFocus(() => hamburgerBtn.value);
};

const setNavOpen = (isOpen, options = {}) => {
  if (nav.isOpen === isOpen) return;

  restoreFocusOnClose.value = options.restoreFocus !== false;
  nav.isOpen = isOpen;
  syncBodyMenuState(isOpen);
  emit("nav:clicked", isOpen);

  if (isOpen) {
    focusFirstMenuControl();
  } else if (restoreFocusOnClose.value) {
    restoreToggleFocus();
  }
};

const toggleNav = () => {
  setNavOpen(!nav.isOpen);
};

const closeNav = (options = {}) => {
  setNavOpen(false, options);
};

const closeFromLink = () => {
  closeNav();
};

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const getFocusableElements = () => {
  if (!panelEl.value) return [];

  return Array.from(panelEl.value.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (element) => {
      const style = window.getComputedStyle(element);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        element.getClientRects().length > 0
      );
    }
  );
};

const handleTabKey = (event) => {
  if (!nav.isOpen || !panelEl.value) return;

  const focusable = getFocusableElements();
  if (focusable.length === 0) {
    event.preventDefault();
    panelEl.value.focus({ preventScroll: true });
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (document.activeElement === panelEl.value) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
    return;
  }

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
};

watch(
  () => route.fullPath,
  () => {
    closeNav({ restoreFocus: false });
  }
);

const closeOnDesktop = (event) => {
  if (event.matches) {
    closeNav({ restoreFocus: false });
  }
};

const closeOnEscape = (event) => {
  if (event.key === "Escape" && nav.isOpen) {
    closeNav();
  }
};

onMounted(() => {
  desktopMediaQuery = window.matchMedia("(min-width: 768px)");
  desktopMediaQuery.addEventListener("change", closeOnDesktop);
  window.addEventListener("keydown", closeOnEscape);

  if (desktopMediaQuery.matches) {
    closeNav({ restoreFocus: false });
  }
});

onUnmounted(() => {
  syncBodyMenuState(false);

  if (desktopMediaQuery) {
    desktopMediaQuery.removeEventListener("change", closeOnDesktop);
  }

  window.removeEventListener("keydown", closeOnEscape);
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
    position: relative;
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
    background-color: transparent;
    border: 0;
    border-radius: 50%;
    margin: 0;
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
    overflow: visible;
    z-index: $z-index-overlay;
    flex-shrink: 0;

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
    inset: 0;
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background-color: rgba($color-gray-8, 0.58);
    opacity: 0;
    visibility: hidden;
    transition: opacity 240ms ease, visibility 0s linear 240ms;
    z-index: $z-index-overlay;
    pointer-events: none;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    &--active {
      opacity: 1;
      visibility: visible;
      transition-delay: 0s;
      pointer-events: auto;

      .mobile-nav__panel {
        transform: translateX(0);
      }
    }
  }

  &__panel {
    position: relative;
    width: min(21rem, calc(100vw - 2.5rem));
    height: 100%;
    padding: calc(#{$spacing-sm} + env(safe-area-inset-top)) $spacing-md
      calc(#{$spacing-lg} + env(safe-area-inset-bottom));
    background-color: var(--color-bg-primary);
    border-left: 1px solid var(--color-border);
    box-shadow: -1rem 0 2.5rem rgba($color-gray-8, 0.38);
    overflow-y: auto;
    transform: translateX(100%);
    transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1);

    &:focus {
      outline: none;
    }
  }

  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 3rem;
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid var(--color-border);
  }

  &__title {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    font-weight: 700;
    @include text-uppercase;
  }

  &__close {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    color: var(--color-nav-link);
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    cursor: pointer;
    @include transition(all);

    &:hover {
      color: $color-highlight-1;
      border-color: $color-highlight-1;
    }

    &:focus-visible {
      outline: 2px solid $color-highlight-5;
      outline-offset: 2px;
    }
  }

  &__close-icon {
    position: relative;
    display: block;
    width: 1rem;
    height: 1rem;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      border-radius: 999px;
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__items {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
  }

  &__item {
    margin: 0;
    padding: 0;
    color: var(--color-nav-link);
    font-size: 1rem;
    font-weight: 600;
    @include text-uppercase;
    text-decoration: none;
    @include transition(all);
    cursor: pointer;

    border-bottom: 1px solid var(--color-border);

    &--toggle {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      padding: $spacing-md 0 0;
      margin-top: $spacing-md;
      border-bottom: 0;
    }
  }

  a {
    display: block;
    padding: $spacing-sm 0;
    color: var(--color-nav-link);
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

  @media (prefers-reduced-motion: reduce) {
    &__overlay,
    &__panel,
    &__inner,
    &__inner::before,
    &__inner::after {
      transition-duration: 1ms;
      transition-delay: 0s;
    }
  }
}
</style>
