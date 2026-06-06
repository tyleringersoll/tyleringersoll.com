<template>
  <div class="ed-frame">
    <section class="meta">
      <div v-for="m in metaRow" :key="m.l">
        <span class="kickmute">{{ m.l }}</span><b>{{ m.v }}</b>
      </div>
    </section>

    <section class="mhero">
      <div class="mh-text">
        <span class="kick">{{ heroItem.heading }}</span>
        <h1 class="ph-title">Mu<span class="o">sic</span></h1>
        <div style="margin-top: 28px">
          <p v-for="(p, i) in heroItem.content || []" :key="i">{{ p }}</p>
        </div>
        <a
          v-if="heroItem.cta"
          class="link"
          :href="heroItem.cta.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ heroItem.cta.label }} <span class="ed-ico" v-html="icons.arrow" />
        </a>
        <div class="statrow statrow--two statrow--wrap">
          <div v-for="f in heroFacts" :key="f.l" class="st">
            <div class="v">{{ f.v }}</div>
            <div class="l">{{ f.l }}</div>
          </div>
        </div>
      </div>
      <div class="mh-pic">
        <span class="tag">Home Studio</span>
        <NuxtImg
          src="/images/studio_kit.webp"
          alt="Tyler Ingersoll's hybrid drum studio"
          width="800"
          height="700"
          sizes="100vw md:50vw lg:600px"
          fetchpriority="high"
          draggable="false"
        />
      </div>
    </section>

    <div class="shead"><span class="idx">01</span><h2>Selected Highlights</h2></div>
    <section v-if="highlights" class="simple">
      <p v-for="(p, i) in highlights.content || []" :key="i" style="margin-bottom: 18px">{{ p }}</p>
      <a
        v-if="highlights.cta"
        class="link"
        :href="highlights.cta.url"
        target="_blank"
        rel="noopener noreferrer"
        style="margin-top: 6px"
      >
        {{ highlights.cta.label }} <span class="ed-ico" v-html="icons.arrow" />
      </a>
    </section>

    <div class="shead">
      <span class="idx">02</span><h2>Timeline</h2>
      <span class="right kickmute">1996 — Present</span>
    </div>
    <section v-for="(t, i) in timeline" :id="slug(t.heading)" :key="i" class="entry">
      <div class="ent-l">
        <span class="eidx">{{ t.years }}</span>
        <div class="co" v-html="t.heading" />
        <div class="yr">{{ t.roles[0].subheading }}</div>
      </div>
      <div class="ent-r">
        <div class="role">
          <template v-for="(part, k) in splitRole(t.roles[0].content)" :key="k">
            <p v-if="part.type === 'lead'" class="lead" v-html="part.text" />
            <ul v-else-if="part.type === 'bullets'">
              <li v-for="(b, bi) in part.items" :key="bi" v-html="b" />
            </ul>
            <div v-else-if="part.type === 'chips'" class="chips">
              <span v-for="(ch, ci) in part.items" :key="ci" class="chip">{{ ch }}</span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section v-if="current" class="connect">
      <div>
        <h3>{{ current.heading }}</h3>
        <div class="sub" style="max-width: 48ch; line-height: 1.6">{{ current.content[0] }}</div>
      </div>
      <a
        v-if="current.cta"
        class="cbtn"
        :href="current.cta.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ current.cta.label }} <span class="ed-ico" v-html="icons.arrow" />
      </a>
    </section>
  </div>
</template>

<script setup>
import { useContentStore } from "~/stores/content";
import { edIcons } from "~/themes/reel-to-reel/icons.js";

const store = useContentStore();
const route = useRoute();
const { scrollToHash } = useScrollToHash();
const icons = edIcons;

const drums = computed(() => store.content?.drums || []);
const heroItem = computed(() => drums.value.find((e) => e.type === "hero") || {});
const highlights = computed(() => drums.value.find((e) => e.heading === "Selected Highlights"));
const current = computed(() => drums.value.find((e) => e.heading === "Current Drum Work"));
const timeline = computed(() =>
  drums.value.filter((e) => Array.isArray(e.roles) && e.roles.length)
);

const slug = (str) =>
  String(str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitRole = (content) => {
  const leads = [];
  const bullets = [];
  let tech = null;
  (content || []).forEach((line) => {
    if (/^\s*<strong>Tech:/i.test(line)) tech = line;
    else if (line.trim().startsWith("•")) bullets.push(line.replace(/^\s*•\s*/, ""));
    else leads.push(line);
  });
  const parts = leads.map((text) => ({ type: "lead", text }));
  if (bullets.length) parts.push({ type: "bullets", items: bullets });
  if (tech) {
    const items = tech
      .replace(/<strong>Tech:<\/strong>\s*/i, "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    parts.push({ type: "chips", items });
  }
  return parts;
};

onMounted(() => scrollToHash(route.hash));
watch(() => route.hash, scrollToHash);
watch(drums, () => scrollToHash(route.hash));

// ── Editorial-only chrome ──
const metaRow = [
  { l: "Role", v: "Session / Touring Drummer" },
  { l: "Experience", v: "30+ Years" },
  { l: "Studio", v: "Kennett Square, PA" },
];
const heroFacts = [
  { v: "DW · Roland · Zildjian · Evans · ProMark", l: "Brands used" },
  { v: "NYC · BAL · PHL · LA", l: "Tracked in" },
];
</script>
