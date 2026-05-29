import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      home: {
        hero: {
          eyebrow: "Eyebrow",
          heading: "Hi I'm Tyler",
          paragraphs: ["Para 1", "Para 2"],
        },
        engineering: {
          heading: "Engineering",
          body: "I build things.",
          cta: "Resume",
          ctaUrl: "/resume",
          competenciesLabel: "Competencies",
          competencies: [
            { icon: "layers", label: "Architecture" },
            { icon: "code", label: "Coding", url: "https://example.com" },
            { icon: "users", label: "Leadership", url: "/resume" },
            { icon: "missing-icon", label: "No Icon" },
          ],
        },
        drums: {
          heading: "Music",
          body: "I drum.",
          cta: "Music",
          ctaUrl: "/music",
          studioLabel: "Studio",
          studio: { text: "Hybrid", ctaText: "Tour", url: "https://example.com/studio" },
        },
        beyond: {
          heading: "Beyond",
          cards: [
            { icon: "bicycle", label: "Bike", sub: "ride", detail: "I ride bikes" },
            { icon: "vinyl", label: "Vinyl", sub: "spin", detail: "spin records", url: "/extras" },
          ],
        },
      },
    },
  },
}));

const Index = (await import("~/pages/index.vue")).default;
const { useContentStore } = await import("~/stores/content");
const contentModule = await import("~/data/content.js");

