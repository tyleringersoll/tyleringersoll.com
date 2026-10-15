<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useThemeStore } from "../../stores/theme";
import { THEME_META } from "../../themes/meta";
import ThemeSwatch from "../../components/ThemeSwatch.vue";
const props = defineProps({ section: { type: String, default: "colors" } });
const theme = useThemeStore();
const tokens = ref([]);
const families = ["Roboto Condensed", "Archivo", "Spline Sans Mono"];
const groups = {
  colors: [
    "--color-bg-deepest",
    "--color-bg-header",
    "--color-bg-primary",
    "--color-bg-secondary",
    "--color-bg-nav",
    "--color-bg-surface",
    "--color-text-primary",
    "--color-text-secondary",
    "--color-text-muted",
    "--color-border",
    "--color-nav-link",
    "--color-accent-line",
    "--color-link",
    "--color-link-hover",
    "--color-active-nav",
    "--color-focus",
    "--color-btn-primary-text",
    "--color-svg-accent",
    "--color-border-strong",
    "--paper",
    "--panel",
    "--rule",
    "--rule2",
    "--amber",
  ],
  typography: ["--font-family-base", "--font-family-mono"],
  layout: [
    "--workshop-space-xs",
    "--workshop-space-sm",
    "--workshop-space-md",
    "--workshop-space-lg",
    "--workshop-space-xl",
    "--workshop-breakpoint-xs",
    "--workshop-breakpoint-sm",
    "--workshop-breakpoint-md",
    "--workshop-breakpoint-lg",
    "--workshop-container",
    "--workshop-gutter",
  ],
  motion: [
    "--workshop-motion-fast",
    "--workshop-motion-base",
    "--workshop-motion-slow",
    "--workshop-z-dropdown",
    "--workshop-z-sticky",
    "--workshop-z-modal",
    "--workshop-z-overlay",
  ],
};
const read = () => {
  const style = getComputedStyle(document.documentElement);
  tokens.value = (groups[props.section] || [])
    .map((name) => ({ name, value: style.getPropertyValue(name).trim() }))
    .filter((t) => t.value);
};
onMounted(read);
watch(
  () => [theme.activeThemeId, theme.mode, props.section],
  () => nextTick(read),
  { flush: "post" },
);
const labels = {
  colors: "Color in context",
  typography: "Type with a purpose",
  layout: "Space and structure",
  motion: "Movement and layers",
  themes: "Two ways to tell the same story",
};
</script>
<template>
  <main class="specimen">
    <p class="eyebrow">Foundations / {{ section }}</p>
    <h1>{{ labels[section] }}</h1>
    <template v-if="section === 'colors'">
      <p class="lede">
        These are the computed CSS values in this preview. Change Appearance in
        the toolbar to inspect the same semantic roles in each theme.
      </p>
      <div class="specimen-grid">
        <div v-for="token in tokens" :key="token.name" class="token-card">
          <div
            class="token-swatch"
            :style="{ background: token.value }"
            aria-hidden="true"
          />
          <div>
            <code>{{ token.name }}</code>
            <p>{{ token.value }}</p>
          </div>
        </div>
      </div>
      <div class="specimen-card">
        <h2>A small example</h2>
        <p>
          Primary text carries the message.
          <span style="color: var(--color-text-secondary)"
            >Secondary text adds context.</span
          >
          <a href="#color-notes">Links have their own role.</a>
        </p>
      </div>
      <h2 id="color-notes">Use roles, not raw colors</h2>
      <p>
        Choose <code>--color-text-primary</code> for body text and
        <code>--color-focus</code> for focus indicators. A border or decorative
        accent is not automatically suitable for small text. Check the actual
        foreground and background together.
      </p>
    </template>
    <template v-else-if="section === 'typography'">
      <p class="lede">
        Signal Flow uses Roboto Condensed. Reel-to-Reel uses Archivo for its
        editorial layout and Spline Sans Mono for labels and details.
      </p>
      <section
        v-for="family in families"
        :key="family"
        class="font-specimen"
        :style="{ fontFamily: '&quot;' + family + '&quot;, sans-serif' }"
      >
        <p class="eyebrow" :style="{ fontFamily: 'inherit' }">{{ family }}</p>
        <p class="font-display" :style="{ fontFamily: 'inherit' }">
          Engineering.<br />With a sense of rhythm.
        </p>
        <p :style="{ fontFamily: 'inherit' }">
          Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm<br />0123456789 / &amp; → — . ,
          ! ?
        </p>
        <p :style="{ fontFamily: 'inherit', fontWeight: 700 }">
          Priorities clear. Room to do good work.
        </p>
      </section>
      <h2>Semantic hierarchy</h2>
      <p>
        The page gets one h1. Sections use h2, and entries beneath those use h3.
        Choose heading level for the document structure; adjust size with CSS.
      </p>
      <table>
        <thead>
          <tr>
            <th>Active token</th>
            <th>Computed family</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tokens" :key="t.name">
            <td>
              <code>{{ t.name }}</code>
            </td>
            <td>{{ t.value }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="section === 'themes'">
      <p class="lede">
        The content stays the same. The theme can change both the visual
        language and the component layout.
      </p>
      <div class="specimen-grid">
        <section class="specimen-card" v-for="t in THEME_META" :key="t.id">
          <ThemeSwatch :swatch="t.swatch" />
          <h2 style="margin-top: 20px">{{ t.label }}</h2>
          <p>{{ t.tagline }}</p>
          <p>
            {{ t.supportsModes ? "Light and dark modes" : "Dark mode only" }}
          </p>
          <button
            class="workshop-button"
            style="margin-top: 20px"
            @click="theme.setTheme(t.id)"
          >
            Try {{ t.label }}
          </button>
        </section>
      </div>
      <p>
        Active: <strong>{{ theme.activeTheme.label }}</strong> /
        {{ theme.mode }}. The buttons use the real theme store. The toolbar
        chooses the starting state for a story; it does not mirror changes made
        inside the preview.
      </p>
      <h2>More than a palette</h2>
      <p>
        The registry maps names such as Header and ResumeView to theme
        components. A missing override falls back to Signal Flow. Reel-to-Reel
        uses that fallback for the catch-all content page.
      </p>
      <p>
        Appearance changes here stay in the preview. Storybook does not save a
        theme cookie or overwrite the portfolio’s saved preference.
      </p>
    </template>
    <template v-else>
      <p class="lede" v-if="section === 'layout'">
        Spacing and breakpoints come from the same Sass variables as the
        application. The workshop exposes them as custom properties for this
        readout.
      </p>
      <p class="lede" v-else>
        Short transitions explain state changes. The site’s reduced-motion rules
        remove animation when the visitor asks for less movement.
      </p>
      <table>
        <thead>
          <tr>
            <th>Source value</th>
            <th>Compiled value</th>
            <th v-if="section === 'layout'">Scale</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tokens" :key="t.name">
            <td>
              <code>{{ t.name.replace("--workshop-", "") }}</code>
            </td>
            <td>{{ t.value }}</td>
            <td v-if="section === 'layout'">
              <div
                v-if="t.name.includes('space')"
                :style="{
                  width: t.value,
                  height: '16px',
                  background: 'var(--color-accent-line)',
                }"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <template v-if="section === 'layout'"
        ><h2>Responsive behavior</h2>
        <p>
          Navigation switches below 768px. Timeline details use the full row on
          small screens. Use Storybook’s viewport toolbar on component and page
          stories to test the real media queries; a narrow card inside a wide
          viewport does not activate them.
        </p></template
      >
      <template v-else
        ><h2>Component-specific timing</h2>
        <p>
          The theme swap uses 300ms to match its CSS fade. Color-mode
          transitions last 2 seconds. Timeline expansion uses its own height and
          opacity timings. These are implementation choices, not a claim that
          every duration comes from the Sass scale.
        </p>
        <h2>Try reduced motion</h2>
        <p>
          Enable Reduce motion in your operating system and try the Appearance
          stories again. Check focus restoration and keyboard behavior with
          animation both enabled and disabled.
        </p></template
      >
    </template>
  </main>
