import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import ThemeDrawer from "~/components/ThemeDrawer.vue";
import { useThemeStore } from "~/stores/theme";
import { useUiStore } from "~/stores/ui";

describe("ThemeDrawer", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("FAB toggles the drawer open", async () => {
    const wrapper = await mountSuspended(ThemeDrawer);
    const ui = useUiStore();
    expect(ui.drawerOpen).toBe(false);
    await wrapper.find(".theme-fab").trigger("click");
    expect(ui.drawerOpen).toBe(true);
  });

  it("renders a card per theme with a 3-color swatch, and applies on click", async () => {
    const wrapper = await mountSuspended(ThemeDrawer);
    useUiStore().openDrawer();
    await nextTick();

    const cards = wrapper.findAll(".theme-card");
    expect(cards.length).toBe(2);
    expect(cards[0].findAll(".theme-card__swatch span").length).toBe(3);
    expect(cards[0].text()).toContain("Signal Flow");

    const store = useThemeStore();
    const spy = vi.spyOn(store, "setTheme");
    await cards[1].trigger("click");
    expect(spy).toHaveBeenCalledWith("reel-to-reel");
  });

  it("shows the live design-tokens block and a light/dark toggle for default", async () => {
    const wrapper = await mountSuspended(ThemeDrawer);
    useUiStore().openDrawer();
    await nextTick();

    expect(wrapper.findAll(".tokens__row").length).toBeGreaterThan(0);
    // The default ("Signal Flow") theme supports light/dark.
    expect(wrapper.findAll(".mode-toggle__btn").length).toBe(2);
  });
});
