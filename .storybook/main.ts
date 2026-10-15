import remarkGfm from "remark-gfm";
import type { StorybookConfig } from "@storybook-vue/nuxt";
import { sitePublicDir, siteAssetDirs } from "../scripts/site-output.mjs";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.ts"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-links",
  ],
  framework: { name: "@storybook-vue/nuxt", options: {} },
  staticDirs: [
    "../public",
    // Serve actual generated font binaries before Nuxt Fonts' dev middleware.
    ...siteAssetDirs().map((dir) => ({ from: `../${sitePublicDir}/${dir}`, to: `/${dir}` })),
  ],
  core: { disableTelemetry: true },
};
export default config;
