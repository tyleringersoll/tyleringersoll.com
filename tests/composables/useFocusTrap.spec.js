import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useFocusTrap } from "~/composables/useFocusTrap";

const visibleRect = [{ left: 0, top: 0, right: 1, bottom: 1 }];

describe("useFocusTrap", () => {
  let panel;

  beforeEach(() => {
    panel = document.createElement("div");
    panel.tabIndex = -1;
    document.body.appendChild(panel);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete document.activeElement;
    panel.remove();
  });

  const addButton = () => {
    const button = document.createElement("button");
    button.getClientRects = () => visibleRect;
    panel.appendChild(button);
    return button;
  };

  it("returns visible focusable controls inside the container", () => {
    const visible = addButton();
    const hidden = addButton();
    hidden.style.display = "none";

    const { focusableControls } = useFocusTrap(ref(panel));

    expect(focusableControls()).toEqual([visible]);
  });

  it("moves focus from the container to the first control on Tab", () => {
    const first = addButton();
    addButton();
    const { trapFocus } = useFocusTrap(ref(panel));
    const event = { preventDefault: vi.fn(), shiftKey: false };
    const focusSpy = vi.spyOn(first, "focus");

    Object.defineProperty(document, "activeElement", {
      configurable: true,
      get: () => panel,
    });

    trapFocus(event);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  it("does not trap when inactive", () => {
    addButton();
    const { trapFocus } = useFocusTrap(ref(panel), false);
    const event = { preventDefault: vi.fn(), shiftKey: false };

    trapFocus(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
