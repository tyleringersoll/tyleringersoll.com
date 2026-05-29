import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import MobileNav from "~/components/MobileNav.vue";

const nav = [
  { name: "Home", url: "/" },
  { name: "Resume", url: "/resume" },
];

let mqlListeners = [];
let mqlMatches = false;

function stubMatchMedia({ matches = false } = {}) {
  mqlMatches = matches;
  mqlListeners = [];
  const mql = {
    get matches() {
      return mqlMatches;
    },
    addEventListener: (_event, cb) => mqlListeners.push(cb),
    removeEventListener: (_event, cb) => {
      mqlListeners = mqlListeners.filter((l) => l !== cb);
    },
  };
  window.matchMedia = vi.fn(() => mql);
  return mql;
}

describe("MobileNav", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.body.className = "";
    stubMatchMedia({ matches: false });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts closed", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    const button = wrapper.find(".mobile-nav__button");
    expect(button.attributes("aria-expanded")).toBe("false");
    expect(button.attributes("aria-label")).toBe("Open mobile navigation");
    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
  });

  it("renders a link per nav item plus a ThemeToggle row", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    expect(wrapper.findAll(".mobile-nav__item")).toHaveLength(nav.length + 1);
    expect(wrapper.find(".mobile-nav__item--toggle .theme-toggle").exists()).toBe(true);
  });

  it("toggles open on hamburger click and sets body.menu-open", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find(".mobile-nav__button").attributes("aria-expanded")).toBe("true");
    expect(wrapper.find(".mobile-nav__button").attributes("aria-label")).toBe(
      "Close mobile navigation"
    );
    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(true);
    expect(document.body.classList.contains("menu-open")).toBe(true);
    expect(wrapper.emitted("nav:clicked")?.[0]).toEqual([true]);
  });

  it("toggle is a no-op when state already matches the requested value", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    // Open
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();
    const openEmits = wrapper.emitted("nav:clicked").length;
    // Trigger close-via-overlay-self-click twice; second is a no-op
    const overlay = wrapper.find(".mobile-nav__overlay");
    await overlay.trigger("click");
    vi.runAllTimers();
    await nextTick();
    await overlay.trigger("click");
    vi.runAllTimers();
    await nextTick();
    // Only one extra emit (the actual close)
    expect(wrapper.emitted("nav:clicked").length).toBe(openEmits + 1);
  });

  it("closes when a nav link is clicked", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    const firstLink = wrapper.find(".mobile-nav__item a");
    await firstLink.trigger("click");
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
    expect(document.body.classList.contains("menu-open")).toBe(false);
  });

  it("closes when the close button is clicked", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    await wrapper.find(".mobile-nav__close").trigger("click");
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
  });

  it("closes when the overlay backdrop (self-click) is clicked", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    await wrapper.find(".mobile-nav__overlay").trigger("click");
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
  });

  it("closes when Escape is pressed while open", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
  });

  it("ignores Escape while closed", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    const emitsBefore = wrapper.emitted("nav:clicked")?.length || 0;
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();
    expect(wrapper.emitted("nav:clicked")?.length || 0).toBe(emitsBefore);
  });

  it("closes when the viewport crosses to desktop width", async () => {
    const mql = stubMatchMedia({ matches: false });
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    // Trigger the registered change listener with matches=true
    mqlListeners.forEach((cb) => cb({ matches: true }));
    vi.runAllTimers();
    await nextTick();
    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);

    // matches:false should not re-toggle anything
    const stateEmits = wrapper.emitted("nav:clicked").length;
    mqlListeners.forEach((cb) => cb({ matches: false }));
    expect(wrapper.emitted("nav:clicked").length).toBe(stateEmits);
  });

  it("forces closed on mount if already at desktop width", async () => {
    stubMatchMedia({ matches: true });
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    expect(wrapper.find(".mobile-nav__overlay--active").exists()).toBe(false);
  });

  describe("Tab key focus trap", () => {
    const openMenu = async (wrapper) => {
      await wrapper.find(".mobile-nav__button").trigger("click");
      vi.runAllTimers();
      await nextTick();
    };

    // happy-dom's .focus() doesn't reliably update document.activeElement on
    // detached test nodes — assert via spies on each candidate's .focus().
    const setupTrapStubs = (panelEl) => {
      const focusables = Array.from(panelEl.querySelectorAll("a, button"));
      const realGCS = window.getComputedStyle;
      window.getComputedStyle = () =>
        ({ display: "block", visibility: "visible" });
      focusables.forEach((el) => {
        el.getClientRects = () => [{ left: 0, top: 0, right: 1, bottom: 1 }];
      });
      const spies = focusables.map((el) => vi.spyOn(el, "focus"));
      const panelFocusSpy = vi.spyOn(panelEl, "focus");
      const restore = () => {
        window.getComputedStyle = realGCS;
        spies.forEach((s) => s.mockRestore());
        panelFocusSpy.mockRestore();
      };
      return { focusables, spies, panelFocusSpy, restore };
    };

    it("falls back to focusing the panel when no focusable children are visible", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      // Force every child to report 0 rects → no focusable elements.
      panel.element.querySelectorAll("a, button").forEach((el) => {
        el.getClientRects = () => [];
      });
      const panelFocusSpy = vi.spyOn(panel.element, "focus");
      await panel.trigger("keydown.tab");
      expect(panelFocusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it("does not throw or trap when Tab fires while the menu is closed", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      expect(() => wrapper.find(".mobile-nav__panel").trigger("keydown.tab")).not.toThrow();
    });

    it("when active=panel, Tab moves focus to the first focusable", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      const { spies, restore } = setupTrapStubs(panel.element);
      // Make activeElement appear to be the panel via Object.defineProperty.
      Object.defineProperty(document, "activeElement", {
        configurable: true,
        get: () => panel.element,
      });
      await panel.trigger("keydown.tab");
      expect(spies[0]).toHaveBeenCalled();
      delete document.activeElement;
      restore();
    });

    it("when active=panel, Shift+Tab moves focus to the last focusable", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      const { spies, restore } = setupTrapStubs(panel.element);
      Object.defineProperty(document, "activeElement", {
        configurable: true,
        get: () => panel.element,
      });
      await panel.trigger("keydown.tab", { shiftKey: true });
      expect(spies[spies.length - 1]).toHaveBeenCalled();
      delete document.activeElement;
      restore();
    });

    it("wraps Tab from the last focusable back to the first", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      const { focusables, spies, restore } = setupTrapStubs(panel.element);
      Object.defineProperty(document, "activeElement", {
        configurable: true,
        get: () => focusables[focusables.length - 1],
      });
      await panel.trigger("keydown.tab");
      expect(spies[0]).toHaveBeenCalled();
      delete document.activeElement;
      restore();
    });

    it("wraps Shift+Tab from the first focusable back to the last", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      const { focusables, spies, restore } = setupTrapStubs(panel.element);
      Object.defineProperty(document, "activeElement", {
        configurable: true,
        get: () => focusables[0],
      });
      await panel.trigger("keydown.tab", { shiftKey: true });
      expect(spies[spies.length - 1]).toHaveBeenCalled();
      delete document.activeElement;
      restore();
    });

    it("does nothing when Tab is on a non-edge focusable", async () => {
      const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
      await openMenu(wrapper);
      const panel = wrapper.find(".mobile-nav__panel");
      const { focusables, spies, restore } = setupTrapStubs(panel.element);
      Object.defineProperty(document, "activeElement", {
        configurable: true,
        get: () => focusables[1],
      });
      await panel.trigger("keydown.tab");
      spies.forEach((s) => expect(s).not.toHaveBeenCalled());
      delete document.activeElement;
      restore();
    });
  });

  it("cleans up body class + listeners on unmount", async () => {
    const wrapper = await mountSuspended(MobileNav, { props: { content: nav } });
    await wrapper.find(".mobile-nav__button").trigger("click");
    vi.runAllTimers();
    await nextTick();

    wrapper.unmount();
    expect(document.body.classList.contains("menu-open")).toBe(false);
    expect(mqlListeners).toHaveLength(0);

    // Escape after unmount should not throw and not re-trigger anything
    expect(() =>
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    ).not.toThrow();
  });
});
