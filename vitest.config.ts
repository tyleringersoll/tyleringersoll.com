import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: [
        "components/**",
        "composables/**",
        "stores/**",
        "pages/**",
        "layouts/**",
        "plugins/**",
        "themes/**",
        "app.vue",
        "app/**",
      ],
      exclude: [
        "node_modules/**",
        ".nuxt/**",
        ".output/**",
        "tests/**",
        "data/**",
      ],
    },
  },
});
