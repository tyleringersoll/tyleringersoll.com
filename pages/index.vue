<template>
  <div class="hv2">

    <!-- ===================== HERO ===================== -->
    <section class="hv2-hero">
      <div class="hv2-inner">
        <div class="hv2-hero__grid">

          <div class="hv2-hero__kicker">
            <p class="hv2-eyebrow">{{ hero.eyebrow }}</p>
            <h1 class="hv2-hero__heading">{{ heroSection.heading }}</h1>
          </div>

          <div class="hv2-hero__text">
            <p
              v-for="(para, i) in heroSection.content"
              :key="i"
              class="hv2-hero__body"
              v-html="para"
            />

          </div>

          <!-- Profile portrait -->
          <div class="hv2-hero__visual">
            <img
              class="hv2-hero__portrait"
              src="/profile_glitch_subtle.gif"
              alt="Tyler Ingersoll"
              draggable="false"
            />
          </div>

        </div>
      </div>
    </section>

    <!-- ===================== ENGINEERING ===================== -->
    <section class="hv2-engineering" id="engineering">
      <div class="hv2-inner">
        <h2>{{ engineeringSection.heading }}</h2>
        <div class="hv2-two-col">

          <div class="hv2-engineering__left">
            <p v-html="engineeringSection.content[0]" />
            <div class="hv2-btn-wrap">
              <NuxtLink to="/resume" class="hv2-btn hv2-btn--primary">{{ eng.cta }}</NuxtLink>
            </div>
          </div>

          <div class="hv2-engineering__right">
            <p class="hv2-label">{{ eng.competenciesLabel }}</p>
            <div class="hv2-comp-grid">
              <component
                v-for="item in eng.competencies"
                :is="linkTag(item)"
                :key="item.label"
                v-bind="linkAttrs(item)"
                class="hv2-comp-item"
                :class="{ 'hv2-comp-item--linked': hasLink(item) }"
              >
                <span class="hv2-comp-icon" v-html="icons[item.icon]" aria-hidden="true" />
                <span>{{ item.label }}</span>
              </component>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================== MUSIC ===================== -->
    <section class="hv2-music" id="music">
      <div class="hv2-inner">
        <div class="hv2-music__layout">

          <div class="hv2-music__visual-column">
            <img
              class="hv2-music__cover-img"
              src="/images/studio_kit.jpeg"
              alt="Tyler Ingersoll's hybrid drum studio"
              draggable="false"
            />
            <!-- Desktop: card sits inside visual-column for overlap -->
            <component
              :is="linkTag(mus.studio)"
              v-bind="linkAttrs(mus.studio)"
              class="hv2-studio-callout hv2-studio-callout--desktop"
              :class="{ 'hv2-studio-callout--linked': hasLink(mus.studio) }"
            >
              <p class="hv2-label">{{ mus.studioLabel }}</p>
              <p>{{ mus.studio?.text }}</p>
              <span v-if="mus.studio?.ctaText" class="hv2-studio-callout__cta">
                {{ mus.studio.ctaText }} →
              </span>
            </component>
          </div>

          <!-- Mobile: card is a separate grid item for stacking order -->
          <component
            :is="linkTag(mus.studio)"
            v-bind="linkAttrs(mus.studio)"
            class="hv2-studio-callout hv2-studio-callout--mobile"
            :class="{ 'hv2-studio-callout--linked': hasLink(mus.studio) }"
          >
            <p class="hv2-label">{{ mus.studioLabel }}</p>
            <p>{{ mus.studio?.text }}</p>
            <span v-if="mus.studio?.ctaText" class="hv2-studio-callout__cta">
              {{ mus.studio.ctaText }} →
            </span>
          </component>

          <div class="hv2-music__text-column">
            <h2 class="hv2-music__heading">{{ musicSection.heading }}</h2>
            <p v-html="musicSection.content[0]" />
            <div class="hv2-btn-wrap">
              <NuxtLink to="/music" class="hv2-btn hv2-btn--primary">{{ mus.cta }}</NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================== BEYOND WORK ===================== -->
    <section class="hv2-beyond">
      <div class="hv2-inner">
        <h2 class="hv2-section-header">{{ beyondSection.heading }}</h2>
        <div class="hv2-beyond__cards">
          <component
            v-for="(card, cIdx) in bey.cards"
            :is="linkTag(card)"
            :key="card.label"
            v-bind="linkAttrs(card)"
            class="hv2-beyond-card"
            :class="{
              'hv2-beyond-card--linked': hasLink(card),
              'hv2-beyond-card--active': activeCard === cIdx
            }"
            @mouseenter="activeCard = cIdx"
            @mouseleave="activeCard = null"
            @focus="activeCard = cIdx"
            @blur="activeCard = null"
            :tabindex="hasLink(card) ? undefined : 0"
            :role="hasLink(card) ? undefined : 'button'"
            :aria-expanded="activeCard === cIdx"
          >
            <div class="hv2-beyond-card__front">
              <div class="hv2-beyond-card__icon" v-html="icons[card.icon]" aria-hidden="true" />
              <span class="hv2-beyond-card__label">{{ card.label }}</span>
              <span class="hv2-beyond-card__sub">{{ card.sub }}</span>
            </div>
            <div class="hv2-beyond-card__detail" aria-hidden="activeCard !== cIdx">
              <p>{{ card.detail }}</p>
            </div>
          </component>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const store = useContentStore();