describe("pages/index", () => {
  const restoreContent = () => {
    try {
      useContentStore().content = JSON.parse(
        JSON.stringify(contentModule.default.content)
      );
    } catch {}
  };

  beforeEach(() => setActivePinia(createPinia()));
  afterEach(() => restoreContent());

  it("renders the hero with eyebrow, heading, and paragraphs", async () => {
    const wrapper = await mountSuspended(Index);
    expect(wrapper.find(".hv2-eyebrow").text()).toBe("Eyebrow");
    expect(wrapper.find(".hv2-hero__heading").text()).toBe("Hi I'm Tyler");
    expect(wrapper.findAll(".hv2-hero__body")).toHaveLength(2);
  });

  it("renders the engineering section with body + CTA link + competencies", async () => {
    const wrapper = await mountSuspended(Index);
    const eng = wrapper.find(".hv2-engineering");
    expect(eng.find("h2").text()).toBe("Engineering");
    expect(eng.find(".hv2-btn--primary").text()).toContain("Resume");
    const comps = eng.findAll(".hv2-comp-item");
    expect(comps).toHaveLength(4);
  });

  it("renders competency as a plain <div> when no url", async () => {
    const wrapper = await mountSuspended(Index);
    const first = wrapper.findAll(".hv2-comp-item")[0];
    expect(first.element.tagName).toBe("DIV");
    expect(first.classes()).not.toContain("hv2-comp-item--linked");
  });

  it("renders competency as external <a> with target=_blank for an http URL", async () => {
    const wrapper = await mountSuspended(Index);
    const second = wrapper.findAll(".hv2-comp-item")[1];
    expect(second.element.tagName).toBe("A");
    expect(second.attributes("target")).toBe("_blank");
    expect(second.attributes("rel")).toBe("noopener noreferrer");
    expect(second.classes()).toContain("hv2-comp-item--linked");
  });

  it("renders competency as internal link (NuxtLink) for a non-http URL", async () => {
    const wrapper = await mountSuspended(Index);
    const third = wrapper.findAll(".hv2-comp-item")[2];
    expect(third.attributes("href")).toBe("/resume");
    expect(third.attributes("target")).toBeUndefined();
    expect(third.classes()).toContain("hv2-comp-item--linked");
  });

  it("renders an empty icon span when icon key is unknown", async () => {
    const wrapper = await mountSuspended(Index);
    const fourth = wrapper.findAll(".hv2-comp-item")[3];
    expect(fourth.find(".hv2-comp-icon").exists()).toBe(true);
    // No SVG rendered for missing icon key
    expect(fourth.find(".hv2-comp-icon svg").exists()).toBe(false);
  });

  it("renders the music section with studio callout (external)", async () => {
    const wrapper = await mountSuspended(Index);
    const callout = wrapper.find(".hv2-studio-callout");
    expect(callout.exists()).toBe(true);
    expect(callout.attributes("href")).toBe("https://example.com/studio");
    expect(callout.attributes("target")).toBe("_blank");
    expect(callout.text()).toContain("Studio");
    expect(callout.text()).toContain("Hybrid");
    expect(callout.text()).toContain("Tour");
    expect(callout.text()).toContain("↗");
  });

  it("renders an internal studio callout (NuxtLink) with → icon when URL is non-http", async () => {
    const wrapper = await mountSuspended(Index);
    const draft = JSON.parse(JSON.stringify(contentModule.default.content));
    draft.home.drums.studio = { text: "Local", ctaText: "Read", url: "/studio" };
    useContentStore().content = draft;
    await nextTick();
    const callout = wrapper.find(".hv2-studio-callout");
    expect(callout.attributes("href")).toBe("/studio");
    expect(callout.attributes("target")).toBeUndefined();
    expect(callout.text()).toContain("→");
  });

  it("renders studio callout as plain <div> when no URL is provided", async () => {
    const wrapper = await mountSuspended(Index);
    const draft = JSON.parse(JSON.stringify(contentModule.default.content));
    draft.home.drums.studio = { text: "No link" };
    useContentStore().content = draft;
    await nextTick();
    const callout = wrapper.find(".hv2-studio-callout");
    expect(callout.element.tagName).toBe("DIV");
    expect(callout.classes()).not.toContain("hv2-studio-callout--linked");
  });

  it("hides studio CTA text span when ctaText is absent", async () => {
    const wrapper = await mountSuspended(Index);
    const draft = JSON.parse(JSON.stringify(contentModule.default.content));
    delete draft.home.drums.studio.ctaText;
    useContentStore().content = draft;
    await nextTick();
    expect(wrapper.find(".hv2-studio-callout__cta").exists()).toBe(false);
  });

  it("renders beyond cards with click/hover state toggles", async () => {
    const wrapper = await mountSuspended(Index);
    const cards = wrapper.findAll(".hv2-beyond-card");
    expect(cards).toHaveLength(2);
    expect(cards[0].attributes("aria-expanded")).toBe("false");

    await cards[0].trigger("mouseenter");
    expect(cards[0].attributes("aria-expanded")).toBe("true");
    expect(cards[0].classes()).toContain("hv2-beyond-card--active");

    await cards[0].trigger("mouseleave");
    expect(cards[0].attributes("aria-expanded")).toBe("false");

    await cards[0].trigger("focus");
    expect(cards[0].attributes("aria-expanded")).toBe("true");

    await cards[0].trigger("blur");
    expect(cards[0].attributes("aria-expanded")).toBe("false");
  });

  it("renders a non-linked beyond card as a button with tabindex=0", async () => {
    const wrapper = await mountSuspended(Index);
    const cards = wrapper.findAll(".hv2-beyond-card");
    // First card has no url → role=button, tabindex=0
    expect(cards[0].attributes("role")).toBe("button");
    expect(cards[0].attributes("tabindex")).toBe("0");
    expect(cards[0].classes()).not.toContain("hv2-beyond-card--linked");
  });

  it("renders a linked beyond card without role/tabindex (it's a real link)", async () => {
    const wrapper = await mountSuspended(Index);
    const cards = wrapper.findAll(".hv2-beyond-card");
    // Second card has url="/extras" → internal NuxtLink, no role/tabindex
    expect(cards[1].attributes("href")).toBe("/extras");
    expect(cards[1].attributes("role")).toBeUndefined();
    expect(cards[1].attributes("tabindex")).toBeUndefined();
    expect(cards[1].classes()).toContain("hv2-beyond-card--linked");
  });

  it("renders empty home object without crashing", async () => {
    const wrapper = await mountSuspended(Index);
    useContentStore().content = {};
    await nextTick();
    // Computed defaults all return {}; sections still render with empty values
    expect(wrapper.find(".hv2").exists()).toBe(true);
  });
});
