import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Header from "~/components/Header.vue";

const meta = { name: "Tyler <em>Ingersoll</em>" };
const nav = [{ name: "Home", url: "/" }];

describe("Header", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders nothing when content prop is missing", async () => {
    const wrapper = await mountSuspended(Header, { props: { content: null, navigation: nav } });
    expect(wrapper.find("header").exists()).toBe(false);
  });

  it("renders avatar with alt referencing the name", async () => {
    const wrapper = await mountSuspended(Header, { props: { content: meta, navigation: nav } });
    const img = wrapper.find("img.header__avatar");
    expect(img.attributes("src")).toBe("/profile_avatar.webp");
    expect(img.attributes("alt")).toBe("Profile image of Tyler <em>Ingersoll</em>");
  });

  it("renders the brand name as HTML (v-html)", async () => {
    const wrapper = await mountSuspended(Header, { props: { content: meta, navigation: nav } });
    expect(wrapper.find(".header__name em").exists()).toBe(true);
  });

  it("renders a nav item per entry", async () => {
    const wrapper = await mountSuspended(Header, {
      props: {
        content: meta,
        navigation: [
          { name: "Home", url: "/" },
          { name: "Resume", url: "/resume" },
          { name: "Music", url: "/music" },
        ],
      },
    });
    expect(wrapper.findAll(".header__nav-item")).toHaveLength(3);
  });

  it("includes a ThemeToggle in the desktop nav", async () => {
    const wrapper = await mountSuspended(Header, { props: { content: meta, navigation: nav } });
    expect(wrapper.find(".header__nav .theme-toggle").exists()).toBe(true);
  });

  it("includes a MobileNav with the navigation prop", async () => {
    const wrapper = await mountSuspended(Header, { props: { content: meta, navigation: nav } });
    expect(wrapper.find(".header__mobile-nav").exists()).toBe(true);
  });
});
