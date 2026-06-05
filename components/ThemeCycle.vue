<template>
  <button
    class="theme-cycle"
    type="button"
    :aria-label="`Switch theme (next: ${nextLabel})`"
    :title="`Theme: ${currentLabel}`"
    @click="store.cycleTheme()"
  >
    <span class="theme-cycle__icon" aria-hidden="true">
      <!-- Palette / swatches icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125 0-.926.746-1.687 1.688-1.687H16.5c3.039 0 5.5-2.461 5.5-5.5C22 6.063 17.5 2 12 2z"/>
      </svg>
    </span>
  </button>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";
import { getTheme, nextThemeId } from "~/themes/registry";

const store = useThemeStore();
const currentLabel = computed(() => store.activeTheme.label);
const nextLabel = computed(() => getTheme(nextThemeId(store.activeThemeId)).label);
</script>

<style lang="scss" scoped>
.theme-cycle {
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
