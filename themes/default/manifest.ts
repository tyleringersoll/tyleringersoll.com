import type { ThemeManifest } from "../registry";

import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import HomeView from "~/themes/default/views/Home.vue";
import ResumeView from "~/themes/default/views/Resume.vue";
import MusicView from "~/themes/default/views/Music.vue";
import ArchitectureView from "~/themes/default/views/Architecture.vue";
import SlugView from "~/themes/default/views/Slug.vue";

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
    Header,
    Footer,
    // Page views (referenced by the thin wrappers in pages/)
    HomeView,
    ResumeView,
    MusicView,
    ArchitectureView,
    SlugView,
  },
};

export default defaultTheme;
