import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      home: { connect: { heading: "Get in touch", subtext: "Anytime", cta: "Email me" } },
    },
  },
}));

const Footer = (await import("~/components/Footer.vue")).default;
const { useContentStore } = await import("~/stores/content");

const footerContent = {
  socialHeading: "Connect",
  socialIcons: [
    { alt: "github", url: "https://github.com/x", svg: "<svg id='gh'/>", title: "GitHub" },
    { alt: "email", url: "mailto:hi@example.com", svg: "<svg id='em'/>" },
  ],
  legal: ["© {YEAR} Tyler", "All rights reserved {YEAR}."],
};

describe("Footer", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("renders nothing when content prop is missing", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: null } });
    expect(wrapper.find("footer").exists()).toBe(false);
  });

  it("renders the connect heading + subtext + CTA pulled from the content store", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    expect(wrapper.find(".footer-heading").text()).toBe("Get in touch");
    expect(wrapper.find(".footer-sub").text()).toBe("Anytime");
    expect(wrapper.find(".footer-btn").text()).toBe("Email me");
  });

  it("uses an empty connect object when the store has no home.connect data", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    useContentStore().content = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".footer-heading").text()).toBe("");
    expect(wrapper.find(".footer-sub").text()).toBe("");
    expect(wrapper.find(".footer-btn").text()).toBe("");
  });

  it("renders one social link per icon", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    expect(wrapper.findAll(".footer-social-circle")).toHaveLength(2);
  });

  it("opens external social links in a new tab with rel=noopener", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    const githubLink = wrapper.findAll(".footer-social-circle")[0];
    expect(githubLink.attributes("target")).toBe("_blank");
    expect(githubLink.attributes("rel")).toBe("noopener noreferrer");
    expect(githubLink.attributes("aria-label")).toBe("GitHub");
  });

  it("does NOT add target/rel for mailto: links", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    const emailLink = wrapper.findAll(".footer-social-circle")[1];
    expect(emailLink.attributes("target")).toBeUndefined();
    expect(emailLink.attributes("rel")).toBeUndefined();
    expect(emailLink.attributes("aria-label")).toBe("email");
  });

  it("inlines the SVG inside the disk via v-html", async () => {
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    expect(wrapper.find("#gh").exists()).toBe(true);
  });

  it("substitutes {YEAR} placeholders with the current year", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-06-15"));
    const wrapper = await mountSuspended(Footer, { props: { content: footerContent } });
    const legalLines = wrapper.findAll(".footer-legal__text").map((el) => el.text());
    expect(legalLines[0]).toContain("2030");
    expect(legalLines[1]).toContain("2030");
    vi.useRealTimers();
  });

  it("renders no legal lines when prop.legal is missing or not an array", async () => {
    const wrapper = await mountSuspended(Footer, {
      props: { content: { ...footerContent, legal: null } },
    });
    expect(wrapper.findAll(".footer-legal__text")).toHaveLength(0);
  });
});
