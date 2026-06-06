import { unref } from "vue";

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const isVisible = (element) => {
  const style = window.getComputedStyle(element);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    element.getClientRects().length > 0
  );
};

export function useFocusTrap(container, active = true) {
  const isActive = () =>
    typeof active === "function" ? active() : Boolean(unref(active));

  const focusableControls = () => {
    if (!import.meta.client || !container.value) return [];

    return Array.from(container.value.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
      isVisible
    );
  };

  const trapFocus = (event) => {
    if (!isActive() || !container.value) return;

    const controls = focusableControls();
    if (!controls.length) {
      event.preventDefault();
      container.value.focus({ preventScroll: true });
      return;
    }

    const first = controls[0];
    const last = controls[controls.length - 1];

    if (document.activeElement === container.value) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return { focusableControls, trapFocus };
}
