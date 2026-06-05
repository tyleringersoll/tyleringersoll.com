import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import themePlugin from "~/plugins/theme.client";
import { useThemeStore } from "~/stores/theme";

describe("plugins/theme.client", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-mode");
  });

  it("calls store.init() on plugin invocation", () => {
    const initSpy = vi.spyOn(useThemeStore(), "init");
    themePlugin();
    expect(initSpy).toHaveBeenCalledOnce();
  });

  it("syncs the mode attribute from a saved 'light' preference", () => {
    localStorage.setItem("theme-mode", "light");
    themePlugin();
    const store = useThemeStore();
    expect(store.isDark).toBe(false);
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });
});
