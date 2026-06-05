import type { ThemeManifest } from "../registry";

/**
 * The original look & feel of the site. Other themes fall back to these
 * components for anything they do not override.
 */
const defaultTheme: ThemeManifest = {
  id: "default",
  label: "Classic",
  supportsModes: true,
  defaultMode: "dark",
  components: {
    // Chrome (referenced by layouts/default.vue via <Themed>)
    Header: () => import("~/components/Header.vue"),
    Footer: () => import("~/components/Footer.vue"),
    // Page views (referenced by the thin wrappers in pages/)
    HomeView: () => import("~/themes/default/views/Home.vue"),
    ResumeView: () => import("~/themes/default/views/Resume.vue"),
    MusicView: () => import("~/themes/default/views/Music.vue"),
    ArchitectureView: () => import("~/themes/default/views/Architecture.vue"),
    SlugView: () => import("~/themes/default/views/Slug.vue"),
  },
};

export default defaultTheme;