const route = useRoute();
const { scrollToHash } = useScrollToHash();

const homeArr = computed(() => store.content?.home || []);
const heroSection       = computed(() => homeArr.value.find(s => s.id === "hero")        || {});
const engineeringSection = computed(() => homeArr.value.find(s => s.id === "engineering") || {});
const musicSection      = computed(() => homeArr.value.find(s => s.id === "music")       || {});
const beyondSection     = computed(() => homeArr.value.find(s => s.id === "beyond")      || {});

const pg  = computed(() => store.content?.homePage   || {});
const hero = computed(() => pg.value.hero            || {});
const eng  = computed(() => pg.value.engineering     || {});
const mus  = computed(() => pg.value.music           || {});
const bey  = computed(() => pg.value.beyond          || {});


const activeCard = ref(null);

const hasLink = (item) => !!item?.url;

const isExternalUrl = (item) =>
  item?.external === true || /^(https?:|mailto:|tel:)/i.test(item?.url || "");

const linkTag = (item, fallback = "div") => {
  if (!hasLink(item)) return fallback;
  return isExternalUrl(item) ? "a" : resolveComponent("NuxtLink");
};

const linkAttrs = (item) => {
  if (!hasLink(item)) return {};
  if (isExternalUrl(item)) {
    return { href: item.url, target: "_blank", rel: "noopener noreferrer" };
  }
  return { to: item.url };
};

onMounted(() => scrollToHash(route.hash));
watch(() => route.hash, scrollToHash);
watch(pg, () => scrollToHash(route.hash));

const icons = {
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "credit-card": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>`,
  film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  tv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  bicycle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0-1 1l-3.5 9.5"/><path d="M5.5 17.5l5-9.5 2 2.5 3.5-3"/><path d="M11 6h4"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  beer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.44.5-3 .5"/><path d="M3 11l.5 9H14l.5-9H3z"/></svg>`,
  "map-pin": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};
</script>

<style lang="scss" scoped>
// ─── Layout ───────────────────────────────────────────────────────────────────

.hv2 {
  width: 100%;
}

.hv2-inner {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $container-padding-x;
}

// ─── Two-column grid ──────────────────────────────────────────────────────────

.hv2-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @include respond-below(md) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

// ─── Section backgrounds ──────────────────────────────────────────────────────

.hv2-hero,
.hv2-music {
  background-color: var(--color-bg-primary);
}

.hv2-engineering,
.hv2-beyond {
  background-color: var(--color-bg-secondary);
}

.hv2-hero        { padding: 6.5rem 0; }
.hv2-engineering { padding: 5rem 0; }
.hv2-music       { padding: 5rem 0; }
.hv2-beyond      { padding: 5rem 0; }

@include respond-below(md) {
  .hv2-hero,
  .hv2-engineering,
  .hv2-music,
  .hv2-beyond {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

.hv2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.75rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  cursor: pointer;
  @include transition(all);

  &--primary {
    background-color: var(--color-link);
    color: var(--color-btn-primary-text);
    border: 2px solid var(--color-link);

    &:hover {
      background-color: var(--color-link-hover);
      border-color: var(--color-link-hover);
      color: #1a1a1a;
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
    }
  }

  &--ghost {
    background-color: transparent;
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);

    &:hover {
      border-color: var(--color-accent-line);
      color: var(--color-accent-line);
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
    }
  }

}

