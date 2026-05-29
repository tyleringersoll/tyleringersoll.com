import { defineStore } from "pinia";
import contentData from "~/data/content.js";

export const useContentStore = defineStore("content", {
  state: () => ({
    content: contentData.content || null,
    error: null,
  }),

  getters: {
    getPageContent: (state) => {
      return (pageName) => {
        if (!state.content) return null;
        return state.content[pageName] || null;
      };
    },
  },
});
