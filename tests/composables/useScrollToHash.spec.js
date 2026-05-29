import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useScrollToHash } from "~/composables/useScrollToHash";

describe("useScrollToHash", () => {
  let scrollSpy;
  let rafSpy;

  beforeEach(() => {
    document.body.innerHTML = "";
    scrollSpy = vi.fn();
    window.scrollTo = scrollSpy;
    rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        cb(0);
        return 0;
      });
  });

  afterEach(() => {
    rafSpy.mockRestore();
  });

  it("returns a scrollToHash function", () => {
    const { scrollToHash } = useScrollToHash();
    expect(typeof scrollToHash).toBe("function");
  });

  it("does nothing for an empty hash", async () => {
    const { scrollToHash } = useScrollToHash();
    await scrollToHash("");
    expect(scrollSpy).not.toHaveBeenCalled();
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("does nothing for a null hash", async () => {
    const { scrollToHash } = useScrollToHash();
    await scrollToHash(null);
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("does nothing when the target element is missing", async () => {
    const { scrollToHash } = useScrollToHash();
    await scrollToHash("#missing");
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("scrolls to the target element, accounting for header height + 16px gap", async () => {
    const header = document.createElement("div");
    header.className = "header";
    header.getBoundingClientRect = () => ({ height: 60 });
    document.body.appendChild(header);

    const target = document.createElement("section");
    target.id = "section";
    target.getBoundingClientRect = () => ({ top: 500 });
    document.body.appendChild(target);

    Object.defineProperty(window, "scrollY", { value: 100, configurable: true });

    const { scrollToHash } = useScrollToHash();
    await scrollToHash("#section");

    expect(scrollSpy).toHaveBeenCalledWith({
      top: 500 + 100 - 60 - 16,
      behavior: "smooth",
    });
  });

  it("uses zero header height when no .header element is present", async () => {
    const target = document.createElement("section");
    target.id = "loose";
    target.getBoundingClientRect = () => ({ top: 200 });
    document.body.appendChild(target);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });

    const { scrollToHash } = useScrollToHash();
    await scrollToHash("#loose");

    expect(scrollSpy).toHaveBeenCalledWith({
      top: 200 - 16,
      behavior: "smooth",
    });
  });
});