.hv2-btn-wrap {
  margin-top: 2rem;

  @include respond-below(sm) {
    .hv2-btn {
      width: 100%;
    }
  }
}

// ─── Utility text ─────────────────────────────────────────────────────────────

.hv2-label {
  margin: 0 0 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-line);
}

.hv2-eyebrow {
  margin: 0 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-line);
}

.hv2-section-header {
  margin: 0 0 2.5rem;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent-line);
  text-align: center;

  &--light {
    color: var(--color-text-primary);
  }
}

// ─── Hero section ─────────────────────────────────────────────────────────────

.hv2-hero {
  --hero-glass-bg: rgba(31, 39, 45, 0.5);
  --hero-glow-color: rgba(0, 183, 255, 0.2);
  --hero-glow-secondary: rgba(0, 183, 255, 0.08);

  border-bottom: 1px solid var(--color-border);

  html.light-mode & {
    --hero-glass-bg: rgba(232, 232, 226, 0.6);
    --hero-glow-color: rgba(0, 122, 181, 0.1);
    --hero-glow-secondary: rgba(100, 180, 220, 0.06);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto 1fr;
    align-items: start;

    @include respond-below(md) {
      grid-template-columns: 1fr;
      grid-template-rows: none;
    }
  }

  &__kicker {
    grid-column: 1 / 8;
    grid-row: 1;
    position: relative;
    z-index: 2;

    @include respond-below(md) {
      grid-column: 1 / -1;
      grid-row: auto;
    }
  }

  &__text {
    grid-column: 1 / 8;
    grid-row: 2;
    position: relative;
    z-index: 2;

    @include respond-below(md) {
      grid-column: 1 / -1;
      grid-row: auto;
      order: 2;
    }
  }

  &__heading {
    margin: 0.25rem 0 1.25rem;
    font-size: clamp(4rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--color-text-primary);
  }

  &__body {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    max-width: 60ch;

    &:last-of-type {
      margin-bottom: 0;
    }
  }





  &__visual {
    grid-column: 7 / -1;
    grid-row: 1 / -1;
    align-self: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    animation: hv2-float 6s ease-in-out infinite;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 130%;
      height: 130%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(
        circle at 50% 45%,
        rgba($color-highlight-3, 0.16) 0%,
        rgba($color-highlight-3, 0.07) 38%,
        transparent 68%
      );
      filter: blur(64px);
      z-index: -1;
      pointer-events: none;

      html.light-mode & {
        background: radial-gradient(
          circle at 50% 45%,
          rgba(0, 122, 181, 0.09) 0%,
          rgba(0, 122, 181, 0.03) 40%,
          transparent 68%
        );
        filter: blur(48px);
      }
    }

    @include respond-below(md) {
      grid-column: 1 / -1;
      grid-row: auto;
      order: 1;
      max-width: 100%;
      margin: 1.5rem 0;
    }

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &__portrait {
    position: relative;
    z-index: 1;
    display: block;
    width: 75%;
    max-width: 400px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;

    html.light-mode & {
      filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.12));
    }
  }
}

@keyframes hv2-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

// ─── Engineering section ───────────────────────────────────────────────────────

.hv2-engineering {
  border-bottom: 1px solid var(--color-border);

  > .hv2-inner > h2 {
    margin-bottom: 2rem;
  }

  &__left {
    p {
      margin-top: 0;
      font-size: 1rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }
  }
}

.hv2-block {
  display: flex;
  flex-direction: column;
}

.hv2-comp-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @include respond-below(xs) {
    grid-template-columns: 1fr;
  }
}

.hv2-comp-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: default;
  @include transition(all);

  &--linked {
    cursor: pointer;

    &:hover {
      border-color: var(--color-accent-line);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
    }
  }
}

