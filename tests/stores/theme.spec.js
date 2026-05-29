import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useThemeStore } from "~/stores/theme";

describe("stores/theme", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.className = "";
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to dark mode", () => {
    const store = useThemeStore();
    expect(store.isDark).toBe(true);
  });

  describe("init", () => {
    it("respects a saved 'dark' preference", () => {
      localStorage.setItem("theme", "dark");
      const store = useThemeStore();
      store.isDark = false;
      store.init();
      expect(store.isDark).toBe(true);
      expect(document.documentElement.classList.contains("light-mode")).toBe(false);
    });

    it("respects a saved 'light' preference", () => {
      localStorage.setItem("theme", "light");
      const store = useThemeStore();
      store.init();
      expect(store.isDark).toBe(false);
      expect(document.documentElement.classList.contains("light-mode")).toBe(true);
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
      expect(document.documentElement.classList.contains("light-mode")).toBe(true);
    });
  });

  describe("toggle", () => {
    it("flips isDark, persists, and applies the class", () => {
      const store = useThemeStore();
      expect(store.isDark).toBe(true);

      store.toggle();
      expect(store.isDark).toBe(false);
      expect(localStorage.getItem("theme")).toBe("light");
      expect(document.documentElement.classList.contains("light-mode")).toBe(true);
      expect(document.documentElement.classList.contains("theme-transitioning")).toBe(true);

      store.toggle();
      expect(store.isDark).toBe(true);
      expect(localStorage.getItem("theme")).toBe("dark");
      expect(document.documentElement.classList.contains("light-mode")).toBe(false);
    });

    it("removes the theme-transitioning class after 2s", () => {
      const store = useThemeStore();
      store.toggle();
      expect(document.documentElement.classList.contains("theme-transitioning")).toBe(true);
      vi.advanceTimersByTime(2000);
      expect(document.documentElement.classList.contains("theme-transitioning")).toBe(false);
    });
  });
});
