import type { ThemeManifest } from "../registry";

import Header from "~/themes/reel-to-reel/components/Header.vue";
import Footer from "~/themes/reel-to-reel/components/Footer.vue";
import HomeView from "~/themes/reel-to-reel/views/Home.vue";
import ResumeView from "~/themes/reel-to-reel/views/Resume.vue";
import MusicView from "~/themes/reel-to-reel/views/Music.vue";
import ArchitectureView from "~/themes/reel-to-reel/views/Architecture.vue";
import { getThemeMeta } from "../meta";

/**
 * "Editorial Grid" — a print-inspired, amber-on-near-black grid system.
 * Ships its own masthead, footer, and page views; the catch-all Slug view has no
 * editorial spec and falls back to the default theme. Intrinsically dark, so it
 * does not offer a light/dark toggle.
 */
const reelToReelTheme: ThemeManifest = {
  ...getThemeMeta("reel-to-reel"),
  components: {
    Header,
    Footer,
    HomeView,
    ResumeView,
    MusicView,
    ArchitectureView,
  },
};

export default reelToReelTheme;
