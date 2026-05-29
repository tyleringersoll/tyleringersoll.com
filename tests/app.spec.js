import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import App from "~/app.vue";

describe("app.vue", () => {
  it("renders inside NuxtLayout with NuxtPage as the page surface", async () => {
    const wrapper = await mountSuspended(App, { route: "/" });
    // The default layout renders the skip-nav and main scaffolding.
    expect(wrapper.find("a.skip-nav").exists()).toBe(true);
    expect(wrapper.find("main#main-content").exists()).toBe(true);
  });
});
