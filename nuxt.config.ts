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
          // Set theme + mode attributes before paint to avoid a flash of the wrong
          // palette. Reads the same localStorage keys the store persists to. The
          // themed component tree still swaps after hydration (plugins/theme.client.js);
          // this only fixes the colors up front.
          innerHTML: `(function(){try{var d=document.documentElement;var id=localStorage.getItem('theme-id')||'default';var m=localStorage.getItem('theme-mode')||localStorage.getItem('theme');if(m!=='light'&&m!=='dark'){m=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',id);d.setAttribute('data-mode',m)}catch(e){}})()`,
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
