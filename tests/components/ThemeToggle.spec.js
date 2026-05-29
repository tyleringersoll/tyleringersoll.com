import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import ThemeToggle from "~/components/ThemeToggle.vue";
import { useThemeStore } from "~/stores/theme";

async function mountWithMode(isDark) {
  const wrapper = await mountSuspended(ThemeToggle);
  const store = useThemeStore();
  store.isDark = isDark;
  await nextTick();
  return { wrapper, store };
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("shows the sun icon and 'switch to light' label when in dark mode", async () => {
    const { wrapper } = await mountWithMode(true);
    const button = wrapper.find("button.theme-toggle");
    expect(button.attributes("aria-label")).toBe("Switch to light mode");
    expect(button.attributes("aria-pressed")).toBe("false");
    expect(wrapper.find("circle").exists()).toBe(true);
  });

  it("shows the moon icon and 'switch to dark' label when in light mode", async () => {
    const { wrapper } = await mountWithMode(false);
    const button = wrapper.find("button.theme-toggle");
    expect(button.attributes("aria-label")).toBe("Switch to dark mode");
    expect(button.attributes("aria-pressed")).toBe("true");
    expect(wrapper.find("circle").exists()).toBe(false);
  });

  it("invokes store.toggle() when clicked", async () => {
    const { wrapper, store } = await mountWithMode(true);
    await wrapper.find("button").trigger("click");
    expect(store.isDark).toBe(false);
  });
});
