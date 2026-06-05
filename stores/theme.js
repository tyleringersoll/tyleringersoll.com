import { defineStore } from "pinia";
import { themes, DEFAULT_THEME_ID, getTheme, nextThemeId } from "~/themes/registry";

// Two orthogonal axes drive the look of the site, both reflected as attributes on
// <html> so CSS tokens (and the pre-paint script in nuxt.config) can read them:
//   data-theme="<id>"     → which theme (skin) is active
//   data-mode="light|dark" → only meaningful when the active theme supportsModes
//
// The site is statically prerendered with the DEFAULT theme, so the store must
// stay on the default theme through hydration (to match the static HTML) and only
// apply the saved theme afterwards — see plugins/theme.client.js, which calls
// applyStored() on app:mounted. Themes can swap whole component trees, so applying
// before hydration would mismatch and blank the page.
const STORAGE_THEME = "theme-id";
const STORAGE_MODE = "theme-mode";
const LEGACY_MODE = "theme"; // pre-multi-theme key, kept for back-compat

export const useThemeStore = defineStore("theme", {
  state: () => ({
    activeThemeId: DEFAULT_THEME_ID,
    isDark: true,
  }),

  getters: {
    activeTheme: (state) => getTheme(state.activeThemeId),
    mode: (state) => (state.isDark ? "dark" : "light"),
    supportsModes() {
      return this.activeTheme.supportsModes !== false;
    },
    // Drives whether the theme cycle button is shown; appears once a second
    // theme is registered.
    hasMultipleThemes: () => themes.length > 1,
  },

  actions: {
    // Apply the persisted theme/mode. Client-only: called after hydration.
    applyStored() {
      if (import.meta.server) return;

      this.activeThemeId = getTheme(localStorage.getItem(STORAGE_THEME)).id;

      const savedMode =
        localStorage.getItem(STORAGE_MODE) || localStorage.getItem(LEGACY_MODE);
      if (savedMode === "dark" || savedMode === "light") {
        this.isDark = savedMode === "dark";
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.isDark = prefersDark !== false;
      }

      if (!this.supportsModes) {
        this.isDark = (this.activeTheme.defaultMode || "dark") === "dark";
      }

      this._apply();
    },

    setTheme(id) {
      const theme = getTheme(id);
      // Fade the whole app out, swap the component tree while it's invisible, then
      // fade back in — the same opacity fade the page transitions use.
      this._fadeSwap(() => {
        this.activeThemeId = theme.id;
        if (!this.supportsModes) {
          this.isDark = (theme.defaultMode || "dark") === "dark";
        }
        this._persist();
        this._apply();
      });
    },

    cycleTheme() {
      this.setTheme(nextThemeId(this.activeThemeId));
    },

    toggleMode() {
      if (!this.supportsModes) return;
      this.isDark = !this.isDark;
      this._persist();
      this._beginTransition();
      this._apply();
    },

    // Back-compat alias for the light/dark toggle.
    toggle() {
      this.toggleMode();
    },

    _persist() {
      if (import.meta.server) return;
      localStorage.setItem(STORAGE_THEME, this.activeThemeId);
      localStorage.setItem(STORAGE_MODE, this.isDark ? "dark" : "light");
    },

    _beginTransition() {
      if (import.meta.server) return;
      document.documentElement.classList.add("theme-transitioning");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 2000);
    },

    // Fade the app out (CSS opacity on #__nuxt), run `swap` while invisible, fade in.
    // The 300ms must match the opacity transition in themes/tokens.scss. Honors
    // prefers-reduced-motion by swapping instantly.
    _fadeSwap(swap) {
      const reduce =
        import.meta.client &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (import.meta.server || reduce) {
        swap();
        return;
      }
      const el = document.documentElement;
      el.classList.add("theme-fading");
      setTimeout(() => {
        swap();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => el.classList.remove("theme-fading"))
        );
      }, 300);
    },

    _apply() {
      if (import.meta.server) return;
      const el = document.documentElement;
      el.setAttribute("data-theme", this.activeThemeId);
      el.setAttribute("data-mode", this.isDark ? "dark" : "light");
    },
  },
});
