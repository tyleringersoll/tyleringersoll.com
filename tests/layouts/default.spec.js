import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      meta: { name: "Tyler" },
      navigation: [{ name: "Home", url: "/" }],
      footer: {
        socialHeading: "Connect",
        socialIcons: [{ alt: "x", url: "https://x.com", svg: "<svg/>" }],
        legal: ["© 2026"],
      },
    },
  },
}));

const Default = (await import("~/layouts/default.vue")).default;
const { useContentStore } = await import("~/stores/content");

describe("layouts/default", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders skip-nav, header, footer, and the page slot", async () => {
    const wrapper = await mountSuspended(Default, {
      slots: { default: "<section class='page'>page</section>" },
    });
    expect(wrapper.find("a.skip-nav").attributes("href")).toBe("#main-content");
    expect(wrapper.find("header.header").exists()).toBe(true);
    expect(wrapper.find("main#main-content").exists()).toBe(true);
    expect(wrapper.find(".page").exists()).toBe(true);
    expect(wrapper.find("footer.footer").exists()).toBe(true);
  });

  it("falls back to empty defaults when store content is cleared (footer hidden)", async () => {
    const wrapper = await mountSuspended(Default);
    useContentStore().content = null;
    await nextTick();
    // Header still renders because the fallback meta={} is truthy.
    // Footer hides because the fallback socialHeading="" is falsy.
    expect(wrapper.find("footer.footer").exists()).toBe(false);
    expect(wrapper.find("main#main-content").exists()).toBe(true);
  });
});
