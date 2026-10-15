import { spawnSync } from "node:child_process";
import { cp, rm, access } from "node:fs/promises";
import { sitePublicDir, siteAssetDirs } from "./site-output.mjs";

for (const script of ["generate:site", "storybook:bundle"]) {
  const result = spawnSync("npm", ["run", script], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
// Storybook stops before Nitro's asset emission. Reuse the fonts emitted by
// the site build; never silently ship empty placeholder files from .nuxt/cache.
// The framework writes machine-specific Vite diagnostics into the build.
await rm(".storybook-static/logs", { recursive: true, force: true });
for (const dir of siteAssetDirs()) {
  await cp(`${sitePublicDir}/${dir}`, `.storybook-static/${dir}`, {
    recursive: true,
  });
}
await import("./verify-storybook.mjs");
await access(".storybook-static/index.html");
await access(".storybook-static/iframe.html");
if (process.argv.includes("--storybook-only")) process.exit(0);
await rm(`${sitePublicDir}/storybook`, { recursive: true, force: true });
await cp(".storybook-static", `${sitePublicDir}/storybook`, { recursive: true });
console.log(`Portfolio and Storybook are ready in ${sitePublicDir}.`);
