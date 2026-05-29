import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      drums: [
        {
          type: "hero",
          src: "/hero.jpg",
          heading: "Drummer",
          content: ["Pro session work", "Touring"],
          cta: { label: "Listen", url: "https://example.com" },
        },
        { headingLevel: 2, heading: "Selected Work" },
        {
          credits: [
            { title: "Track A", detail: "Big Label, 2020" },
            { title: "Track B", detail: "Indie, 2021" },
          ],
        },
        {
          heading: "Discography",
          headingLevel: 3,
          albums: [
            {
              title: "Album One",
              format: "LP",
              year: 2018,
              label: "Records",
              image: "/a.jpg",
              alt: "Album One cover",
              url: "https://example.com/a",
              description: "Notes",
            },
            {
              title: "Album Two",
              format: "EP",
              year: 2019,
              label: "Records",
              image: "/b.jpg",
              alt: "Album Two cover",
            },
          ],
        },
        { headingLevel: 2, heading: "Bands" },
        {
          headingLevel: 3,
          heading: "The Band",
          roles: [
            { subheading: "Drummer · 2010-2015", content: ["Toured.", "• Bullet line", "**bold** statement"] },
            { subheading: "Drummer · No Date · Other", content: ["x"] },
            { subheading: "Just A Title", content: ["y"] },
          ],
        },
        {
          headingLevel: 3,
          heading: "Static Band",
          years: "2000-2005",
          roles: [{ subheading: "Drummer · 2000-2005", content: ["z"] }],
        },
        // A regular Article entry inside a section
        { headingLevel: 3, heading: "Notes", content: ["plain content"] },
      ],
    },
  },
}));

const Music = (await import("~/pages/music.vue")).default;
const { useContentStore } = await import("~/stores/content");
const contentModule = await import("~/data/content.js");

