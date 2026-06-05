<template>
  <div class="ed-frame">
    <!-- ===================== HERO ===================== -->
    <section class="hero">
      <div class="meta">
        <div v-for="m in metaRow" :key="m.l">
          <span class="kickmute">{{ m.l }}</span><b>{{ m.v }}</b>
        </div>
      </div>
      <div class="heroband">
        <div class="heroL">
          <span class="kick">Portfolio — Est. 2000</span>
          <h1 class="bigname">{{ name.first }}<span class="l2">{{ name.rest }}</span></h1>
          <div class="roleline">
            <span class="dot" />Frontend Engineer<span>+</span>Drummer<span>·</span>Three decades on both
          </div>
          <div class="introbox">
            <p v-for="(p, i) in hero.paragraphs" :key="i">{{ p }}</p>
          </div>
        </div>
        <div class="heroR">
          <div class="portrait">
            <img
              src="/profile_glitch_subtle.webp"
              alt="Tyler Ingersoll"
              width="400"
              height="400"
              fetchpriority="high"
              draggable="false"
            />
            <div class="cap">Fig. 01 — At the kit</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== ENGINEERING ===================== -->
    <section id="engineering">
      <div class="shead">
        <span class="idx">01</span><h2>Engineering</h2>
        <span class="right kickmute">Vue · Angular · TypeScript</span>
      </div>
      <div class="eng">
        <div class="body">
          <p>{{ eng.body }}</p>
          <NuxtLink class="link" :to="eng.ctaUrl || '/resume'">
            {{ eng.cta }} <span class="ed-ico" v-html="icons.arrow" />
          </NuxtLink>
        </div>
        <div>
          <div v-for="(c, i) in eng.competencies" :key="c.label" class="comprow">
            <span class="n mono">{{ pad(i + 1) }}</span>
            <span class="ed-ico" v-html="icons[c.icon]" />
            <span class="lbl">{{ c.label }}</span>
          </div>
          <a
            v-if="eng.projects"
            class="callout"
            :href="eng.projects.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="l">{{ eng.projectsLabel }}</span>
            <p>{{ eng.projects.text }}</p>
            <span class="callout__cta">↗ {{ eng.projects.ctaText }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ===================== MUSIC ===================== -->
    <section id="music">
      <div class="shead">
        <span class="idx">02</span><h2>Music</h2>
        <span class="right kickmute">Session · Touring · Studio</span>
      </div>
      <div class="music">
        <div class="pic">
          <span class="tag">Home Studio</span>
          <NuxtImg
            src="/images/studio_kit.webp"
            alt="Tyler Ingersoll's hybrid drum studio"
            width="800"
            height="600"
            sizes="100vw md:50vw lg:520px"
            loading="lazy"
            draggable="false"
          />
        </div>
        <div class="txt">
          <p>{{ mus.body }}</p>
          <NuxtLink class="link" :to="mus.ctaUrl || '/music'">
            {{ mus.cta }} <span class="ed-ico" v-html="icons.arrow" />
          </NuxtLink>
          <div class="statrow statrow--two">
            <div v-for="s in musicStats" :key="s.l" class="st">
              <div class="v">{{ s.v }}</div>
              <div class="l">{{ s.l }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== BEYOND ===================== -->
    <section>
      <div class="shead"><span class="idx">03</span><h2>Beyond Work</h2></div>
      <div class="beyond">
        <div v-for="(c, i) in bey.cards" :key="c.label" class="bcol">
          <span class="num">{{ pad(i + 1) }} / {{ pad(bey.cards.length) }}</span>
          <span class="ed-ico" v-html="icons[c.icon]" />
          <h4>{{ c.label }}</h4>
          <div class="sub">{{ c.sub }}</div>
          <p class="det">{{ c.detail }}</p>
        </div>
      </div>
    </section>

    <!-- ===================== CONNECT ===================== -->
    <section class="connect">
      <div>
        <h3>{{ connect.heading }}</h3>
        <div class="sub">{{ connect.subtext }}</div>
      </div>
      <a class="cbtn" href="mailto:tyler@ingersoll.dev">
        {{ connect.cta }} <span class="ed-ico" v-html="icons.arrow" />
      </a>
    </section>
  </div>
</template>

<script setup>
import { useContentStore } from "~/stores/content";
import { edIcons } from "~/themes/reel-to-reel/icons.js";

const store = useContentStore();
const icons = edIcons;

const home = computed(() => store.content?.home || {});
const hero = computed(() => home.value.hero || {});
const eng = computed(() => home.value.engineering || {});
const mus = computed(() => home.value.drums || {});
const bey = computed(() => home.value.beyond || {});
const connect = computed(() => home.value.connect || {});

// Split the real name into a normal first word + outlined remainder for .bigname.
const name = computed(() => {
  const full = store.content?.meta?.name || "Tyler Ingersoll";
  const parts = full.trim().split(/\s+/);
  return { first: parts[0], rest: parts.slice(1).join(" ") };
});

const pad = (n) => String(n).padStart(2, "0");

// ── Editorial-only chrome (not in the shared content store) ──
const metaRow = [
  { l: "Discipline", v: "Frontend Engineering" },
  { l: "Also", v: "Session / Touring Drummer" },
  { l: "Based", v: "Kennett Square, PA" },
];
const musicStats = [
  { v: "30+", l: "Years playing" },
  { v: "NYC · BAL · PHL · LA", l: "Tracked in" }
];
</script>
