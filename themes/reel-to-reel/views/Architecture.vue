<template>
  <div class="ed-frame">
    <section class="meta">
      <div v-for="m in metaRow" :key="m.l">
        <span class="kickmute">{{ m.l }}</span><b>{{ m.v }}</b>
      </div>
    </section>

    <section class="pagehead">
      <div class="ph-left">
        <span class="kick">How this site was built</span>
        <h1 class="ph-title">Archi<span class="o">tecture</span></h1>
        <div class="ph-intro"><p>{{ introOverview }}</p></div>
        <a
          class="link"
          href="https://github.com/tyleringersoll"
          target="_blank"
          rel="noopener noreferrer"
        >
          View the source on GitHub <span class="ed-ico" v-html="icons.arrow" />
        </a>
      </div>
      <div class="ph-right">
        <div v-for="f in facts" :key="f.l" class="ph-fact">
          <div class="v">{{ f.v }}</div>
          <div class="l">{{ f.l }}</div>
        </div>
      </div>
    </section>

    <section v-for="(s, i) in sections" :id="s.id" :key="s.id" class="arch">
      <div class="arch-l">
        <span class="aidx">{{ pad(i + 1) }}</span>
        <h3 v-html="s.heading" />
      </div>
      <div class="arch-r">
        <p
          v-for="(line, li) in archLines(s.content)"
          :key="'c' + li"
          :class="{ bul: line.bullet }"
          v-html="line.html"
        />
        <div v-if="s.scores" class="scores">
          <div v-for="sc in s.scores" :key="sc.label" class="sc">
            <div class="v">{{ sc.value }}</div>
            <div class="l">{{ sc.label }}</div>
          </div>
        </div>
        <p
          v-for="(line, oi) in archLines(s.optimizations)"
          :key="'o' + oi"
          :class="{ bul: line.bullet }"
          v-html="line.html"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useContentStore } from "~/stores/content";
import { edIcons } from "~/themes/reel-to-reel/icons.js";

const store = useContentStore();
const icons = edIcons;

const arch = computed(() => store.content?.architecture || []);
const intro = computed(() => arch.value[0] || {});
const introOverview = computed(() => (intro.value.content || [])[0] || "");

// Mirror the mock: the intro's overview line lifts into the page head, and its
// remaining bullets become the first "Stack & Foundation" section.
const sections = computed(() =>
  arch.value.map((s, i) =>
    i === 0
      ? { ...s, heading: "Stack & Foundation", content: (s.content || []).slice(1) }
      : s
  )
);

const pad = (n) => String(n).padStart(2, "0");

// Turn a content[] into render lines, flagging dash-bulleted ones.
const archLines = (arr) =>
  (arr || []).map((l) => {
    const bullet = l.trim().startsWith("•");
    return { bullet, html: bullet ? l.replace(/^\s*•\s*/, "") : l };
  });

// ── Editorial-only chrome ──
const metaRow = [
  { l: "Stack", v: "Nuxt 3 / Vue 3 / Pinia" },
  { l: "Hosting", v: "Netlify Edge CDN" },
  { l: "Lighthouse", v: "100 / 100 / 100 / 100" },
];
const facts = [
  { v: "100", l: "Lighthouse Performance" },
  { v: "99%", l: "Unit Test Coverage" },
];
</script>
