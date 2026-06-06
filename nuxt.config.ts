import {
  DEFAULT_THEME_ID,
  LEGACY_MODE,
  LEGACY_THEME_IDS,
  STORAGE_MODE,
  STORAGE_THEME,
  THEME_META,
} from "./themes/meta";

const themeBootStyle =
  "html.theme-boot-cloaked #__nuxt{opacity:0;pointer-events:none}";

const themeBootConfig = {
  bootStyle: themeBootStyle,
  defaultThemeId: DEFAULT_THEME_ID,
  legacyMode: LEGACY_MODE,
  legacyThemeIds: LEGACY_THEME_IDS,
  storageMode: STORAGE_MODE,
  storageTheme: STORAGE_THEME,
  themes: Object.fromEntries(
    THEME_META.map(({ id, supportsModes, defaultMode }) => [
      id,
      { defaultMode, supportsModes },
    ])
  ),
};

const themePrePaintScript = `(function(c){try{var d=document.documentElement;var st=document.createElement('style');st.appendChild(document.createTextNode(c.bootStyle));document.head.appendChild(st);function ls(k){try{return localStorage.getItem(k)}catch(e){return null}}function cookie(k){try{var p=k+'=';var parts=document.cookie?document.cookie.split(';'):[];for(var i=0;i<parts.length;i++){var part=parts[i].trim();if(part.indexOf(p)===0){try{return decodeURIComponent(part.slice(p.length))}catch(e){return part.slice(p.length)}}}}catch(e){}return null}function theme(id){id=id&&c.legacyThemeIds[id]||id;return c.themes[id]?id:c.defaultThemeId}function mode(id,m){var t=c.themes[id]||c.themes[c.defaultThemeId];if(t.supportsModes===false)return t.defaultMode||'dark';if(m==='light'||m==='dark')return m;return window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}var id=theme(ls(c.storageTheme)||cookie(c.storageTheme));var rendered=theme(d.getAttribute('data-theme'));var m=mode(id,ls(c.storageMode)||cookie(c.storageMode)||ls(c.legacyMode)||cookie(c.legacyMode));if(id!==rendered)d.classList.add('theme-boot-cloaked');d.setAttribute('data-theme',id);d.setAttribute('data-mode',m)}catch(e){}})(${JSON.stringify(themeBootConfig)})`;

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: true,

  css: ["~/assets/styles/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/styles/abstracts/variables";
            @import "~/assets/styles/abstracts/mixins";
          `,
          silenceDeprecations: ["import", "slash-div"],
        },
      },
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxt/fonts"],

  fonts: {
    families: [
      { name: "Roboto Condensed", provider: "google", weights: [300, 400, 700] },
      // Editorial Grid theme
      { name: "Archivo", provider: "google", weights: [400, 500, 600, 700, 800, 900] },
      { name: "Spline Sans Mono", provider: "google", weights: [400, 500, 600, 700] },
    ],
  },

  image: {
    format: ["webp", "jpeg"],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0",
      title: "Tyler Ingersoll | Frontend developer / Musician",
      meta: [
        { name: "format-detection", content: "address=no, telephone=no" },
        {
          name: "description",
          content:
            "The personal website of frontend developer and professional drummer Tyler Ingersoll.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://tyleringersoll.com" },
        { property: "og:title", content: "Tyler Ingersoll | Frontend developer / Musician" },
        { property: "og:description", content: "The personal website of frontend developer and professional drummer Tyler Ingersoll." },
        { property: "og:image", content: "https://tyleringersoll.com/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Tyler Ingersoll" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Tyler Ingersoll | Frontend developer / Musician" },
        { name: "twitter:description", content: "The personal website of frontend developer and professional drummer Tyler Ingersoll." },
        { name: "twitter:image", content: "https://tyleringersoll.com/og-image.png" },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [
        {
          // Set theme + mode attributes before paint. If static HTML rendered a
          // different component tree, cloak it until plugins/theme.client.js swaps
          // to the saved theme after hydration.
          innerHTML: themePrePaintScript,
          type: "text/javascript",
        },
      ],
    },
    pageTransition: { name: "fade", mode: "out-in" },
  },

  nitro: {
    prerender: {
      routes: ["/", "/resume", "/music", "/architecture"],
    },
  },
});
