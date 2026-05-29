import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      resume: [
        {
          headingLevel: 2,
          heading: "About",
          content: ["Intro paragraph one.", "Intro paragraph two."],
          cta: { label: "Download CV", url: "/cv.pdf", external: true },
        },
        { headingLevel: 2, heading: "Experience" },
        {
          headingLevel: 3,
          heading: "Best Egg",
          lead: "Frontend lead",
          roles: [
            {
              subheading: "Senior Engineer · 2022 - Present",
              content: [
                "• Shipped multiple customer products.",
                "Built a design system.",
                "<strong>Tech:</strong> Vue, TypeScript, Nuxt",
              ],
            },
            {
              subheading: "Engineer · 2019 - 2022",
              content: ["Earlier role."],
            },
          ],
        },
        { headingLevel: 2, heading: "Skills" },
        {
          headingLevel: 3,
          heading: "Skills",
          skills: {
            languages: ["TypeScript", "JavaScript"],
            frameworks: ["Vue", "Nuxt"],
            infrastructure: ["AWS"],
            concepts: ["Design Systems"],
            other: ["Drums"],
          },
        },
        { headingLevel: 2, heading: "Education" },
        {
          headingLevel: 3,
          heading: "University",
          content: ["BS Computer Science"],
          cta: { label: "Visit", url: "/u" },
        },
      ],
    },
  },
}));

const Resume = (await import("~/pages/resume.vue")).default;
const { useContentStore } = await import("~/stores/content");
const contentModule = await import("~/data/content.js");

