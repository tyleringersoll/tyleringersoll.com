import { useThemeStore } from "~/stores/theme";
import { nextTick } from "vue";

// Client-only theme bootstrap. Dynamic SSR can render the cookie-backed theme on
// the server; generated/static HTML cannot know localStorage, so nuxt.config.ts's
// pre-paint script adds `theme-boot-cloaked` when the rendered tree differs from
// the saved theme. We keep the store on the rendered theme through hydration, then
// apply the saved preference and reveal the app after Vue has patched the DOM.
export default defineNuxtPlugin((nuxtApp) => {
  const store = useThemeStore();
  let applied = false;

  const revealBootCloak = () => {
    const el = document.documentElement;
    if (!el.classList.contains("theme-boot-cloaked")) return;

    nextTick(() => {
      requestAnimationFrame(() => {
        el.classList.remove("theme-boot-cloaked");
      });
    });
  };

  nuxtApp.hook("app:suspense:resolve", () => {
    if (applied) return;
    applied = true;
    requestAnimationFrame(() => {
      try {
        store.applyStored();
      } finally {
        revealBootCloak();
      }
    });
  });
});
