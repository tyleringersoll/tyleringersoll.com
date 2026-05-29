import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Timeline from "~/components/Timeline.vue";

describe("Timeline", () => {
  it("renders the .timeline wrapper and yields its default slot", async () => {
    const wrapper = await mountSuspended(Timeline, {
      slots: { default: "<span class='child'>x</span>" },
    });
    expect(wrapper.classes()).toContain("timeline");
    expect(wrapper.find(".child").exists()).toBe(true);
  });
});
