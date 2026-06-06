import { defineStore } from "pinia";
import { themes, DEFAULT_THEME_ID, getTheme, nextThemeId } from "~/themes/registry";
import {
  LEGACY_MODE,
  resolveThemePreference,
  STORAGE_MODE,
  STORAGE_THEME,
  THEME_COOKIE_MAX_AGE,
} from "~/themes/meta";

// Two orthogonal axes drive the look of the site, both reflected as attributes on
// <html> so CSS tokens (and the pre-paint script in nuxt.config.ts) can read them:
//   data-theme="<id>"     → which theme (skin) is active
//   data-mode="light|dark" → only meaningful when the active theme supportsModes
//
// Generated pages cannot know localStorage, so the client boot plugin keeps any
// mismatched static HTML hidden until the saved theme's component tree is mounted.

function readCookie(name) {
  if (import.meta.server) return null;
  const prefix = `${name}=`;
  try {
    const row = document.cookie
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix));
    if (!row) return null;
    return decodeURIComponent(row.slice(prefix.length));
  } catch {
    return null;
  }
}

function readStorage(name) {
  if (import.meta.server) return null;
  try {
    return localStorage.getItem(name);
  } catch {
    return null;
  }
}

function writeStorage(name, value) {
  if (import.meta.server) return;
  try {
    localStorage.setItem(name, value);
  } catch {
    // Cookie persistence below still gives SSR-capable responses the preference.
  }
}

function writeCookie(name, value) {
  if (import.meta.server) return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${THEME_COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
  } catch {
    // Some privacy modes can reject cookie writes; localStorage may still succeed.
  }
}

function preferredFallbackMode() {
  if (import.meta.server || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches === false
    ? "light"
    : "dark";
}

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
    applyInitialPreference(themeId, mode, fallbackMode = "dark") {
      const preference = resolveThemePreference(themeId, mode, fallbackMode);
      this.activeThemeId = preference.themeId;
      this.isDark = preference.mode === "dark";
    },

    // Apply the persisted theme/mode. Client-only: called after hydration.
    applyStored() {
      if (import.meta.server) return;

      const savedId = readStorage(STORAGE_THEME) || readCookie(STORAGE_THEME);
      const savedMode =
        readStorage(STORAGE_MODE) ||
        readCookie(STORAGE_MODE) ||
        readStorage(LEGACY_MODE) ||
        readCookie(LEGACY_MODE);
      this.applyInitialPreference(savedId, savedMode, preferredFallbackMode());

      if (savedId || savedMode) {
        this._persist();
      }

      this._apply();
    },

    setTheme(id) {
      const theme = getTheme(id);
      if (theme.id === this.activeThemeId) return;

      // Fade the whole app out, swap the component tree while it's invisible, then
      // fade back in — the same opacity fade the page transitions use.
      this._fadeSwap(() => {
        this.applyInitialPreference(theme.id, this.mode, this.mode);
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
      writeStorage(STORAGE_THEME, this.activeThemeId);
      writeStorage(STORAGE_MODE, this.isDark ? "dark" : "light");
      writeCookie(STORAGE_THEME, this.activeThemeId);
      writeCookie(STORAGE_MODE, this.isDark ? "dark" : "light");
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
