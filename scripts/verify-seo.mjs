import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { Window } from "happy-dom";
import { sitePublicDir } from "./site-output.mjs";
import data from "../data/content.js";

const origin = "https://www.tyleringersoll.com";
const window = new Window({
  url: origin,
  settings: { disableCSSFileLoading: true, disableJavaScriptFileLoading: true },
});
const parse = (source, type = "text/html") =>
  new window.DOMParser().parseFromString(source, type);
const sitemap = parse(await readFile(`${sitePublicDir}/sitemap.xml`, "utf8"), "application/xml");
const urls = [...sitemap.querySelectorAll("loc")].map((node) => node.textContent.trim());
const routes = (await readdir("pages"))
  .filter((file) => file.endsWith(".vue") && !file.includes("["))
  .map((file) => file === "index.vue" ? "/" : `/${file.slice(0, -4)}`);
assert.deepEqual([...urls].sort(), routes.map((path) => `${origin}${path}`).sort(),
  "Sitemap must list each public page exactly once, using its canonical URL");
const robots = await readFile(`${sitePublicDir}/robots.txt`, "utf8");
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt must advertise the sitemap");
assert(!/^Disallow:\s*\//im.test(robots), "Public pages must remain crawlable");

const titles = new Set();
const descriptions = new Set();
const currentRole = data.content.resume.find((entry) => entry.roles?.length).roles[0];
for (const url of urls) {
  const { pathname } = new URL(url);
  const file = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
  const document = parse(await readFile(`${sitePublicDir}/${file}`, "utf8"));
  const meta = (key) => {
    const nodes = document.head.querySelectorAll(`meta[name="${key}"], meta[property="${key}"]`);
    assert.equal(nodes.length, 1, `${url}: expected one ${key} tag`);
    const value = nodes[0].getAttribute("content");
    assert(value?.trim(), `${url}: empty ${key}`);
    return value;
  };
  const title = document.title;
  const description = meta("description");
  assert(title && !titles.has(title), `${url}: missing or duplicate title`);
  assert(!descriptions.has(description), `${url}: duplicate description`);
  titles.add(title);
  descriptions.add(description);
  const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
  assert.equal(canonicals.length, 1, `${url}: expected one canonical`);
  assert.equal(canonicals[0].getAttribute("href"), url, `${url}: canonical disagrees with sitemap`);
  assert.equal(meta("og:url"), url);
  assert.equal(meta("og:title"), title);
  assert.equal(meta("twitter:title"), title);
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("og:site_name"), data.content.meta.name);
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert(!/noindex/i.test(document.head.querySelector('meta[name="robots"]')?.content || ""),
    `${url}: public page must be indexable`);
  assert.equal(document.querySelectorAll("h1").length, 1, `${url}: expected one main heading`);
  assert(document.querySelector("main")?.textContent.trim(), `${url}: missing prerendered content`);

  const image = new URL(meta("og:image"));
  assert.equal(image.origin, origin);
  assert.equal(meta("twitter:image"), image.href);
  assert.equal(meta("twitter:image:alt"), meta("og:image:alt"));
  const png = await readFile(`${sitePublicDir}${image.pathname}`);
  assert.equal(png.toString("hex", 0, 8), "89504e470d0a1a0a", "Social image must be a PNG");
  assert.equal(Number(meta("og:image:width")), png.readUInt32BE(16));
  assert.equal(Number(meta("og:image:height")), png.readUInt32BE(20));

  const schemas = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
    .map((node) => JSON.parse(node.textContent));
  const person = schemas.find((schema) => schema["@type"] === "Person");
  assert.equal(person?.name, data.content.meta.name);
  assert.equal(person?.jobTitle, currentRole.subheading.split(" · ")[0]);
  const website = schemas.find((schema) => schema["@type"] === "WebSite");
  if (pathname === "/") {
    assert.equal(website?.name, data.content.meta.name);
    assert.equal(website?.url, `${origin}/`);
    assert.equal(website?.publisher["@id"], person["@id"]);
  }
}

const redirects = (await readFile(`${sitePublicDir}/_redirects`, "utf8"))
  .split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"))
  .map((line) => line.split(/\s+/));
for (const path of ["/music", "/music/*"]) {
  const rule = redirects.find(([from]) => from === path);
  assert.deepEqual(rule, [path, "https://tyleringersolldrums.com", "301!"], `${path}: missing permanent redirect`);
}
for (const path of ["/resume", "/architecture"]) {
  assert.deepEqual(redirects.find(([from]) => from === path),
    [path, `${path}/index.html`, "200!"], `${path}: missing canonical path rewrite`);
}
if (process.env.NETLIFY || process.env.NETLIFY_LOCAL) {
  assert.deepEqual(redirects.at(-1), ["/*", "/404.html", "404"],
    "Netlify 404 fallback must follow the site rules");
}
console.log(`Verified SEO for ${urls.length} sitemap pages, social image, structured data, and redirect ordering.`);
await window.happyDOM.close();
