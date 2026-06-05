import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import CommandPalette from "~/components/CommandPalette.vue";
import { useThemeStore } from "~/stores/theme";
import { useUiStore } from "~/stores/ui";

describe("CommandPalette", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("opens on Cmd+K and closes on Escape", async () => {
    const wrapper = await mountSuspended(CommandPalette);
    const ui = useUiStore();
    expect(wrapper.find(".cmdk").exists()).toBe(false);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
    await nextTick();
    expect(ui.paletteOpen).toBe(true);
    expect(wrapper.find(".cmdk__input").exists()).toBe(true);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();
    expect(ui.paletteOpen).toBe(false);
  });

  it("arrow-navigates and applies the selected theme on Enter", async () => {
    const wrapper = await mountSuspended(CommandPalette);
    const ui = useUiStore();
    const store = useThemeStore();
    const spy = vi.spyOn(store, "setTheme");

    ui.openPalette();
    await nextTick();
    expect(wrapper.findAll(".cmdk__opt").length).toBe(2);

    const input = wrapper.find(".cmdk__input");
    await input.trigger("keydown", { key: "ArrowDown" }); // select 2nd (editorial)
    await input.trigger("keydown", { key: "Enter" });

    expect(spy).toHaveBeenCalledWith("reel-to-reel");
    expect(ui.paletteOpen).toBe(false);
  });

  it("filters the list by query", async () => {
    const wrapper = await mountSuspended(CommandPalette);
    useUiStore().openPalette();
    await nextTick();

    await wrapper.find(".cmdk__input").setValue("reel");
    await nextTick();
    const opts = wrapper.findAll(".cmdk__opt");
    expect(opts.length).toBe(1);
    expect(opts[0].text()).toContain("Reel-to-Reel");
  });
});
