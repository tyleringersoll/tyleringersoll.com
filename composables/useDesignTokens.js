import { ref, watch, onMounted } from "vue";
import { useThemeStore } from "~/stores/theme";

// A curated, presentable slice of the design system shown live in the customize
// drawer. These are the CSS custom properties most representative of a theme.
const TOKEN_NAMES = [
  "--color-bg-primary",
  "--color-bg-secondary",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-accent-line",
  "--color-link",
  "--color-link-hover",
  "--color-border",
  "--color-focus",
  "--font-family-base",
];

/**
 * Reads the LIVE computed value of each curated token off <html>, so the readout
 * reflects the active theme *and* light/dark mode in real time. Client-only (the
 * values come from the DOM); recomputes whenever the theme or mode changes.
 */
export function useDesignTokens() {
  const store = useThemeStore();
  const tokens = ref(TOKEN_NAMES.map((name) => ({ name, value: "" })));

  const read = () => {
    if (typeof window === "undefined") return;
    const cs = getComputedStyle(document.documentElement);
    tokens.value = TOKEN_NAMES.map((name) => ({
      name,
      value: cs.getPropertyValue(name).trim(),
    }));
  };

  onMounted(read);
  // Re-read after the theme swap / mode toggle has applied to <html>.
  watch(
    () => [store.activeThemeId, store.isDark],
    () => nextTick(read),
    { flush: "post" }
  );

  return { tokens };
}
