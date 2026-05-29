<template>
  <button
    class="theme-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="!isDark"
    @click="store.toggle()"
  >
    <span v-if="isDark" class="theme-toggle__icon" aria-hidden="true">
      <!-- Sun icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    </span>
    <span v-else class="theme-toggle__icon" aria-hidden="true">
      <!-- Moon icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </span>
  </button>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";

const store = useThemeStore();
const isDark = computed(() => store.isDark);
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--color-accent-line);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  color: var(--color-accent-line);
  padding: 0;
  transition: color 200ms ease, border-color 200ms ease;
  @include focus-visible(3px);

  &:hover {
    color: var(--color-link);
    border-color: var(--color-link);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
