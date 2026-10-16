import { existsSync } from "node:fs";

// Nitro picks its preset from the environment. On Netlify, `nuxt generate`
// uses netlify-static and writes the site to dist/; elsewhere it writes to
// .output/public. Storybook reuses that build's fonts and images, so the build
// script and .storybook/main.ts both need the same answer. Netlify also serves
// images through its own CDN, so _ipx/ only exists in local and CI builds.
export const sitePublicDir =
  process.env.NETLIFY || process.env.NETLIFY_LOCAL ? "dist" : ".output/public";

// Call after the site build: the directories do not exist before it runs.
export const siteAssetDirs = () =>
  ["_fonts", "_ipx"].filter((dir) => existsSync(`${sitePublicDir}/${dir}`));
