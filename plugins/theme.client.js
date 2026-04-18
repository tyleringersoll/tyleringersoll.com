import { useThemeStore } from "~/stores/theme";

export default defineNuxtPlugin(() => {
  const store = useThemeStore();
  store.init();
});
