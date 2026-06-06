import type { ThemeManifest } from "../registry";

import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import HomeView from "~/themes/signal-flow/views/Home.vue";
import ResumeView from "~/themes/signal-flow/views/Resume.vue";
import MusicView from "~/themes/signal-flow/views/Music.vue";
import ArchitectureView from "~/themes/signal-flow/views/Architecture.vue";
import SlugView from "~/themes/signal-flow/views/Slug.vue";
import { getThemeMeta } from "../meta";

/**
 * The original look & feel of the site. Other themes fall back to these
 * components for anything they do not override.
 */
const signalFlowTheme: ThemeManifest = {
  ...getThemeMeta("signal-flow"),
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

export default signalFlowTheme;
