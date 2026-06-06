import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "~/stores/theme";

const dataTheme = () => document.documentElement.getAttribute("data-theme");
const dataMode = () => document.documentElement.getAttribute("data-mode");
const clearCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; Path=/`;
};

describe("stores/theme", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    clearCookie("theme-id");
    clearCookie("theme-mode");
    clearCookie("theme");
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-mode");
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to the default theme in dark mode", () => {
    const store = useThemeStore();
    expect(store.activeThemeId).toBe("signal-flow");
    expect(store.isDark).toBe(true);
    expect(store.mode).toBe("dark");
  });

  describe("applyStored", () => {
    it("applies a saved theme id + mode and reflects them on <html>", () => {
      localStorage.setItem("theme-id", "signal-flow");
      localStorage.setItem("theme-mode", "light");
      const store = useThemeStore();
      store.applyStored();
      expect(store.activeThemeId).toBe("signal-flow");
      expect(store.isDark).toBe(false);
      expect(dataTheme()).toBe("signal-flow");
      expect(dataMode()).toBe("light");
    });

    it("migrates a legacy saved theme id to its renamed equivalent", () => {
      localStorage.setItem("theme-id", "editorial");
      const store = useThemeStore();
      store.applyStored();
      expect(store.activeThemeId).toBe("reel-to-reel");
    });

    it("falls back to the legacy 'theme' key for mode", () => {
      localStorage.setItem("theme", "light");
      const store = useThemeStore();
      store.applyStored();
      expect(store.isDark).toBe(false);
    });

    it("falls back to theme cookies when localStorage is empty", () => {
      document.cookie = "theme-id=reel-to-reel; Path=/";
      document.cookie = "theme-mode=light; Path=/";
      const store = useThemeStore();
      store.applyStored();
      expect(store.activeThemeId).toBe("reel-to-reel");
      expect(store.isDark).toBe(true); // reel-to-reel is dark-only
      expect(dataTheme()).toBe("reel-to-reel");
    });

    it("falls back to the default theme for an unknown saved id", () => {
      localStorage.setItem("theme-id", "does-not-exist");
      const store = useThemeStore();
      store.applyStored();
      expect(store.activeThemeId).toBe("signal-flow");
    });

    it("forces a non-mode theme onto its default mode", () => {
      localStorage.setItem("theme-id", "reel-to-reel");
      localStorage.setItem("theme-mode", "light");
      const store = useThemeStore();
      store.applyStored();
      expect(store.activeThemeId).toBe("reel-to-reel");
      expect(store.supportsModes).toBe(false);
      expect(store.isDark).toBe(true); // editorial defaultMode is dark
    });

    it("falls back to prefers-color-scheme when no saved mode (dark match)", () => {
      vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true });
      const store = useThemeStore();
      store.applyStored();
      expect(store.isDark).toBe(true);
    });

    it("falls back to light when prefers-color-scheme: dark does not match", () => {
      vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false });
      const store = useThemeStore();
      store.applyStored();
      expect(store.isDark).toBe(false);
      expect(dataMode()).toBe("light");
    });
  });

  describe("toggleMode / toggle", () => {
    it("flips isDark, persists, applies attributes, and starts the transition", () => {
      const store = useThemeStore();
      store.toggle();
      expect(store.isDark).toBe(false);
      expect(localStorage.getItem("theme-mode")).toBe("light");
      expect(dataMode()).toBe("light");
      expect(
        document.documentElement.classList.contains("theme-transitioning")
      ).toBe(true);

      store.toggleMode();
      expect(store.isDark).toBe(true);
      expect(dataMode()).toBe("dark");
    });

    it("is a no-op when the active theme doesn't support modes", () => {
      const store = useThemeStore();
      store.setTheme("reel-to-reel");
      vi.advanceTimersByTime(300); // theme swap is fade-deferred
      const before = store.isDark;
      store.toggleMode();
      expect(store.isDark).toBe(before);
    });

    it("removes the theme-transitioning class after 2s", () => {
      const store = useThemeStore();
      store.toggle();
      expect(
        document.documentElement.classList.contains("theme-transitioning")
      ).toBe(true);
      vi.advanceTimersByTime(2000);
      expect(
        document.documentElement.classList.contains("theme-transitioning")
      ).toBe(false);
    });
  });

  describe("theme switching", () => {
    it("setTheme updates + persists the active theme and reflects it on <html>", () => {
      const store = useThemeStore();
      store.setTheme("reel-to-reel");
      vi.advanceTimersByTime(300); // theme swap is fade-deferred
      expect(store.activeThemeId).toBe("reel-to-reel");
      expect(localStorage.getItem("theme-id")).toBe("reel-to-reel");
      expect(document.cookie).toContain("theme-id=reel-to-reel");
      expect(dataTheme()).toBe("reel-to-reel");
    });

    it("setTheme is a no-op when the requested theme is already active", () => {
      const store = useThemeStore();
      store.setTheme("signal-flow");

      expect(document.documentElement.classList.contains("theme-fading")).toBe(false);
      expect(store.activeThemeId).toBe("signal-flow");
      vi.advanceTimersByTime(300);
      expect(store.activeThemeId).toBe("signal-flow");
    });

    it("cycleTheme advances to the next registered theme and wraps around", () => {
      const store = useThemeStore();
      store.cycleTheme();
      vi.advanceTimersByTime(300);
      expect(store.activeThemeId).toBe("reel-to-reel");
      expect(store.isDark).toBe(true); // editorial is dark-only
      store.cycleTheme();
      vi.advanceTimersByTime(300);
      expect(store.activeThemeId).toBe("signal-flow");
    });

    it("fades the app out before swapping, then swaps while invisible", () => {
      const store = useThemeStore();
      store.setTheme("reel-to-reel");
      // Fade-out class is applied immediately; the swap hasn't happened yet.
      expect(document.documentElement.classList.contains("theme-fading")).toBe(true);
      expect(store.activeThemeId).toBe("signal-flow");
      // After the fade-out window, the swap runs.
      vi.advanceTimersByTime(300);
      expect(store.activeThemeId).toBe("reel-to-reel");
    });

    it("exposes supportsModes + hasMultipleThemes from the registry", () => {
      const store = useThemeStore();
      expect(store.supportsModes).toBe(true);
      expect(store.hasMultipleThemes).toBe(true);
    });
  });
});
