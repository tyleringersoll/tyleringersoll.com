import { defineStore } from "pinia";
import { themes, DEFAULT_THEME_ID, getTheme, nextThemeId } from "~/themes/registry";

// Two orthogonal axes drive the look of the site, both reflected as attributes on
// <html> so CSS tokens and the pre-paint script in nuxt.config can read them:
//   data-theme="<id>"     → which theme (skin) is active
//   data-mode="light|dark" → only meaningful when the active theme supportsModes
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
    init() {
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
      this.activeThemeId = theme.id;
      if (!this.supportsModes) {
        this.isDark = (theme.defaultMode || "dark") === "dark";
      }
      localStorage.setItem(STORAGE_THEME, this.activeThemeId);
      this._beginTransition();
      this._apply();
    },

    cycleTheme() {
      this.setTheme(nextThemeId(this.activeThemeId));
    },

    toggleMode() {
      if (!this.supportsModes) return;
      this.isDark = !this.isDark;
      localStorage.setItem(STORAGE_MODE, this.isDark ? "dark" : "light");
      this._beginTransition();
      this._apply();
    },

    // Back-compat alias for the light/dark toggle.
    toggle() {
      this.toggleMode();
    },

    _beginTransition() {
      document.documentElement.classList.add("theme-transitioning");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 2000);
    },

    _apply() {
      const el = document.documentElement;
      el.setAttribute("data-theme", this.activeThemeId);
      el.setAttribute("data-mode", this.isDark ? "dark" : "light");
    },
  },
});
