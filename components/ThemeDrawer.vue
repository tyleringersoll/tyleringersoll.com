<template>
  <div class="theme-drawer">
    <!-- Floating action button -->
    <button
      class="theme-fab"
      type="button"
      aria-label="Customize appearance"
      :aria-expanded="ui.drawerOpen"
      aria-controls="theme-drawer-panel"
      @click="ui.toggleDrawer()"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    </button>

    <!-- Overlay + panel -->
    <div
      class="theme-drawer__overlay"
      :class="{ 'is-open': ui.drawerOpen }"
      :aria-hidden="!ui.drawerOpen"
      v-bind="ui.drawerOpen ? {} : { inert: '' }"
      @click.self="ui.closeDrawer()"
    >
      <aside
        id="theme-drawer-panel"
        ref="panel"
        class="theme-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Customize appearance"
        tabindex="-1"
        @keydown.tab="trapFocus"
        @keydown.esc="ui.closeDrawer()"
      >
        <header class="theme-drawer__head">
          <div>
            <p class="theme-drawer__eyebrow">Under the hood</p>
            <h2 class="theme-drawer__title">Theme Selection</h2>
          </div>
          <button class="theme-drawer__close" type="button" aria-label="Close" @click="ui.closeDrawer()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </header>

        <!-- Theme picker -->
        <section class="theme-drawer__section">
          <h3 class="theme-drawer__label">Theme</h3>
          <ul class="theme-list">
            <li v-for="t in themes" :key="t.id">
              <button
                class="theme-card"
                type="button"
                :class="{ 'is-active': t.id === store.activeThemeId }"
                :aria-pressed="t.id === store.activeThemeId"
                @click="store.setTheme(t.id)"
              >
                <ThemeSwatch class="theme-card__swatch" :swatch="t.swatch" />
                <span class="theme-card__meta">
                  <span class="theme-card__name">{{ t.label }}</span>
                  <span class="theme-card__tag">{{ t.tagline }}</span>
                </span>
                <span v-if="t.id === store.activeThemeId" class="theme-card__check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
              </button>
            </li>
          </ul>
        </section>

        <!-- Light/dark (only for themes that support it) -->
        <section v-if="store.supportsModes" class="theme-drawer__section">
          <h3 class="theme-drawer__label">Mode</h3>
          <div class="mode-toggle">
            <button
              v-for="m in ['light', 'dark']"
              :key="m"
              class="mode-toggle__btn"
              type="button"
              :class="{ 'is-active': store.mode === m }"
              :aria-pressed="store.mode === m"
              @click="store.mode !== m && store.toggleMode()"
            >{{ m }}</button>
          </div>
        </section>

        <!-- Live design tokens -->
        <section class="theme-drawer__section">
          <h3 class="theme-drawer__label">
            Design tokens
            <span class="theme-drawer__label-note">{{ store.activeTheme.label }} · {{ store.mode }}</span>
          </h3>
          <pre class="tokens" aria-live="polite"><code><span v-for="t in tokens" :key="t.name" class="tokens__row"><span v-if="isColor(t.value)" class="tokens__chip" :style="{ background: t.value }" aria-hidden="true" /><span class="tokens__name">{{ t.name }}</span><span class="tokens__sep">: </span><span class="tokens__val">{{ t.value }}</span><span class="tokens__sep">;</span>
</span></code></pre>
        </section>

        <footer class="theme-drawer__foot">
          <button class="theme-drawer__kbd-hint" type="button" @click="openPalette">
            Search themes <kbd>{{ modKey }}</kbd><kbd>K</kbd>
          </button>
        </footer>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "~/stores/theme";
import { useUiStore } from "~/stores/ui";
import { themes } from "~/themes/registry";
import { useDesignTokens } from "~/composables/useDesignTokens";
import { useFocusTrap } from "~/composables/useFocusTrap";

const store = useThemeStore();
const ui = useUiStore();
const { tokens } = useDesignTokens();
const panel = ref(null);
const { trapFocus } = useFocusTrap(panel, () => ui.drawerOpen);

