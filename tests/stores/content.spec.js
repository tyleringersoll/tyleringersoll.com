import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";

vi.mock("~/data/content.js", () => ({
  default: {
    content: {
      home: { hero: { heading: "Hi" } },
      resume: [{ heading: "Work" }],
    },
  },
}));

const { useContentStore } = await import("~/stores/content");

describe("stores/content", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("hydrates state from the static content module", () => {
    const store = useContentStore();
    expect(store.content).toEqual({
      home: { hero: { heading: "Hi" } },
      resume: [{ heading: "Work" }],
    });
    expect(store.error).toBeNull();
  });

  describe("getPageContent", () => {
    it("returns the requested page when present", () => {
      const store = useContentStore();
      expect(store.getPageContent("home")).toEqual({ hero: { heading: "Hi" } });
    });

    it("returns null for an unknown page", () => {
      const store = useContentStore();
      expect(store.getPageContent("nonexistent")).toBeNull();
    });

    it("returns null when content has been cleared", () => {
      const store = useContentStore();
      store.content = null;
      expect(store.getPageContent("home")).toBeNull();
    });
  });
});

describe("stores/content - null fallback", () => {
  beforeEach(() => setActivePinia(createPinia()));

  it("falls back to null when the data module has no content key", async () => {
    vi.resetModules();
    vi.doMock("~/data/content.js", () => ({ default: {} }));
    const mod = await import("~/stores/content");
    setActivePinia(createPinia());
    const store = mod.useContentStore();
    expect(store.content).toBeNull();
    expect(store.getPageContent("anything")).toBeNull();
    vi.doUnmock("~/data/content.js");
  });
});
