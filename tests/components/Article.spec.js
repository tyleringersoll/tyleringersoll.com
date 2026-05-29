import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Article from "~/components/Article.vue";

describe("Article", () => {
  describe("heading", () => {
    it("defaults to <h3> when no headingLevel is set", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title" } },
      });
      const h = wrapper.find("h3");
      expect(h.exists()).toBe(true);
      expect(h.text()).toBe("Title");
    });

    it("renders <h2> when headingLevel = 2", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", headingLevel: 2 } },
      });
      expect(wrapper.find("h2").exists()).toBe(true);
    });

    it("renders <h4> when headingLevel = 4", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", headingLevel: 4 } },
      });
      expect(wrapper.find("h4").exists()).toBe(true);
    });

    it("renders <h5> for any headingLevel >= 5", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", headingLevel: 5 } },
      });
      expect(wrapper.find("h5").exists()).toBe(true);
    });

    it("applies the 'first-heading' class when index = 0", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title" }, index: 0 },
      });
      expect(wrapper.find("h3").classes()).toContain("first-heading");
    });

    it("does not apply 'first-heading' for index > 0", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title" }, index: 2 },
      });
      expect(wrapper.find("h3").classes()).not.toContain("first-heading");
    });
  });

  describe("subheading", () => {
    it("defaults to one level deeper than heading (heading=3 → subheading=h4)", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", subheading: "Sub" } },
      });
      expect(wrapper.find("h4.article__subheading").exists()).toBe(true);
    });

    it("renders <h3> subheading when explicitly headingLevel=2", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", subheading: "Sub", headingLevel: 2 } },
      });
      expect(wrapper.find("h3.article__subheading").exists()).toBe(true);
    });

    it("caps subheading level at h6 (heading=6 → subheading=h6 fallback h5)", async () => {
      // headingLvl + 1 = 7, clamped to 6, but template only handles h3/h4/else h5
      const wrapper = await mountSuspended(Article, {
        props: { article: { heading: "Title", subheading: "Sub", headingLevel: 6 } },
      });
      expect(wrapper.find("h5.article__subheading").exists()).toBe(true);
    });
  });

  describe("content paragraphs", () => {
    it("renders one paragraph per content entry", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { content: ["one", "two", "three"] } },
      });
      const paragraphs = wrapper.findAll("article > p");
      expect(paragraphs).toHaveLength(3);
      expect(paragraphs[0].text()).toBe("one");
    });

    it("flags bullet paragraphs starting with •", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { content: ["• bulleted line", "normal"] } },
      });
      const paragraphs = wrapper.findAll("article > p");
      expect(paragraphs[0].classes()).toContain("article__bullet-item");
      expect(paragraphs[1].classes()).not.toContain("article__bullet-item");
    });

    it("uses inline style when contentStyle = 'inline' (• separators)", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { content: ["a", "b", "c"], contentStyle: "inline" } },
      });
      expect(wrapper.find(".article__inline-theme").exists()).toBe(true);
      expect(wrapper.findAll(".article__inline-item")).toHaveLength(3);
      // 2 bullets for 3 items (no trailing bullet)
      expect(wrapper.findAll(".article__bullet")).toHaveLength(2);
    });
  });

  describe("CTA", () => {
    it("renders no CTA when none is configured", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { content: ["x"] } },
      });
      expect(wrapper.find(".article__cta").exists()).toBe(false);
    });

    it("renders an external <a> with target=_blank for an https URL", async () => {
      const wrapper = await mountSuspended(Article, {
        props: {
          article: { cta: { label: "Visit", url: "https://example.com" } },
        },
      });
      const cta = wrapper.find("a.article__cta");
      expect(cta.exists()).toBe(true);
      expect(cta.attributes("href")).toBe("https://example.com");
      expect(cta.attributes("target")).toBe("_blank");
      expect(cta.attributes("rel")).toBe("noopener noreferrer");
      expect(cta.text()).toContain("↗");
    });

    it("renders an external <a> for a mailto: URL", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { cta: { label: "Email", url: "mailto:hi@example.com" } } },
      });
      expect(wrapper.find("a.article__cta").attributes("href")).toBe(
        "mailto:hi@example.com"
      );
    });

    it("respects an explicit external: true flag", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { cta: { label: "Go", url: "/internal", external: true } } },
      });
      expect(wrapper.find("a.article__cta").attributes("target")).toBe("_blank");
    });

    it("renders a NuxtLink with → icon for internal URLs", async () => {
      const wrapper = await mountSuspended(Article, {
        props: { article: { cta: { label: "More", url: "/resume" } } },
      });
      const cta = wrapper.find(".article__cta");
      expect(cta.exists()).toBe(true);
      // NuxtLink renders to <a href="/resume"> in test env
      expect(cta.attributes("target")).toBeUndefined();
      expect(cta.text()).toContain("→");
    });
  });

  it("yields its default slot", async () => {
    const wrapper = await mountSuspended(Article, {
      props: { article: {} },
      slots: { default: "<span class='extra'>hi</span>" },
    });
    expect(wrapper.find(".extra").exists()).toBe(true);
  });
});