const isColor = (v) => /^(#|rgb|hsl)/i.test(v || "");

// Show the platform-correct shortcut hint. Default to the Mac glyph for SSR/first
// paint, then correct to "Ctrl" on non-Apple platforms after mount (the shortcut
// itself already accepts both Cmd and Ctrl).
const modKey = ref("⌘");
onMounted(() => {
  const ua = navigator.userAgent || navigator.platform || "";
  if (!/Mac|iPhone|iPad|iPod/i.test(ua)) modKey.value = "Ctrl";
});

const openPalette = () => {
  ui.closeDrawer();
  ui.openPalette();
};

let lastFocused = null;
watch(
  () => ui.drawerOpen,
  (open) => {
    if (!import.meta.client) return;
    document.body.classList.toggle("overlay-open", open);
    if (open) {
      lastFocused = document.activeElement;
      nextTick(() => panel.value?.focus({ preventScroll: true }));
    } else {
      lastFocused?.focus?.({ preventScroll: true });
    }
  }
);

onUnmounted(() => {
  if (import.meta.client) document.body.classList.remove("overlay-open");
});
</script>

<style lang="scss" scoped>
.theme-fab {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: $z-index-overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid var(--color-accent-line);
  background: var(--color-bg-surface);
  color: var(--color-accent-line);
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  transition: color 200ms ease, border-color 200ms ease, transform 200ms ease;
  @include focus-visible(3px);

  &:hover {
    color: var(--color-link);
    border-color: var(--color-link);
    transform: translateY(-2px);
  }

  @include respond-below(sm) {
    right: 1rem;
    bottom: 1rem;
  }
}

.theme-drawer__overlay {
  position: fixed;
  inset: 0;
  z-index: $z-index-overlay + 1;
  display: flex;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 240ms ease, visibility 0s linear 240ms;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;

    .theme-drawer__panel { transform: translateX(0); }
  }
}

.theme-drawer__panel {
  width: min(400px, 100vw);
  height: 100%;
  overflow-y: auto;
  padding: $spacing-lg;
  background: var(--color-bg-primary);
  border-left: 1px solid var(--color-border);
  box-shadow: -1rem 0 2.5rem rgba(0, 0, 0, 0.4);
  transform: translateX(100%);
  transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:focus { outline: none; }
}

.theme-drawer__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: $spacing-lg;
}
.theme-drawer__eyebrow {
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-line);
}
.theme-drawer__title {
  margin: 0.2rem 0 0;
  font-size: 1.5rem;
  color: var(--color-text-primary);
}
.theme-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  @include focus-visible(2px);

  &:hover { color: var(--color-link); border-color: var(--color-link); }
}

.theme-drawer__section { margin-bottom: $spacing-lg; }
.theme-drawer__label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: $spacing-sm;
  margin: 0 0 $spacing-sm;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.theme-drawer__label-note { text-transform: none; letter-spacing: 0.02em; color: var(--color-text-muted); }

.theme-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: $spacing-xs; }
.theme-card {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  width: 100%;
  padding: 0.7rem 0.85rem;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: border-color 180ms ease, transform 180ms ease;
  @include focus-visible(2px);

  &:hover { border-color: var(--color-accent-line); transform: translateY(-1px); }
  &.is-active { border-color: var(--color-accent-line); }

  &__swatch {
    --theme-swatch-width: 3rem;
    --theme-swatch-height: 1.6rem;
  }
  &__meta { display: flex; flex-direction: column; min-width: 0; flex: 1; }
  &__name { font-weight: 700; color: var(--color-text-primary); }
  &__tag { font-size: 0.78rem; color: var(--color-text-muted); }
  &__check { color: var(--color-accent-line); display: flex; flex-shrink: 0; }
}

.mode-toggle {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;

  &__btn {
    padding: 0.45rem 1.1rem;
    background: var(--color-bg-surface);
    color: var(--color-text-secondary);
    border: 0;
    cursor: pointer;
    text-transform: capitalize;
    font: inherit;
    @include focus-visible(2px);

    & + & { border-left: 1px solid var(--color-border); }
    &.is-active { background: var(--color-accent-line); color: var(--color-btn-primary-text); }
  }
}

.tokens {
  margin: 0;
  padding: $spacing-sm;
  background: var(--color-bg-deepest);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.72rem;
  line-height: 1.7;

  code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
  &__row { display: block; white-space: pre; }
  &__chip {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 2px;
    margin-right: 0.4rem;
    vertical-align: middle;
    border: 1px solid var(--color-border);
  }
  &__name { color: var(--color-accent-line); }
  &__sep { color: var(--color-text-muted); }
  &__val { color: var(--color-text-primary); }
}

.theme-drawer__foot { margin-top: $spacing-md; }
.theme-drawer__kbd-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 0;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  @include focus-visible(2px);

  &:hover { color: var(--color-link); }

  kbd {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    padding: 0.1rem 0.35rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-bg-surface);
    color: var(--color-text-secondary);
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-drawer__overlay,
  .theme-drawer__panel,
  .theme-fab,
  .theme-card { transition: none; }
}
</style>
