<template>
  <div class="ed-frame">
    <section class="meta">
      <div v-for="m in metaRow" :key="m.l">
        <span class="kickmute">{{ m.l }}</span><b>{{ m.v }}</b>
      </div>
    </section>

    <section class="pagehead">
      <div class="ph-left">
        <span class="kick">Curriculum Vitae</span>
        <h1 class="ph-title">Re<span class="o">sume</span></h1>
        <div class="ph-intro">
          <p v-for="(p, i) in intro.content || []" :key="i" v-html="p" />
        </div>
        <NuxtLink v-if="intro.cta" class="link" :to="intro.cta.url">
          {{ intro.cta.label }} <span class="ed-ico" v-html="icons.arrow" />
        </NuxtLink>
      </div>
      <div class="ph-right">
        <div v-for="f in facts" :key="f.l" class="ph-fact">
          <div class="v">{{ f.v }}</div>
          <div class="l">{{ f.l }}</div>
        </div>
      </div>
    </section>

    <div class="shead">
      <span class="idx">01</span><h2>Experience</h2>
      <span class="right kickmute">2000 — Present</span>
    </div>
    <section v-for="(emp, i) in employers" :id="slug(emp.heading)" :key="i" class="entry">
      <div class="ent-l">
        <span class="eidx">{{ pad(i + 1) }} / EMPLOYER</span>
        <div class="co" v-html="emp.heading" />
        <div class="yr">{{ emp.years }}</div>
      </div>
      <div class="ent-r">
        <div v-for="(r, j) in emp.roles" :key="j" class="role">
          <p class="rsub">{{ r.subheading }}</p>
          <template v-for="(part, k) in splitRole(r.content)" :key="k">
            <p v-if="part.type === 'lead'" class="lead" v-html="part.text" />
            <ul v-else-if="part.type === 'bullets'">
              <li v-for="(b, bi) in part.items" :key="bi" v-html="b" />
            </ul>
            <div v-else-if="part.type === 'chips'" class="chips">
              <span v-for="(t, ti) in part.items" :key="ti" class="chip">{{ t }}</span>
            </div>
          </template>
        </div>
      </div>
    </section>

    <div class="shead"><span class="idx">02</span><h2>Education &amp; More</h2></div>
    <section v-if="education.content" class="entry">
      <div class="ent-l"><span class="eidx">EDU / DEGREE</span><div class="co">Education</div></div>
      <div class="ent-r">
        <div class="role"><p class="lead" v-html="education.content[0]" /></div>
      </div>
    </section>
    <section v-if="additional.content" class="entry">
      <div class="ent-l">
        <span class="eidx">ALT / PARALLEL CAREER</span>
        <div class="co" v-html="additional.heading" />
      </div>
      <div class="ent-r">
        <div class="role"><p class="lead" v-html="additional.content[0]" /></div>
      </div>
    </section>

    <div class="shead"><span class="idx">03</span><h2>Technical Skills</h2></div>
    <section class="skillgrid">
      <div v-for="col in skillCols" :key="col.h" class="sk">
        <div class="skh">{{ col.h }}</div>
        <ul>
          <li v-for="it in col.items" :key="it">{{ it }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useContentStore } from "~/stores/content";
import { edIcons } from "~/themes/editorial/icons.js";

const store = useContentStore();
const route = useRoute();
const { scrollToHash } = useScrollToHash();
const icons = edIcons;

const resume = computed(() => store.content?.resume || []);
const intro = computed(
  () => resume.value.find((e) => e.headingLevel === 2 && e.cta) || resume.value[0] || {}
);
const employers = computed(() => resume.value.filter((e) => Array.isArray(e.roles)));
const education = computed(() => resume.value.find((e) => e.heading === "Education") || {});
const additional = computed(
  () => resume.value.find((e) => e.heading === "Additional Experience") || {}
);
const skillsItem = computed(() => resume.value.find((e) => e.skills) || {});
const skillCols = computed(() => {
  const s = skillsItem.value.skills || {};
  return [
    { h: "Languages", items: s.languages || [] },
    { h: "Frameworks", items: s.frameworks || [] },
    { h: "Infrastructure", items: s.infrastructure || [] },
    { h: "Concepts", items: s.concepts || [] },
  ];
});

const pad = (n) => String(n).padStart(2, "0");
const slug = (str) =>
  String(str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Split a role's content[] into ordered render parts: lead paragraphs, a bullet
// list, and a tech-chip row (from the "<strong>Tech:</strong> …" line).
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
watch(resume, () => scrollToHash(route.hash));

// ── Editorial-only chrome ──
const metaRow = [
  { l: "Discipline", v: "Frontend Engineering" },
  { l: "Focus", v: "Architecture / Leadership" },
  { l: "Based", v: "Kennett Square, PA" },
];
const facts = [
  { v: "25+", l: "Years building for the web" },
  { v: "7", l: "Employers & engagements" },
];
</script>
