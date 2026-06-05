<template>
  <div
    v-if="ui.paletteOpen"
    class="cmdk"
    @click.self="ui.closePalette()"
  >
    <div
      class="cmdk__modal"
      role="dialog"
      aria-modal="true"
      aria-label="Search themes"
    >
      <div class="cmdk__field">
        <svg class="cmdk__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <input
          ref="input"
          v-model="query"
          type="text"
          class="cmdk__input"
          placeholder="Search themes…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          :aria-activedescendant="active ? `cmdk-opt-${active.id}` : undefined"
          autocomplete="off"
          spellcheck="false"
          @keydown.down.prevent="move(1)"
          @keydown.up.prevent="move(-1)"
          @keydown.enter.prevent="apply(active)"
          @keydown.esc.prevent="ui.closePalette()"
        />
        <kbd class="cmdk__esc">esc</kbd>
      </div>

      <ul id="cmdk-list" class="cmdk__list" role="listbox" aria-label="Themes">
        <li
          v-for="(t, i) in results"
          :id="`cmdk-opt-${t.id}`"
          :key="t.id"
          class="cmdk__opt"
          :class="{ 'is-active': i === index }"
          role="option"
          :aria-selected="i === index"
          @click="apply(t)"
          @mousemove="index = i"
        >
          <span class="cmdk__swatch" aria-hidden="true">
            <span :style="{ background: t.swatch.background }" />
            <span :style="{ background: t.swatch.primary }" />
            <span :style="{ background: t.swatch.secondary }" />
          </span>
          <span class="cmdk__opt-meta">
            <span class="cmdk__opt-name">{{ t.label }}</span>
            <span class="cmdk__opt-tag">{{ t.tagline }}</span>
          </span>
          <span v-if="t.id === store.activeThemeId" class="cmdk__current">current</span>
        </li>
        <li v-if="!results.length" class="cmdk__empty">No themes match “{{ query }}”.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useUiStore } from "~/stores/ui";
import { themes } from "~/themes/registry";

const store = useThemeStore();
const ui = useUiStore();
const input = ref(null);
const query = ref("");
const index = ref(0);

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return themes;
  return themes.filter(
    (t) => t.label.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q)
  );
});
const active = computed(() => results.value[index.value] || null);

const move = (delta) => {
  const n = results.value.length;
  if (!n) return;
  index.value = (index.value + delta + n) % n;
};

const apply = (theme) => {
  if (!theme) return;
  store.setTheme(theme.id);
  ui.closePalette();
};

watch(query, () => {
  index.value = 0;
});

let lastFocused = null;
watch(
  () => ui.paletteOpen,
  (open) => {
    if (!import.meta.client) return;
    document.body.classList.toggle("overlay-open", open);
    if (open) {
      lastFocused = document.activeElement;
      query.value = "";
      index.value = 0;
      nextTick(() => input.value?.focus());
    } else {
      lastFocused?.focus?.({ preventScroll: true });
    }
  }
);

// Global ⌘K / Ctrl+K toggles the palette.
const onKey = (e) => {
  if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
    e.preventDefault();
    ui.togglePalette();
  } else if (e.key === "Escape" && ui.paletteOpen) {
    ui.closePalette();
  }
};

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  if (import.meta.client) document.body.classList.remove("overlay-open");
});
</script>

<style lang="scss" scoped>
.cmdk {
  position: fixed;
  inset: 0;
  z-index: $z-index-overlay + 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12vh 1rem 1rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}

.cmdk__modal {
  width: min(540px, 100%);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.cmdk__field {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--color-border);
}
.cmdk__icon { color: var(--color-text-muted); flex-shrink: 0; }
.cmdk__input {
  flex: 1;
  min-width: 0;
  background: none;
  border: 0;
  outline: none;
  color: var(--color-text-primary);
  font: inherit;
  font-size: 1rem;

  &::placeholder { color: var(--color-text-muted); }
}
.cmdk__esc {
  font-family: ui-monospace, monospace;
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text-muted);
}

.cmdk__list {
  list-style: none;
  margin: 0;
  padding: 0.4rem;
  max-height: 50vh;
  overflow-y: auto;
}
.cmdk__opt {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  cursor: pointer;

  &.is-active { background: var(--color-bg-surface); }
}
.cmdk__swatch {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 2.6rem;
  height: 1.4rem;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  flex-shrink: 0;

  span { display: block; height: 100%; }
}
.cmdk__opt-meta { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.cmdk__opt-name { font-weight: 700; color: var(--color-text-primary); }
.cmdk__opt-tag { font-size: 0.78rem; color: var(--color-text-muted); }
.cmdk__current {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-line);
  flex-shrink: 0;
}
.cmdk__empty { padding: 1rem 0.7rem; color: var(--color-text-muted); }

@media (prefers-reduced-motion: reduce) {
  .cmdk { backdrop-filter: none; }
}
</style>
