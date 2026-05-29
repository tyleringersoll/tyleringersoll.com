import { describe, expect, it } from "vitest";
import routerOptions from "~/app/router.options";

describe("app/router.options scrollBehavior", () => {
  const { scrollBehavior } = routerOptions;

  it("returns the saved position when present (back/forward navigation)", () => {
    const saved = { left: 0, top: 1234 };
    expect(scrollBehavior({}, {}, saved)).toBe(saved);
  });

  it("returns false when navigating to a hash (preserves browser default)", () => {
    expect(scrollBehavior({ hash: "#engineering" }, {}, null)).toBe(false);
  });

  it("returns top:0 smooth-scroll for normal navigation", () => {
    expect(scrollBehavior({ hash: "" }, {}, null)).toEqual({
      top: 0,
      behavior: "smooth",
    });
  });
});
