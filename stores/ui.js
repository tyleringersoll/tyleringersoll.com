import { defineStore } from "pinia";

// Open-state for the global theming overlays (the Customize drawer and the ⌘K
// command palette). Kept in a tiny store so the FAB, drawer, and palette can be
// independent components that don't have to prop-drill or share refs.
export const useUiStore = defineStore("ui", {
  state: () => ({
    drawerOpen: false,
    paletteOpen: false,
  }),
  actions: {
    openDrawer() {
      this.paletteOpen = false;
      this.drawerOpen = true;
    },
    closeDrawer() {
      this.drawerOpen = false;
    },
    toggleDrawer() {
      if (this.drawerOpen) {
        this.closeDrawer();
      } else {
        this.openDrawer();
      }
    },
    openPalette() {
      this.drawerOpen = false;
      this.paletteOpen = true;
    },
    closePalette() {
      this.paletteOpen = false;
    },
    togglePalette() {
      if (this.paletteOpen) {
        this.closePalette();
      } else {
        this.openPalette();
      }
    },
  },
});
