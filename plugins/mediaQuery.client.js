import { reactive } from "vue";

const BREAKPOINTS = {
  SMALL: "(max-width: 767px)",
  MEDIUM: "(min-width: 768px) and (max-width: 1023px)",
  LARGE: "(min-width: 1024px)",
};

export default defineNuxtPlugin((nuxtApp) => {
  const mediaQuery = reactive({
    isSmall: false,
    isMedium: false,
    isLarge: false,
  });

  if (typeof window === "undefined" || !window.matchMedia) {
    nuxtApp.provide("mediaQuery", mediaQuery);
    return;
  }

  const mediaQueries = {
    small: window.matchMedia(BREAKPOINTS.SMALL),
    medium: window.matchMedia(BREAKPOINTS.MEDIUM),
    large: window.matchMedia(BREAKPOINTS.LARGE),
  };

  const updateMediaQueryState = () => {
    mediaQuery.isSmall = mediaQueries.small.matches;
    mediaQuery.isMedium = mediaQueries.medium.matches;
    mediaQuery.isLarge = mediaQueries.large.matches;
  };

  const onMediaQueryChange = () => {
    updateMediaQueryState();
  };

  mediaQueries.small.addEventListener("change", onMediaQueryChange);
  mediaQueries.medium.addEventListener("change", onMediaQueryChange);
  mediaQueries.large.addEventListener("change", onMediaQueryChange);

  updateMediaQueryState();
  nuxtApp.provide("mediaQuery", mediaQuery);
});
