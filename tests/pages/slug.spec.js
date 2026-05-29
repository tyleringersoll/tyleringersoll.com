import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      home: [{ heading: "Welcome", content: ["hi"] }],
      architecture: [{ heading: "Arch", content: ["x"] }],
    },
  },
}));

const Slug = (await import("~/pages/[...slug].vue")).default;
const { useContentStore } = await import("~/stores/content");

describe("pages/[...slug]", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("looks up content by 'home' for the root route", async () => {
    const wrapper = await mountSuspended(Slug, { route: "/" });
    expect(wrapper.find(".container.home").exists()).toBe(true);
    expect(wrapper.text()).toContain("Welcome");
  });

  it("looks up content by route name (path slice 1) for nested routes", async () => {
    const wrapper = await mountSuspended(Slug, { route: "/architecture" });
    expect(wrapper.find(".container.architecture").exists()).toBe(true);
    expect(wrapper.text()).toContain("Arch");
  });

  it("renders the page-not-found block when the route has no content entry", async () => {
    const wrapper = await mountSuspended(Slug, { route: "/missing" });
    expect(wrapper.text()).toContain("Page Not Found");
    expect(wrapper.text()).toContain("The requested page could not be found.");
  });

  it("renders Page Not Found when the store has no content at all", async () => {
    const wrapper = await mountSuspended(Slug, { route: "/" });
    useContentStore().content = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Page Not Found");
  });
});
