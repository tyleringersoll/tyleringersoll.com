import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: true,
  }),
  actions: {
    init() {
      const saved = localStorage.getItem("theme");
      if (saved) {
        this.isDark = saved === "dark";
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.isDark = prefersDark !== false;
      }
      this._applyTheme();
    },
    toggle() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      document.documentElement.classList.add("theme-transitioning");
      this._applyTheme();
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 2000);
    },
    _applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
      }
    },
  },
});
