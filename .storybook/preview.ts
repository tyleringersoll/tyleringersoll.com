import type { Preview } from "@storybook-vue/nuxt";
import { themes } from "storybook/theming";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import StoryFrame from "./StoryFrame.vue";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    appearance: {
      description: "Theme and color mode used by the actual site",
      toolbar: {
        title: "Appearance",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "signal-flow:dark", title: "Signal Flow · Dark" },
          { value: "signal-flow:light", title: "Signal Flow · Light" },
          { value: "reel-to-reel:dark", title: "Reel-to-Reel · Dark" },
        ],
      },
    },
  },
  initialGlobals: { appearance: "signal-flow:dark" },
  decorators: [
    (story, context) => ({
      components: { story, StoryFrame },
      setup: () => ({
        appearance: context.globals.appearance,
        storyId: context.id,
      }),
      template:
        '<StoryFrame :appearance="appearance" :story-id="storyId"><story /></StoryFrame>',
    }),
  ],
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: [
          "Start here",
          "Foundations",
          "Components",
          "Patterns",
          "Pages",
          "Engineering",
        ],
      },
    },
    controls: { expanded: true },
    docs: {
      theme: themes.dark,
      story: { inline: false, height: "420px" },
      toc: true,
    },
    viewport: { options: INITIAL_VIEWPORTS },
    backgrounds: { disable: true },
    a11y: { test: "error" },
  },
};
export default preview;