describe("pages/resume", () => {
  const restoreContent = () => {
    try {
      useContentStore().content = JSON.parse(
        JSON.stringify(contentModule.default.content)
      );
    } catch {}
  };

  beforeEach(() => setActivePinia(createPinia()));
  afterEach(() => restoreContent());

  it("groups entries into sections by h2 boundaries (alternates --alt class)", async () => {
    const wrapper = await mountSuspended(Resume);
    const sections = wrapper.findAll(".resume-section");
    expect(sections.length).toBe(4);
    expect(sections[0].classes()).not.toContain("resume-section--alt");
    expect(sections[1].classes()).toContain("resume-section--alt");
  });

  it("renders the intro article with header + body + external CTA (↗ icon)", async () => {
    const wrapper = await mountSuspended(Resume);
    const intro = wrapper.find(".resume-intro");
    expect(intro.exists()).toBe(true);
    expect(intro.find("h2.first-heading").text()).toBe("About");
    expect(intro.findAll("p").length).toBeGreaterThanOrEqual(2);
    const cta = intro.find(".resume-intro__cta");
    expect(cta.exists()).toBe(true);
    expect(cta.attributes("target")).toBe("_blank");
    expect(cta.text()).toContain("Download CV");
    expect(cta.text()).toContain("↗");
  });

  it("renders an internal NuxtLink CTA with → icon for a non-external URL", async () => {
    const wrapper = await mountSuspended(Resume);
    // Education entry has cta with url "/u" (no external flag, no http prefix)
    // It's not rendered as intro (idx > 0), but it goes through the regular Article path,
    // which has its own CTA rendering. Just check the icon arrow is in the rendered output.
    expect(wrapper.text()).toContain("Visit");
    expect(wrapper.text()).toContain("→");
  });

  it("renders an h2 section heading for an h2 entry with no content/roles/skills", async () => {
    const wrapper = await mountSuspended(Resume);
    const headings = wrapper.findAll(".section-heading").map((h) => h.text());
    expect(headings).toContain("Experience");
    expect(headings).toContain("Skills");
    expect(headings).toContain("Education");
  });

  it("renders skill buckets with formatted category labels", async () => {
    const wrapper = await mountSuspended(Resume);
    const buckets = wrapper.findAll(".skills-bucket");
    expect(buckets.length).toBe(5);
    const labels = buckets.map((b) => b.find(".skills-bucket__heading").text());
    expect(labels).toEqual([
      "Languages",
      "Frameworks",
      "Infrastructure & Tools",
      "Architecture & Methodologies",
      "Other", // unknown key → capitalize first letter
    ]);
    const badges = buckets[0].findAll(".skill-badge").map((b) => b.text());
    expect(badges).toEqual(["TypeScript", "JavaScript"]);
  });

  it("renders an employer block with anchor id + lead + timeline of roles", async () => {
    const wrapper = await mountSuspended(Resume);
    expect(wrapper.find("h3#best-egg").exists()).toBe(true);
    expect(wrapper.find(".employer__lead").text()).toBe("Frontend lead");
    const bestEggArticle = wrapper.find("h3#best-egg").element.closest("article");
    const items = bestEggArticle.querySelectorAll(".timeline-item");
    expect(items.length).toBe(2);
  });

  it("splits role subheading 'Title · Dates' into title and dates", async () => {
    const wrapper = await mountSuspended(Resume);
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const titles = Array.from(articleEl.querySelectorAll(".timeline-item__title")).map((t) => t.textContent);
    const dates = Array.from(articleEl.querySelectorAll(".timeline-item__dates")).map((t) => t.textContent);
    expect(titles).toEqual(["Senior Engineer", "Engineer"]);
    expect(dates).toEqual(["2022 - Present", "2019 - 2022"]);
  });

  it("falls back to full subheading when there is no ' · ' separator", async () => {
    // Hot-mutate the store to include a role with no separator.
    const wrapper = await mountSuspended(Resume);
    const draft = JSON.parse(JSON.stringify(contentModule.default.content));
    draft.resume[2].roles.push({ subheading: "Just A Title", content: ["x"] });
    useContentStore().content = draft;
    await nextTick();
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const titles = Array.from(articleEl.querySelectorAll(".timeline-item__title")).map((t) => t.textContent);
    expect(titles).toContain("Just A Title");
    const datesForJust = Array.from(articleEl.querySelectorAll(".timeline-item__dates"))
      .map((t) => t.textContent)[2];
    expect(datesForJust).toBe("");
  });

  it("renders the tech-divider + tech pills for paragraphs starting with <strong>Tech:</strong>", async () => {
    const wrapper = await mountSuspended(Resume, { route: "/resume#best-egg" });
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const techPills = articleEl.querySelectorAll(".tech-pill");
    expect(techPills.length).toBe(3);
    expect(Array.from(techPills).map((p) => p.textContent)).toEqual([
      "Vue",
      "TypeScript",
      "Nuxt",
    ]);
    expect(articleEl.querySelector(".tech-divider")).not.toBeNull();
    expect(articleEl.querySelector(".tech-stack-label").textContent).toBe(
      "Core Tech Stack:"
    );
  });

  it("strips leading bullets ('• ...') from role paragraphs", async () => {
    const wrapper = await mountSuspended(Resume, { route: "/resume#best-egg" });
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const bulletItems = Array.from(
      articleEl.querySelectorAll(".article__bullet-item")
    ).map((p) => p.textContent.trim());
    expect(bulletItems).toContain("Shipped multiple customer products.");
  });

  it("toggles role expansion on click", async () => {
    const wrapper = await mountSuspended(Resume);
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const items = articleEl.querySelectorAll(".timeline-item");
    const first = items[0];
    expect(first.classList.contains("timeline-item--expanded")).toBe(false);
    first.querySelector(".timeline-item__trigger").click();
    await nextTick();
    expect(first.classList.contains("timeline-item--expanded")).toBe(true);
    first.querySelector(".timeline-item__trigger").click();
    await nextTick();
    expect(first.classList.contains("timeline-item--expanded")).toBe(false);
  });

  it("auto-expands all roles for the employer whose slug matches route.hash", async () => {
    const wrapper = await mountSuspended(Resume, { route: "/resume#best-egg" });
    const articleEl = wrapper.find("h3#best-egg").element.closest("article");
    const items = articleEl.querySelectorAll(".timeline-item");
    Array.from(items).forEach((item) =>
      expect(item.classList.contains("timeline-item--expanded")).toBe(true)
    );
  });

  it("renders nothing when resume content is missing", async () => {
    const wrapper = await mountSuspended(Resume);
    useContentStore().content = {};
    await nextTick();
    expect(wrapper.find(".resume-page").exists()).toBe(false);
  });

  it("renders nothing when store has no content at all", async () => {
    const wrapper = await mountSuspended(Resume);
    useContentStore().content = null;
    await nextTick();
    expect(wrapper.find(".resume-page").exists()).toBe(false);
  });
});
