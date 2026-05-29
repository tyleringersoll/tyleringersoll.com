import { useContentStore } from "~/stores/content";

export default defineNuxtPlugin(() => {
  // Content is initialized directly in the store state from the static import.
  // This plugin is intentionally a no-op.
  useContentStore();
});
