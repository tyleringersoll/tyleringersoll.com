import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { defineComponent, h, nextTick } from "vue";
import Themed from "~/components/Themed.vue";
import { useThemeStore } from "~/stores/theme";

// Harness that renders the page-view through the Themed resolver, exactly like
// pages/index.vue does.
const Harness = defineComponent({
  setup() {
    return () => h(Themed, { name: "HomeView" });
  },
});

describe("Themed resolver", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders the default theme's HomeView initially", async () => {
    const wrapper = await mountSuspended(Harness);
    expect(wrapper.find(".hv2").exists()).toBe(true);
    expect(wrapper.find(".ed-frame").exists()).toBe(false);
  });

  it("swaps the whole view to the editorial theme when the theme changes", async () => {
    const wrapper = await mountSuspended(Harness);
    const store = useThemeStore();

    // The swap is fade-deferred (~300ms), so wait it out.
    store.setTheme("editorial");
    await new Promise((r) => setTimeout(r, 350));
    await nextTick();

    // Editorial markup is now mounted; the default markup is gone.
    expect(wrapper.find(".ed-frame").exists()).toBe(true);
    expect(wrapper.find(".bigname").exists()).toBe(true);
    expect(wrapper.find(".hv2").exists()).toBe(false);

    // ...and back again.
    store.setTheme("default");
    await new Promise((r) => setTimeout(r, 350));
    await nextTick();
    expect(wrapper.find(".hv2").exists()).toBe(true);
    expect(wrapper.find(".ed-frame").exists()).toBe(false);
  });
});