.hv2-comp-icon {
  flex-shrink: 0;
  display: inline-flex;
  width: 18px;
  height: 18px;
  color: var(--color-accent-line);

  :deep(svg) {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
}

.hv2-clients-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.hv2-client-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
  cursor: default;
  @include transition(background-color);

  &:last-child {
    border-bottom: none;
  }

  &--linked {
    cursor: pointer;

    &:hover {
      background-color: var(--color-bg-surface);

      .hv2-client-name {
        color: var(--color-accent-line);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: -2px;
    }
  }
}

.hv2-client-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.hv2-client-desc {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin-top: 0.15rem;
}

// ─── Music section ─────────────────────────────────────────────────────────────

.hv2-music {
  border-bottom: 1px solid var(--color-border);

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;

    @include respond-below(md) {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }

  &__visual-column {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    min-height: 500px;
    border-radius: 10px;
    overflow: visible;

    @include respond-below(md) {
      order: 2;
      min-height: 320px;
      border-radius: 8px;
    }
  }

  &__cover-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    border-radius: 10px;
    filter: brightness(0.8);

    @include respond-below(md) {
      border-radius: 8px;
    }
  }

  &__text-column {
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      margin-top: 0;
      font-size: 1rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }

    @include respond-below(md) {
      order: 1;
      margin-bottom: 2rem;
    }
  }

  &__heading {
    margin: 0 0 1.25rem;
  }
}

.hv2-studio-callout {
  --glass-bg: rgba(21, 26, 30, 0.7);
  --glass-border: rgba(79, 91, 102, 0.4);

  html.light-mode & {
    --glass-bg: rgba(245, 245, 240, 0.72);
    --glass-border: rgba(192, 197, 203, 0.5);
  }

  position: relative;
  z-index: 1;
  display: block;
  max-width: 380px;
  padding: 1.25rem 1.25rem 1.25rem 1.1rem;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-left: 3px solid var(--color-link);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  cursor: default;
  transform: translate(2rem, 2rem) translateY(-2px);
  @include transition(all);

  // Desktop: inside visual-column, mobile copy hidden
  &--desktop {
    @include respond-below(md) {
      display: none;
    }
  }

  // Mobile: separate grid item, desktop copy hidden
  &--mobile {
    display: none;

    @include respond-below(md) {
      display: block;
      order: 3;
      width: 100%;
      max-width: none;
      margin-left: auto;
      margin-right: auto;
      margin-top: -8rem;
      transform: translate(0, 0);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
  }

  p {
    margin: 0 0 0.4rem;
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--color-text-secondary);

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__cta {
    display: inline-block;
    margin-top: 0.6rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    white-space: nowrap;
    color: var(--color-link);
    @include transition(color);
  }

  &--linked {
    cursor: pointer;

    &:hover {
      transform: translate(2rem, 2rem) translateY(-2px);
      border-color: var(--color-link-hover);
      border-left-color: var(--color-link-hover);

      .hv2-studio-callout__cta {
        color: var(--color-link-hover);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
    }
  }

  &--linked#{&}--mobile:hover {
    @include respond-below(md) {
      transform: translateY(-2px);
    }
  }
}

.hv2-placements-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent-line);
  border-radius: 8px;
  padding: 1.25rem 1.25rem 1.25rem 1.1rem;
}

.hv2-placements-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  li {
    margin: 0;
    padding: 0;
  }
}

.hv2-placement-item {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: default;
  @include transition(color);

  &--linked {
    cursor: pointer;

    &:hover {
      color: var(--color-link-hover);

      .hv2-placement-icon {
        color: var(--color-link-hover);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
      border-radius: 2px;
    }
  }
}

.hv2-placement-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color-link);

  :deep(svg) {
    width: 16px;
    height: 16px;
  }
}


// ─── Beyond Work section ───────────────────────────────────────────────────────

.hv2-beyond {
  border-bottom: 1px solid var(--color-border);

  &__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;

    @include respond-below(md) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.hv2-beyond-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 1rem 1.5rem;
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  cursor: default;
  overflow: hidden;
  @include transition(all);

  &--linked {
    cursor: pointer;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }

  &__front {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    @include transition(opacity);
  }

  &__detail {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem;
    background-color: var(--color-bg-surface);
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;

    p {
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.6;
      color: var(--color-text-secondary);
    }
  }

  &--active,
  &:hover {
    border-color: var(--color-accent-line);
    transform: translateY(-2px);

    .hv2-beyond-card__front {
      opacity: 0;
    }

    .hv2-beyond-card__detail {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hv2-beyond-card__detail {
      transition: none;
      transform: none;
    }

    .hv2-beyond-card__front {
      transition: none;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    color: var(--color-accent-line);
    margin-bottom: 0.25rem;

    :deep(svg) {
      width: 44px;
      height: 44px;
    }
  }

  &__label {
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  &__sub {
    font-size: 0.78rem;
    color: var(--color-text-secondary);
    line-height: 1.4;
  }
}


</style>