</template>
<style lang="scss">
:root {
  --workshop-space-xs: #{$spacing-xs};
  --workshop-space-sm: #{$spacing-sm};
  --workshop-space-md: #{$spacing-md};
  --workshop-space-lg: #{$spacing-lg};
  --workshop-space-xl: #{$spacing-xl};
  --workshop-breakpoint-xs: #{$breakpoint-xs};
  --workshop-breakpoint-sm: #{$breakpoint-sm};
  --workshop-breakpoint-md: #{$breakpoint-md};
  --workshop-breakpoint-lg: #{$breakpoint-lg};
  --workshop-container: #{$container-max-width};
  --workshop-gutter: #{$container-padding-x};
  --workshop-motion-fast: #{$transition-fast};
  --workshop-motion-base: #{$transition-base};
  --workshop-motion-slow: #{$transition-slow};
  --workshop-z-dropdown: #{$z-index-dropdown};
  --workshop-z-sticky: #{$z-index-sticky};
  --workshop-z-modal: #{$z-index-modal};
  --workshop-z-overlay: #{$z-index-overlay};
}
.token-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}
.token-card > div:last-child {
  padding: 16px;
}
.token-card p {
  margin: 8px 0 0;
  color: var(--color-text-secondary);
}
.token-swatch {
  height: 90px;
  border-bottom: 1px solid var(--color-border);
}
.font-specimen {
  border-top: 1px solid var(--color-border);
  padding: 32px 0;
}
.font-display {
  font-size: clamp(1.8rem, 4vw, 3.4rem);
  line-height: 1.15;
  margin: 16px 0;
}
</style>
