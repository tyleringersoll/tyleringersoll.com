import Themed from "../../components/Themed.vue";
import Navigation from "../../components/Navigation.vue";
import data from "../../data/content";
export default {
  title: "Components/Site chrome",
  component: Themed,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header and Footer resolve through Themed, so the Appearance toolbar changes the actual component tree. These are site-specific compositions, with content from the shared store. Page navigation uses the Nuxt Storybook router; use the portfolio itself to verify URL changes and active route styling.",
      },
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: ["Header", "Footer"],
      description:
        "Named component resolved by the theme registry, with Signal Flow as fallback.",
    },
  },
  render: (args) => ({
    components: { Themed },
    setup: () => ({ args }),
    template: '<Themed v-bind="args"/>',
  }),
};
export const Header = {
  args: {
    name: "Header",
    content: data.content.meta,
    navigation: data.content.navigation,
  },
};
export const Footer = {
  args: { name: "Footer", content: data.content.footer },
};
export const FooterLight = {
  ...Footer,
  globals: { appearance: "signal-flow:light" },
};
export const HeaderLight = {
  ...Header,
  globals: { appearance: "signal-flow:light" },
};
export const EditorialHeader = {
  ...Header,
  globals: { appearance: "reel-to-reel:dark" },
};
export const EditorialFooter = {
  ...Footer,
  globals: { appearance: "reel-to-reel:dark" },
};
export const LegacyNavigation = {
  render: () => ({
    components: { Navigation },
    setup: () => ({ items: data.content.navigation }),
    template: '<Navigation :content="items"/>',
  }),
  parameters: {
    docs: {
      description: {
        story:
          "The standalone Navigation component remains in the source. The current layout uses Header instead. It is documented here for maintenance, not presented as a second preferred navigation pattern.",
      },
    },
  },
};
