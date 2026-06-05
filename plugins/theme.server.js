import {
  LEGACY_MODE,
  STORAGE_MODE,
  STORAGE_THEME,
  useThemeStore,
} from "~/stores/theme";

export default defineNuxtPlugin(() => {
  const store = useThemeStore();

  store.applyInitialPreference(
    useCookie(STORAGE_THEME).value,
    useCookie(STORAGE_MODE).value || useCookie(LEGACY_MODE).value
  );

  useHead({
    htmlAttrs: {
      "data-theme": store.activeThemeId,
      "data-mode": store.mode,
    },
  });
});
