import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import themePlugin from "~/plugins/theme.client";
import { useThemeStore } from "~/stores/theme";

describe("plugins/theme.client", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    // Run the rAF callback synchronously for the test.
    vi.stubGlobal("requestAnimationFrame", (cb) => {
      cb();
      return 0;
    });
  });

  it("applies the saved theme on app:suspense:resolve (after hydration), not before", () => {
    localStorage.setItem("theme-id", "reel-to-reel");
    const store = useThemeStore();
    const applySpy = vi.spyOn(store, "applyStored");

    // Capture the app:suspense:resolve callback the plugin registers.
    let resolveCb;
    const nuxtApp = {
      hook: (name, cb) => {
        if (name === "app:suspense:resolve") resolveCb = cb;
      },
    };

    themePlugin(nuxtApp);

    // Not applied yet — store stays on default through hydration.
    expect(applySpy).not.toHaveBeenCalled();
    expect(store.activeThemeId).toBe("signal-flow");

    // After the initial suspense resolves, the saved theme is applied.
    resolveCb();
    expect(applySpy).toHaveBeenCalledOnce();
    expect(store.activeThemeId).toBe("reel-to-reel");

    // Subsequent resolves (route changes) don't re-apply.
    resolveCb();
    expect(applySpy).toHaveBeenCalledOnce();
  });
});
