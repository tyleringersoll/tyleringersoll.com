import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      architecture: [
        {
          headingLevel: 2,
          heading: "Introduction",
          content: [
            "This site is built with Nuxt.",
            "Static generation keeps it fast.",
            "• A bullet point",
            "• Another bullet",
          ],
        },
        {
          headingLevel: 3,
          heading: "Performance",
          id: "performance",
          content: [
            "Edge caching and prerender.",
            "• Bundle splitting",
          ],
          scores: [
            { label: "Performance", value: 95 },
            { label: "Accessibility", value: 100 },
          ],
          optimizations: ["• Lazy load images", "• Inline critical CSS"],
        },
        {
          heading: "No heading level",
          content: ["plain section"],
        },
      ],
    },
  },
}));

const Architecture = (await import("~/pages/architecture.vue")).default;
const { useContentStore } = await import("~/stores/content");

describe("pages/architecture", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders the intro section with prose paragraphs and a bullet list", async () => {
    const wrapper = await mountSuspended(Architecture);
    const intro = wrapper.find(".arch-intro");
    expect(intro.exists()).toBe(true);
    expect(intro.find("h2").text()).toBe("Introduction");
    expect(intro.findAll(".arch-intro__body")).toHaveLength(2);
    const bullets = intro.findAll(".arch-list li");
    expect(bullets).toHaveLength(2);
    expect(bullets[0].text()).toBe("A bullet point");
  });

  it("renders content sections after the intro", async () => {
    const wrapper = await mountSuspended(Architecture);
    const sections = wrapper.findAll(".arch-section:not(.arch-intro)");
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it("uses the configured heading tag (h3) for content sections", async () => {
    const wrapper = await mountSuspended(Architecture);
    expect(wrapper.find(".arch-card h3.arch-card__title").exists()).toBe(true);
  });

  it("defaults to h3 when headingLevel is missing", async () => {
    const wrapper = await mountSuspended(Architecture);
    const titles = wrapper.findAll(".arch-card__title");
    // Both content cards default/explicit to h3.
    titles.forEach((t) => expect(t.element.tagName).toBe("H3"));
  });

  it("attaches the section id as the article anchor", async () => {
    const wrapper = await mountSuspended(Architecture);
    expect(wrapper.find("article#performance").exists()).toBe(true);
  });

  it("renders gauge SVGs with dynamic stroke-dashoffset per score", async () => {
    const wrapper = await mountSuspended(Architecture);
    const gauges = wrapper.findAll(".gauges__item");
    expect(gauges).toHaveLength(2);
    const values = gauges.map((g) => g.find(".gauge__value").text());
    expect(values).toEqual(["95", "100"]);
    const labels = gauges.map((g) => g.find(".gauges__label").text());
    expect(labels).toEqual(["Performance", "Accessibility"]);
  });

  it("renders the optimizations list when present", async () => {
    const wrapper = await mountSuspended(Architecture);
    const perfCard = wrapper.find("#performance");
    const optBullets = perfCard.findAll(".arch-list").map((ul) => ul.findAll("li"));
    // First arch-list = optimizations, second = bullets (from content)
    const optimizations = optBullets[0];
    expect(optimizations).toHaveLength(2);
    expect(optimizations[0].text()).toBe("Lazy load images");
    expect(optimizations[1].text()).toBe("Inline critical CSS");
  });

  it("renders Page Not Found when architecture content is missing (empty object)", async () => {
    const wrapper = await mountSuspended(Architecture);
    useContentStore().content = {};
    await nextTick();
    expect(wrapper.text()).toContain("Page Not Found");
  });

  it("renders Page Not Found when the store has no content at all", async () => {
    const wrapper = await mountSuspended(Architecture);
    useContentStore().content = null;
    await nextTick();
    expect(wrapper.text()).toContain("Page Not Found");
  });

  it("renders no intro section when the first entry is not h2", async () => {
    const wrapper = await mountSuspended(Architecture);
    useContentStore().content = {
      architecture: [
        { headingLevel: 3, heading: "Just a card", content: ["body"] },
      ],
    };
    await nextTick();
    expect(wrapper.find(".arch-intro").exists()).toBe(false);
    expect(wrapper.findAll(".arch-card")).toHaveLength(1);
  });

  it("omits gauges/optimizations/bullets when those keys are absent", async () => {
    const wrapper = await mountSuspended(Architecture);
    useContentStore().content = {
      architecture: [
        { headingLevel: 3, heading: "Plain", content: ["just prose"] },
      ],
    };
    await nextTick();
    expect(wrapper.find(".gauges").exists()).toBe(false);
    expect(wrapper.findAll(".arch-list")).toHaveLength(0);
  });
});
