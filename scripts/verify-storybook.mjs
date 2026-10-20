import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const root = resolve(".storybook-static");
const index = JSON.parse(await readFile(`${root}/index.json`, "utf8"));
if (!Object.keys(index.entries).length)
  throw new Error("Storybook has no indexed stories.");

// A successful bundler exit alone does not catch missing Nuxt font assets.
let fontReferences = 0;
for (const file of await readdir(`${root}/_nuxt`)) {
  if (!file.endsWith(".css")) continue;
  const cssPath = `${root}/_nuxt/${file}`;
  const css = await readFile(cssPath, "utf8");
  for (const match of css.matchAll(
    /url\(["']?([^\s)"']*\/\_fonts\/[^\s)"']+)["']?\)/g,
  )) {
    const path = resolve(dirname(cssPath), match[1]);
    if (!path.startsWith(root + "/"))
      throw new Error(`Font escapes the build: ${match[1]}`);
    if ((await stat(path)).size === 0) throw new Error(`Empty font: ${path}`);
    fontReferences++;
  }
}
if (!fontReferences)
  throw new Error("No self-hosted fonts found in Storybook CSS.");
console.log(
  `Verified ${Object.keys(index.entries).length} indexed entries and ${fontReferences} font references.`,
);
