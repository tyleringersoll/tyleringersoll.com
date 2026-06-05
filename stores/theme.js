import { defineStore } from "pinia";
import { themes, DEFAULT_THEME_ID, getTheme, nextThemeId } from "~/themes/registry";

// Two orthogonal axes drive the look of the site, both reflected as attributes on
// <html> so CSS tokens (and the pre-paint script in nuxt.config.ts) can read them:
//   data-theme="<id>"     → which theme (skin) is active
//   data-mode="light|dark" → only meaningful when the active theme supportsModes
//
// Generated pages cannot know localStorage, so the client boot plugin keeps any
// mismatched static HTML hidden until the saved theme's component tree is mounted.
export const STORAGE_THEME = "theme-id";
export const STORAGE_MODE = "theme-mode";
export const LEGACY_MODE = "theme"; // pre-multi-theme key, kept for back-compat
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Themes were renamed to their UI names; map any value saved under the old ids so
// returning visitors keep their preference.
const LEGACY_THEME_IDS = { default: "signal-flow", editorial: "reel-to-reel" };

function normalizeThemeId(id) {
  return getTheme(LEGACY_THEME_IDS[id] || id).id;
}

function readCookie(name) {
  if (import.meta.server) return null;
  const prefix = `${name}=`;
  const row = document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix));
  return row ? decodeURIComponent(row.slice(prefix.length)) : null;
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
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
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
      this.activeThemeId = normalizeThemeId(themeId);

      if (mode === "dark" || mode === "light") {
        this.isDark = mode === "dark";
      } else {
        this.isDark = fallbackMode !== "light";
      }

      if (!this.supportsModes) {
        this.isDark = (this.activeTheme.defaultMode || "dark") === "dark";
      }
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
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      this.applyInitialPreference(
        savedId,
        savedMode,
        prefersDark === false ? "light" : "dark"
      );

      if (savedId || savedMode) {
        this._persist();
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
