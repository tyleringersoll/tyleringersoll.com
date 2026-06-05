import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "~/stores/theme";

const dataTheme = () => document.documentElement.getAttribute("data-theme");
const dataMode = () => document.documentElement.getAttribute("data-mode");

describe("stores/theme", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
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
    expect(store.activeThemeId).toBe("default");
    expect(store.isDark).toBe(true);
    expect(store.mode).toBe("dark");
  });

  describe("init", () => {
    it("respects a saved 'dark' preference (new theme-mode key)", () => {
      localStorage.setItem("theme-mode", "dark");
      const store = useThemeStore();
      store.isDark = false;
      store.init();
      expect(store.isDark).toBe(true);
      expect(dataMode()).toBe("dark");
    });

    it("respects a saved 'light' preference (new theme-mode key)", () => {
      localStorage.setItem("theme-mode", "light");
      const store = useThemeStore();
      store.init();
      expect(store.isDark).toBe(false);
      expect(dataMode()).toBe("light");
    });

    it("falls back to the legacy 'theme' key for mode", () => {
      localStorage.setItem("theme", "light");
      const store = useThemeStore();
      store.init();
      expect(store.isDark).toBe(false);
      expect(dataMode()).toBe("light");
    });

    it("restores a saved theme id and reflects it on <html>", () => {
      localStorage.setItem("theme-id", "default");
      const store = useThemeStore();
      store.init();
      expect(store.activeThemeId).toBe("default");
      expect(dataTheme()).toBe("default");
    });

    it("falls back to the default theme for an unknown saved id", () => {
      localStorage.setItem("theme-id", "does-not-exist");
      const store = useThemeStore();
      store.init();
      expect(store.activeThemeId).toBe("default");
    });

    it("falls back to prefers-color-scheme: dark when no saved value (dark match)", () => {
      vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true });
      const store = useThemeStore();
      store.init();
      expect(store.isDark).toBe(true);
    });

    it("falls back to light when prefers-color-scheme: dark does not match", () => {
      vi.spyOn(window, "matchMedia").mockReturnValue({ matches: false });
      const store = useThemeStore();
      store.init();
      expect(store.isDark).toBe(false);
      expect(dataMode()).toBe("light");
    });
  });

  describe("toggleMode / toggle", () => {
    it("flips isDark, persists theme-mode, applies attributes, and transitions", () => {
      const store = useThemeStore();
      expect(store.isDark).toBe(true);

      store.toggle();
      expect(store.isDark).toBe(false);
      expect(localStorage.getItem("theme-mode")).toBe("light");
      expect(dataMode()).toBe("light");
      expect(
        document.documentElement.classList.contains("theme-transitioning")
      ).toBe(true);

      store.toggleMode();
      expect(store.isDark).toBe(true);
      expect(localStorage.getItem("theme-mode")).toBe("dark");
      expect(dataMode()).toBe("dark");
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
    it("setTheme persists theme-id and reflects it on <html>", () => {
      const store = useThemeStore();
      store.setTheme("default");
      expect(store.activeThemeId).toBe("default");
      expect(localStorage.getItem("theme-id")).toBe("default");
      expect(dataTheme()).toBe("default");
    });

    it("cycleTheme wraps back to the same theme when only one is registered", () => {
      const store = useThemeStore();
      store.cycleTheme();
      expect(store.activeThemeId).toBe("default");
    });

    it("exposes supportsModes from the active theme manifest", () => {
      const store = useThemeStore();
      expect(store.supportsModes).toBe(true);
    });
  });
});
