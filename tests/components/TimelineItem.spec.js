import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import TimelineItem from "~/components/TimelineItem.vue";

describe("TimelineItem", () => {
  it("renders dates, title, and the configurable title tag", async () => {
    const wrapper = await mountSuspended(TimelineItem, {
      props: { dates: "2020 - 2024", title: "Senior Engineer", titleTag: "h3" },
    });
    expect(wrapper.find(".timeline-item__dates").text()).toBe("2020 - 2024");
    const title = wrapper.find(".timeline-item__title");
    expect(title.text()).toBe("Senior Engineer");
    expect(title.element.tagName).toBe("H3");
  });

  it("falls back to <h4> when no titleTag prop is provided", async () => {
    const wrapper = await mountSuspended(TimelineItem, {
      props: { title: "Role" },
    });
    expect(wrapper.find(".timeline-item__title").element.tagName).toBe("H4");
  });

  it("applies titleId to the title element when provided", async () => {
    const wrapper = await mountSuspended(TimelineItem, {
      props: { title: "Role", titleId: "my-role" },
    });
    expect(wrapper.find(".timeline-item__title").attributes("id")).toBe("my-role");
  });

  it("omits id attribute when titleId is empty", async () => {
    const wrapper = await mountSuspended(TimelineItem, {
      props: { title: "Role" },
    });
    expect(wrapper.find(".timeline-item__title").attributes("id")).toBeUndefined();
  });

  describe("non-expandable mode", () => {
    it("renders the always-visible content slot", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role" },
        slots: { default: "<p class='body'>details</p>" },
      });
      expect(wrapper.find(".timeline-item__content--visible .body").exists()).toBe(true);
      expect(wrapper.find(".timeline-item__content-wrapper").exists()).toBe(false);
    });

    it("does not render the trigger as a button", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role" },
      });
      const trigger = wrapper.find(".timeline-item__trigger");
      expect(trigger.attributes("role")).toBeUndefined();
      expect(trigger.attributes("tabindex")).toBeUndefined();
      expect(trigger.attributes("aria-expanded")).toBeUndefined();
    });

    it("does not emit toggle on click when not expandable", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role" },
      });
      await wrapper.find(".timeline-item__trigger").trigger("click");
      expect(wrapper.emitted("toggle")).toBeUndefined();
    });
  });

  describe("expandable mode", () => {
    it("sets role/tabindex/aria-expanded on the trigger", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true, expanded: false },
      });
      const trigger = wrapper.find(".timeline-item__trigger");
      expect(trigger.attributes("role")).toBe("button");
      expect(trigger.attributes("tabindex")).toBe("0");
      expect(trigger.attributes("aria-expanded")).toBe("false");
    });

    it("reflects expanded state in aria-expanded and modifier class", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true, expanded: true },
      });
      expect(wrapper.find(".timeline-item__trigger").attributes("aria-expanded")).toBe(
        "true"
      );
      expect(wrapper.classes()).toContain("timeline-item--expanded");
      expect(wrapper.classes()).toContain("timeline-item--expandable");
    });

    it("renders the toggle icon", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true },
      });
      expect(wrapper.find(".timeline-item__icon").exists()).toBe(true);
    });

    it("emits toggle on click", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true },
      });
      await wrapper.find(".timeline-item__trigger").trigger("click");
      expect(wrapper.emitted("toggle")).toHaveLength(1);
    });

    it("emits toggle on Enter keydown", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true },
      });
      await wrapper.find(".timeline-item__trigger").trigger("keydown.enter");
      expect(wrapper.emitted("toggle")).toHaveLength(1);
    });

    it("emits toggle on Space keydown", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true },
      });
      await wrapper.find(".timeline-item__trigger").trigger("keydown.space");
      expect(wrapper.emitted("toggle")).toHaveLength(1);
    });

    it("uses the animated content-wrapper, not the always-visible body", async () => {
      const wrapper = await mountSuspended(TimelineItem, {
        props: { title: "Role", expandable: true },
        slots: { default: "<p class='body'>details</p>" },
      });
      expect(wrapper.find(".timeline-item__content-wrapper .body").exists()).toBe(true);
      expect(wrapper.find(".timeline-item__content--visible").exists()).toBe(false);
    });
  });
});
