import Themed from "../../components/Themed.vue";
export default {
  title: "Pages/Compositions",
  component: Themed,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Actual theme views with the site’s current content. These examples exercise composition and responsive layout. They omit the site shell; Header, Footer, and global overlays have their own stories. Use the running portfolio for navigation, SEO, initial hydration, and persisted preferences.",
      },
    },
  },
  render: (args) => ({
    components: { Themed },
    setup: () => ({ args }),
    template: '<main><Themed v-bind="args"/></main>',
  }),
};
export const Home = { args: { name: "HomeView" } };
export const Resume = { args: { name: "ResumeView" } };
export const Architecture = { args: { name: "ArchitectureView" } };
export const EditorialHome = {
  ...Home,
  globals: { appearance: "reel-to-reel:dark" },
};
export const EditorialResume = {
  ...Resume,
  globals: { appearance: "reel-to-reel:dark" },
};
export const EditorialArchitecture = {
  ...Architecture,
  globals: { appearance: "reel-to-reel:dark" },
};
export const HomeOnPhone = {
  ...Home,
  globals: { viewport: { value: "iphone12", isRotated: false } },
};
export const LightResume = {
  ...Resume,
  globals: { appearance: "signal-flow:light" },
};
