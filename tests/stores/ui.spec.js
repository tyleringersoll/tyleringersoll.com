import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUiStore } from "~/stores/ui";

describe("stores/ui", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("opens, closes, toggles, and keeps overlays mutually exclusive", () => {
    const ui = useUiStore();
    expect(ui.drawerOpen).toBe(false);
    expect(ui.paletteOpen).toBe(false);

    ui.toggleDrawer();
    expect(ui.drawerOpen).toBe(true);

    ui.openPalette();
    expect(ui.paletteOpen).toBe(true);
    expect(ui.drawerOpen).toBe(false);

    ui.openDrawer();
    expect(ui.drawerOpen).toBe(true);
    expect(ui.paletteOpen).toBe(false);

    ui.toggleDrawer();
    expect(ui.drawerOpen).toBe(false);

    ui.togglePalette();
    expect(ui.paletteOpen).toBe(true);
    ui.togglePalette();
    expect(ui.paletteOpen).toBe(false);
  });
});
