import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "Tyler Ingersoll · Component workshop",
    brandUrl: "/",
    brandTarget: "_self",
    colorPrimary: "#00b7ff",
    colorSecondary: "#00b7ff",
    appBg: "#11171c",
    appContentBg: "#151a1e",
    appPreviewBg: "#151a1e",
    appBorderColor: "#343d46",
    textColor: "#e9eef3",
    barBg: "#1f272d",
    barSelectedColor: "#00b7ff",
    fontBase: "system-ui, sans-serif",
    fontCode: "monospace",
  }),
  sidebar: { showRoots: true },
});