describe("pages/music", () => {
  const restoreContent = () => {
    try {
      useContentStore().content = JSON.parse(
        JSON.stringify(contentModule.default.content)
      );
    } catch {}
  };

  beforeEach(() => setActivePinia(createPinia()));
  afterEach(() => restoreContent());

  it("renders the hero section with background image, heading, paragraphs, and CTA", async () => {
    const wrapper = await mountSuspended(Music);
    const hero = wrapper.find(".music-hero");
    expect(hero.exists()).toBe(true);
    expect(hero.attributes("style")).toContain("/hero.jpg");
    expect(hero.find(".music-hero__heading").text()).toBe("Drummer");
    expect(hero.findAll(".music-hero__text")).toHaveLength(2);
    const cta = hero.find(".music-hero__btn");
    expect(cta.attributes("href")).toBe("https://example.com");
    expect(cta.attributes("target")).toBe("_blank");
  });

  it("hides the CTA when hero entry has no cta", async () => {
    const wrapper = await mountSuspended(Music);
    useContentStore().content = {
      drums: [{ type: "hero", src: "/x.jpg", heading: "H", content: ["c"] }],
    };
    await nextTick();
    expect(wrapper.find(".music-hero__btn").exists()).toBe(false);
  });

  it("renders a credits list", async () => {
    const wrapper = await mountSuspended(Music);
    const items = wrapper.findAll(".credits-list__item");
    expect(items).toHaveLength(2);
    expect(items[0].find(".credits-list__title").text()).toBe("Track A");
    expect(items[0].find(".credits-list__detail").text()).toBe("Big Label, 2020");
  });

  it("renders the discography list with cover links and metadata", async () => {
    const wrapper = await mountSuspended(Music);
    const albums = wrapper.findAll(".music-album");
    expect(albums).toHaveLength(2);
    // Album One has url → wrapped in cover link + Listen link
    expect(albums[0].find(".music-album__cover-link").exists()).toBe(true);
    expect(albums[0].find(".music-album__link").text()).toBe("Listen");
    expect(albums[0].find(".music-album__title").text()).toBe("Album One");
    expect(albums[0].find(".music-album__meta").text()).toBe("LP, 2018 · Records");
    expect(albums[0].find(".music-album__desc").text()).toBe("Notes");
    // Album Two has no url → no cover link, no Listen link, no desc
    expect(albums[1].find(".music-album__cover-link").exists()).toBe(false);
    expect(albums[1].find(".music-album__link").exists()).toBe(false);
    expect(albums[1].find(".music-album__desc").exists()).toBe(false);
  });

  it("renders a section heading from an h2-with-no-content entry", async () => {
    const wrapper = await mountSuspended(Music);
    const sectionHeadings = wrapper.findAll(".section-heading").map((h) => h.text());
    expect(sectionHeadings).toContain("Selected Work");
    expect(sectionHeadings).toContain("Bands");
  });

  it("renders a band employer entry with timeline of roles", async () => {
    const wrapper = await mountSuspended(Music);
    const band = wrapper.find("#the-band");
    expect(band.exists()).toBe(true);
    const items = wrapper.findAll(".timeline-item");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("computes role title and dates: strips trailing date segment", async () => {
    const wrapper = await mountSuspended(Music);
    // First role of The Band: "Drummer · 2010-2015"
    const titles = wrapper.findAll(".timeline-item__title").map((t) => t.text());
    const dates = wrapper.findAll(".timeline-item__dates").map((d) => d.text());
    expect(titles).toContain("Drummer");
    expect(dates).toContain("2010-2015");
  });

  it("keeps multi-segment subheading without a trailing date as-is", async () => {
    const wrapper = await mountSuspended(Music);
    const titles = wrapper.findAll(".timeline-item__title").map((t) => t.text());
    // "Drummer · No Date · Other" has no date suffix → full string is the title
    expect(titles).toContain("Drummer · No Date · Other");
  });

  it("falls back to the full subheading when there is no separator", async () => {
    const wrapper = await mountSuspended(Music);
    const titles = wrapper.findAll(".timeline-item__title").map((t) => t.text());
    expect(titles).toContain("Just A Title");
  });

  const employerOf = (wrapper, slug) => {
    const employers = wrapper.findAll(".article.employer");
    return employers.find((e) => e.find(`#${slug}`).exists());
  };

  it("uses entry.years as the dates fallback when provided", async () => {
    const wrapper = await mountSuspended(Music);
    const staticBand = employerOf(wrapper, "static-band");
    expect(staticBand).toBeDefined();
    const dates = staticBand.findAll(".timeline-item__dates").map((d) => d.text());
    expect(dates[0]).toBe("2000-2005");
  });

  it("toggles role expansion when the trigger is clicked", async () => {
    const wrapper = await mountSuspended(Music);
    const band = employerOf(wrapper, "the-band");
    const firstRole = band.findAll(".timeline-item")[0];
    expect(firstRole.classes()).not.toContain("timeline-item--expanded");
    await firstRole.find(".timeline-item__trigger").trigger("click");
    expect(firstRole.classes()).toContain("timeline-item--expanded");
    await firstRole.find(".timeline-item__trigger").trigger("click");
    expect(firstRole.classes()).not.toContain("timeline-item--expanded");
  });

  it("auto-expands all roles for an entry when route.hash matches its slug", async () => {
    const wrapper = await mountSuspended(Music, { route: "/music#the-band" });
    const band = employerOf(wrapper, "the-band");
    const items = band.findAll(".timeline-item");
    items.forEach((item) => {
      expect(item.classes()).toContain("timeline-item--expanded");
    });
  });

  it("formats bullets and **bold** inline markup in role content", async () => {
    const wrapper = await mountSuspended(Music, { route: "/music#the-band" });
    const band = employerOf(wrapper, "the-band");
    const firstRole = band.findAll(".timeline-item")[0];
    const paragraphs = firstRole.findAll("p");
    const bullet = paragraphs.find((p) => p.classes().includes("article__bullet-item"));
    expect(bullet).toBeDefined();
    expect(bullet.text()).toBe("Bullet line");
    expect(paragraphs.some((p) => p.find("strong").exists())).toBe(true);
  });

  it("renders a regular Article entry when not roles/credits/albums", async () => {
    const wrapper = await mountSuspended(Music);
    expect(wrapper.text()).toContain("plain content");
  });

  it("renders Page Not Found when drums content is missing", async () => {
    const wrapper = await mountSuspended(Music);
    useContentStore().content = {};
    await nextTick();
    expect(wrapper.text()).toContain("Page Not Found");
  });

  it("renders Page Not Found when content is fully null", async () => {
    const wrapper = await mountSuspended(Music);
    useContentStore().content = null;
    await nextTick();
    expect(wrapper.text()).toContain("Page Not Found");
  });

  it("tolerates roles with null/undefined subheadings", async () => {
    const wrapper = await mountSuspended(Music);
    useContentStore().content = {
      drums: [
        { headingLevel: 2, heading: "Bands" },
        {
          headingLevel: 3,
          heading: "Edge Cases",
          roles: [
            { subheading: null, content: ["a"] },
            { subheading: undefined, content: ["b"] },
            { content: ["c"] }, // no subheading key at all
          ],
        },
      ],
    };
    await nextTick();
    const items = wrapper.findAll(".timeline-item");
    expect(items).toHaveLength(3);
    items.forEach((item) => {
      expect(item.find(".timeline-item__dates").text()).toBe("");
    });
  });
});
