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
          innerHTML: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||(t===null&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light-mode')}}catch(e){}})()`,
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
