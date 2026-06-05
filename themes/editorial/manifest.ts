import type { ThemeManifest } from "../registry";

import Header from "~/themes/editorial/components/Header.vue";
import Footer from "~/themes/editorial/components/Footer.vue";
import HomeView from "~/themes/editorial/views/Home.vue";
import ResumeView from "~/themes/editorial/views/Resume.vue";
import MusicView from "~/themes/editorial/views/Music.vue";
import ArchitectureView from "~/themes/editorial/views/Architecture.vue";

/**
 * "Editorial Grid" — a print-inspired, amber-on-near-black grid system.
 * Ships its own masthead, footer, and page views; the catch-all Slug view has no
 * editorial spec and falls back to the default theme. Intrinsically dark, so it
 * does not offer a light/dark toggle.
 */
const editorialTheme: ThemeManifest = {
  id: "editorial",
  label: "Editorial",
  supportsModes: false,
  defaultMode: "dark",
  components: {
    Header,
    Footer,
    HomeView,
    ResumeView,
    MusicView,
    ArchitectureView,
  },
};

export default editorialTheme;
