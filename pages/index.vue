<template>
  <div class="hv2">

    <!-- ===================== HERO ===================== -->
    <section class="hv2-hero">
      <div class="hv2-inner">
        <div class="hv2-hero__grid">

          <div class="hv2-hero__text">
            <p class="hv2-eyebrow">{{ hero.eyebrow }}</p>
            <h1 class="hv2-hero__heading">{{ heroSection.heading }}</h1>
            <p
              v-for="(para, i) in heroSection.content"
              :key="i"
              class="hv2-hero__body"
              v-html="para"
            />
            <div class="hv2-hero__actions">
              <a href="#engineering" class="hv2-btn hv2-btn--primary">{{ hero.primaryCta }}</a>
              <a href="#music" class="hv2-btn hv2-btn--ghost">{{ hero.secondaryCta }}</a>
            </div>
          </div>

          <!-- SVG: drums + code illustration -->
          <div class="hv2-hero__visual" aria-hidden="true">
            <svg class="hv2-hero__svg" viewBox="0 0 440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hv2-grid" width="22" height="22" patternUnits="userSpaceOnUse">
                  <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#00B7FF" stroke-width="0.4" opacity="0.12"/>
                </pattern>
                <radialGradient id="hv2-glow" cx="50%" cy="55%" r="50%">
                  <stop offset="0%" stop-color="#00B7FF" stop-opacity="0.12"/>
                  <stop offset="100%" stop-color="#00B7FF" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="hv2-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#00B7FF" stop-opacity="0.18"/>
                  <stop offset="100%" stop-color="#00B7FF" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="440" height="400" fill="url(#hv2-grid)"/>
              <ellipse cx="220" cy="228" rx="155" ry="140" fill="url(#hv2-glow)"/>
              <circle cx="220" cy="228" r="132" stroke="#00B7FF" stroke-width="2" opacity="0.18"/>
              <circle cx="220" cy="228" r="108" stroke="#00B7FF" stroke-width="1.5" opacity="0.3"/>
              <circle cx="220" cy="228" r="80" stroke="#00B7FF" stroke-width="2" opacity="0.5"/>
              <circle cx="220" cy="228" r="48" stroke="#00B7FF" stroke-width="2.5" opacity="0.85"/>
              <circle cx="220" cy="228" r="48" fill="url(#hv2-center)"/>
              <line x1="220" y1="96" x2="220" y2="148" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="313" y1="135" x2="276" y2="161" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="352" y1="228" x2="300" y2="228" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="313" y1="321" x2="276" y2="295" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="220" y1="360" x2="220" y2="308" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="127" y1="321" x2="164" y2="295" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="88" y1="228" x2="140" y2="228" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="127" y1="135" x2="164" y2="161" stroke="#00B7FF" stroke-width="0.8" opacity="0.22"/>
              <line x1="172" y1="18" x2="207" y2="228" stroke="#ff6f69" stroke-width="8" stroke-linecap="round" opacity="0.92"/>
              <circle cx="172" cy="18" r="9" fill="#ff6f69" opacity="0.92"/>
              <line x1="268" y1="18" x2="233" y2="228" stroke="#ff6f69" stroke-width="8" stroke-linecap="round" opacity="0.92"/>
              <circle cx="268" cy="18" r="9" fill="#ff6f69" opacity="0.92"/>
              <ellipse cx="106" cy="72" rx="40" ry="11" stroke="#ffcc5c" stroke-width="1.5" opacity="0.55" fill="none"/>
              <ellipse cx="106" cy="78" rx="40" ry="11" stroke="#ffcc5c" stroke-width="1" opacity="0.3" fill="none"/>
              <line x1="106" y1="89" x2="106" y2="140" stroke="#a7adba" stroke-width="2" opacity="0.35"/>
              <ellipse cx="334" cy="72" rx="40" ry="11" stroke="#ffcc5c" stroke-width="1.5" opacity="0.55" fill="none"/>
              <line x1="334" y1="83" x2="334" y2="140" stroke="#a7adba" stroke-width="2" opacity="0.35"/>
              <text x="4" y="176" font-size="15" fill="#00B7FF" opacity="0.65" font-family="monospace">{</text>
              <rect x="14" y="185" width="58" height="2.5" rx="1.2" fill="#a7adba" opacity="0.45"/>
              <rect x="18" y="195" width="42" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.6"/>
              <rect x="18" y="205" width="52" height="2.5" rx="1.2" fill="#a7adba" opacity="0.38"/>
              <rect x="18" y="215" width="34" height="2.5" rx="1.2" fill="#ffcc5c" opacity="0.5"/>
              <rect x="18" y="225" width="48" height="2.5" rx="1.2" fill="#a7adba" opacity="0.35"/>
              <rect x="18" y="235" width="30" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.5"/>
              <rect x="18" y="245" width="44" height="2.5" rx="1.2" fill="#a7adba" opacity="0.38"/>
              <rect x="18" y="255" width="38" height="2.5" rx="1.2" fill="#ffcc5c" opacity="0.45"/>
              <rect x="18" y="265" width="50" height="2.5" rx="1.2" fill="#a7adba" opacity="0.3"/>
              <rect x="18" y="275" width="40" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.4"/>
              <text x="4" y="290" font-size="15" fill="#00B7FF" opacity="0.65" font-family="monospace">}</text>
              <line x1="72" y1="228" x2="88" y2="228" stroke="#00B7FF" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
              <circle cx="72" cy="228" r="3" fill="#00B7FF" opacity="0.7"/>
              <text x="418" y="176" font-size="15" fill="#00B7FF" opacity="0.65" font-family="monospace" text-anchor="end">}</text>
              <rect x="368" y="185" width="58" height="2.5" rx="1.2" fill="#a7adba" opacity="0.45"/>
              <rect x="368" y="195" width="44" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.6"/>
              <rect x="368" y="205" width="50" height="2.5" rx="1.2" fill="#a7adba" opacity="0.38"/>
              <rect x="368" y="215" width="38" height="2.5" rx="1.2" fill="#ffcc5c" opacity="0.5"/>
              <rect x="368" y="225" width="56" height="2.5" rx="1.2" fill="#a7adba" opacity="0.35"/>
              <rect x="368" y="235" width="32" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.5"/>
              <rect x="368" y="245" width="48" height="2.5" rx="1.2" fill="#a7adba" opacity="0.38"/>
              <rect x="368" y="255" width="40" height="2.5" rx="1.2" fill="#ffcc5c" opacity="0.4"/>
              <rect x="368" y="265" width="52" height="2.5" rx="1.2" fill="#a7adba" opacity="0.3"/>
              <rect x="368" y="275" width="36" height="2.5" rx="1.2" fill="#00B7FF" opacity="0.4"/>
              <text x="422" y="290" font-size="15" fill="#00B7FF" opacity="0.65" font-family="monospace" text-anchor="end">{</text>
              <line x1="368" y1="228" x2="352" y2="228" stroke="#00B7FF" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
              <circle cx="368" cy="228" r="3" fill="#00B7FF" opacity="0.7"/>
            </svg>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================== ENGINEERING ===================== -->
    <section class="hv2-engineering" id="engineering">
      <div class="hv2-inner">
        <div class="hv2-two-col">

          <div class="hv2-engineering__left">

            <div class="hv2-block">
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

            <div class="hv2-block">
              <p class="hv2-label">{{ eng.clientsLabel }}</p>
              <div class="hv2-clients-list">
                <component
                  v-for="client in eng.clients"
                  :is="linkTag(client)"
                  :key="client.name"
                  v-bind="linkAttrs(client)"
                  class="hv2-client-item"
                  :class="{ 'hv2-client-item--linked': hasLink(client) }"
                >
                  <span class="hv2-client-name">{{ client.name }}</span>
                  <span class="hv2-client-desc">{{ client.description }}</span>
                </component>
              </div>
            </div>

          </div>

          <div class="hv2-engineering__right">
            <h2>{{ engineeringSection.heading }}</h2>
            <p>{{ engineeringSection.content[0] }}</p>
            <div class="hv2-btn-wrap">
              <NuxtLink to="/resume" class="hv2-btn hv2-btn--primary">{{ eng.cta }}</NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ===================== MUSIC ===================== -->
    <section class="hv2-music" id="music">
      <div class="hv2-inner">
        <div class="hv2-two-col">

          <div class="hv2-music__left">
            <h2>{{ musicSection.heading }}</h2>
            <p>{{ musicSection.content[0] }}</p>
            <div class="hv2-btn-wrap">
              <NuxtLink to="/music" class="hv2-btn hv2-btn--primary">{{ mus.cta }}</NuxtLink>
            </div>
          </div>

          <div class="hv2-music__right">

            <component
              :is="linkTag(mus.studio)"
              v-bind="linkAttrs(mus.studio)"
              class="hv2-studio-callout"
              :class="{ 'hv2-studio-callout--linked': hasLink(mus.studio) }"
            >
              <p class="hv2-label">{{ mus.studioLabel }}</p>
              <p>{{ mus.studio?.text }}</p>
              <span v-if="mus.studio?.ctaText" class="hv2-studio-callout__cta">
                {{ mus.studio.ctaText }} →
              </span>
            </component>

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
            v-for="card in bey.cards"
            :is="linkTag(card)"
            :key="card.label"
            v-bind="linkAttrs(card)"
            class="hv2-beyond-card"
            :class="{ 'hv2-beyond-card--linked': hasLink(card) }"
          >
            <div class="hv2-beyond-card__icon" v-html="icons[card.icon]" aria-hidden="true" />
            <span class="hv2-beyond-card__label">{{ card.label }}</span>
            <span class="hv2-beyond-card__sub">{{ card.sub }}</span>
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
  max-width: 1160px;
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

.hv2-hero        { padding: 6.5rem 0 5.5rem; }
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
    color: #fff;
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
  letter-spacing: 0.2em;
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
  border-bottom: 1px solid var(--color-border);

  &__grid {
    display: grid;
    grid-template-columns: 55% 45%;
    gap: 3rem;
    align-items: center;

    @include respond-below(md) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  &__heading {
    margin: 0.25rem 0 1.25rem;
    font-size: clamp(2.4rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--color-text-primary);
  }

  &__body {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
    max-width: 52ch;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 2rem;

    @include respond-below(sm) {
      flex-direction: column;

      .hv2-btn {
        width: 100%;
      }
    }
  }

  &__visual {
    display: flex;
    align-items: center;
    justify-content: center;

    @include respond-below(md) {
      order: -1;
    }
  }

  &__svg {
    width: 100%;
    max-width: 440px;
    height: auto;
    color: var(--color-text-muted);
  }
}

// ─── Engineering section ───────────────────────────────────────────────────────

.hv2-engineering {
  border-bottom: 1px solid var(--color-border);

  &__left {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__right {
    h2 {
      margin-bottom: 1.25rem;
    }

    p {
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

  &__left {
    h2 {
      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--color-text-secondary);
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    @include respond-to(md) {
      padding-top: 4rem;
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

.hv2-studio-callout {
  display: block;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-link);
  border-radius: 8px;
  padding: 1.25rem 1.25rem 1.25rem 1.1rem;
  text-decoration: none;
  color: inherit;
  cursor: default;
  @include transition(all);

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
    color: var(--color-link);
    @include transition(color);
  }

  &--linked {
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
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
  @include transition(all);

  &--linked {
    cursor: pointer;

    &:hover {
      border-color: var(--color-accent-line);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
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
    color: var(--color-text-muted);
    line-height: 1.4;
  }
}

</style>
