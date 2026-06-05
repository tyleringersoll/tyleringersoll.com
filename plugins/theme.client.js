import { useThemeStore } from "~/stores/theme";

// Client-only theme bootstrap. The site is statically prerendered with the default
// theme, so we must NOT change the theme before hydration (that would mismatch the
// static HTML). We apply the saved theme on `app:suspense:resolve` — i.e. once the
// initial render's Suspense has fully resolved and hydration is complete — then a
// frame later, so the reactive component-tree swap lands cleanly on the DOM.
// (Using `app:mounted` here fires mid-hydration: the store updates but the swap
// never reaches the DOM, leaving the default chrome on screen.)
// The pre-paint script in nuxt.config sets the color attributes immediately, so
// there's no flash of the wrong palette in the meantime.
export default defineNuxtPlugin((nuxtApp) => {
  const store = useThemeStore();
  let applied = false;
  nuxtApp.hook("app:suspense:resolve", () => {
    if (applied) return;
    applied = true;
    requestAnimationFrame(() => store.applyStored());
  });
});
