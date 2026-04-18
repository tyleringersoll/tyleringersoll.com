import { useContentStore } from "~/stores/content";

export default defineNuxtPlugin(() => {
  const store = useContentStore();
  store.loadContent();
});
