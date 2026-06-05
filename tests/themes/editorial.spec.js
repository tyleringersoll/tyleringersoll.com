import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";

import EditorialHeader from "~/themes/editorial/components/Header.vue";
import EditorialFooter from "~/themes/editorial/components/Footer.vue";
import HomeView from "~/themes/editorial/views/Home.vue";
import ResumeView from "~/themes/editorial/views/Resume.vue";
import MusicView from "~/themes/editorial/views/Music.vue";
import ArchitectureView from "~/themes/editorial/views/Architecture.vue";
import editorialTheme from "~/themes/editorial/manifest";

// The views read the real content store (auto-loaded from data/content.js), so a
// fresh Pinia is enough — no content mock needed.
describe("editorial theme", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("manifest is dark-only and overrides the expected component names", () => {
    expect(editorialTheme.id).toBe("editorial");
    expect(editorialTheme.supportsModes).toBe(false);
    expect(Object.keys(editorialTheme.components).sort()).toEqual(
      ["ArchitectureView", "Footer", "Header", "HomeView", "MusicView", "ResumeView"].sort()
    );
  });

  it("Header renders the masthead with brand, nav, and a theme switcher", async () => {
    const wrapper = await mountSuspended(EditorialHeader, {
      props: {
        content: { name: "Tyler Ingersoll" },
        navigation: [
          { name: "Home", url: "/" },
          { name: "Resume", url: "/resume" },
        ],
      },
    });
    expect(wrapper.find("header.masthead").exists()).toBe(true);
    // Brand name renders (v-html lives on a span inside the link, not the NuxtLink).
    expect(wrapper.find(".name").text()).toContain("Tyler Ingersoll");
    expect(wrapper.findAll(".masthead__link")).toHaveLength(2);
    // A theme cycle button is present so the user is never stuck in a theme.
    expect(wrapper.find(".masthead .theme-cycle").exists()).toBe(true);
  });

  it("Footer renders mono legal lines (with {YEAR}) + amber social icons", async () => {
    const wrapper = await mountSuspended(EditorialFooter, {
      props: {
        content: {
          legal: ["Copyright ©{YEAR} Tyler Ingersoll."],
          socialIcons: [{ alt: "GitHub", url: "https://github.com/x", svg: "<svg/>" }],
        },
      },
    });
    expect(wrapper.find("footer.foot").exists()).toBe(true);
    expect(wrapper.find(".foot__c").text()).toContain(new Date().getFullYear().toString());
    expect(wrapper.findAll(".foot__soc a")).toHaveLength(1);
  });

  it("Home renders the outlined bigname, meta row, competencies, beyond, connect", async () => {
    const wrapper = await mountSuspended(HomeView);
    expect(wrapper.find(".bigname .l2").exists()).toBe(true);
    expect(wrapper.findAll(".meta > div")).toHaveLength(3);
    expect(wrapper.findAll(".comprow").length).toBeGreaterThan(0);
    expect(wrapper.findAll(".beyond .bcol").length).toBeGreaterThan(0);
    expect(wrapper.find(".connect .cbtn").exists()).toBe(true);
  });

  it("Resume renders the outlined title, employer entries, and skills grid", async () => {
    const wrapper = await mountSuspended(ResumeView);
    expect(wrapper.find(".ph-title .o").exists()).toBe(true);
    expect(wrapper.findAll(".entry").length).toBeGreaterThan(0);
    expect(wrapper.findAll(".skillgrid .sk")).toHaveLength(4);
    // Tech line becomes chips, bullets become dash list items
    expect(wrapper.findAll(".chip").length).toBeGreaterThan(0);
    expect(wrapper.findAll(".role li").length).toBeGreaterThan(0);
  });

  it("Music renders the hero, stat row, and timeline entries", async () => {
    const wrapper = await mountSuspended(MusicView);
    expect(wrapper.find(".mhero").exists()).toBe(true);
    expect(wrapper.findAll(".statrow .st").length).toBeGreaterThan(0);
    expect(wrapper.findAll(".entry").length).toBeGreaterThan(0);
  });

  it("Architecture renders arch rows and the Lighthouse scores grid", async () => {
    const wrapper = await mountSuspended(ArchitectureView);
    expect(wrapper.findAll(".arch").length).toBeGreaterThan(0);
    expect(wrapper.find(".scores").exists()).toBe(true);
    expect(wrapper.findAll(".scores .sc")).toHaveLength(4);
    expect(wrapper.findAll(".arch-r p.bul").length).toBeGreaterThan(0);
  });
});
