import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Navigation from "~/components/Navigation.vue";

const nav = [
  { name: "Home", url: "/" },
  { name: "Resume", url: "/resume" },
];

describe("Navigation", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders nothing for an empty content array (no items)", async () => {
    const wrapper = await mountSuspended(Navigation, { props: { content: [] } });
    expect(wrapper.findAll(".navigation__item")).toHaveLength(0);
  });

  it("renders a NuxtLink per item", async () => {
    const wrapper = await mountSuspended(Navigation, { props: { content: nav } });
    const items = wrapper.findAll(".navigation__item");
    expect(items).toHaveLength(2);
    expect(items[0].text()).toBe("Home");
    expect(items[1].text()).toBe("Resume");
  });

  it("includes the ThemeToggle in the toggle slot", async () => {
    const wrapper = await mountSuspended(Navigation, { props: { content: nav } });
    expect(wrapper.find(".navigation__toggle .theme-toggle").exists()).toBe(true);
  });

  it("has an aria-label on the nav landmark", async () => {
    const wrapper = await mountSuspended(Navigation, { props: { content: nav } });
    expect(wrapper.find("nav").attributes("aria-label")).toBe("Main navigation");
  });
});
