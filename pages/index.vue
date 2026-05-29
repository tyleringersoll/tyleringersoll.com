<template>
  <div class="hv2">
    <!-- ===================== HERO ===================== -->
    <section class="hv2-hero">
      <div class="hv2-inner">
        <div class="hv2-hero__grid">
          <div class="hv2-hero__kicker">
            <p class="hv2-eyebrow">{{ hero.eyebrow }}</p>
            <h1 class="hv2-hero__heading">{{ hero.heading }}</h1>
          </div>

          <div class="hv2-hero__text">
            <p
              v-for="(para, i) in hero.paragraphs"
              :key="i"
              class="hv2-hero__body"
              v-html="para"
            />
          </div>

          <!-- Profile portrait -->
          <div class="hv2-hero__visual">
            <img
              class="hv2-hero__portrait"
              src="/profile_glitch_subtle.webp"
              alt="Tyler Ingersoll"
              width="400"
              height="400"
              fetchpriority="high"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== ENGINEERING ===================== -->
    <section class="hv2-engineering" id="engineering">
      <div class="hv2-inner">
        <h2>{{ eng.heading }}</h2>
        <div class="hv2-two-col">
          <div class="hv2-engineering__left">
            <p v-html="eng.body" />
            <div class="hv2-btn-wrap">
              <NuxtLink :to="eng.ctaUrl" class="hv2-btn hv2-btn--primary">{{
                eng.cta
              }} <span class="hv2-btn__icon" aria-hidden="true">→</span></NuxtLink>
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
                <span
                  class="hv2-comp-icon"
                  v-html="icons[item.icon]"
                  aria-hidden="true"
                />
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
            <NuxtImg
              class="hv2-music__cover-img"
              src="/images/studio_kit.webp"
              alt="Tyler Ingersoll's hybrid drum studio"
              width="800"
              height="600"
              sizes="100vw md:50vw lg:600px"
              loading="lazy"
              draggable="false"
            />
          </div>

          <div class="hv2-music__text-column">
            <h2 class="hv2-music__heading">{{ mus.heading }}</h2>
            <p v-html="mus.body" />
            <div class="hv2-btn-wrap">
              <NuxtLink :to="mus.ctaUrl" class="hv2-btn hv2-btn--primary">{{
                mus.cta
              }} <span class="hv2-btn__icon" aria-hidden="true">→</span></NuxtLink>
            </div>
            <component
              :is="linkTag(mus.studio)"
              v-bind="linkAttrs(mus.studio)"
              class="hv2-studio-callout"
              :class="{ 'hv2-studio-callout--linked': hasLink(mus.studio) }"
            >
              <p class="hv2-label">{{ mus.studioLabel }}</p>
              <p>{{ mus.studio?.text }}</p>
              <span v-if="mus.studio?.ctaText" class="hv2-studio-callout__cta">
                {{ mus.studio.ctaText }}
                <span class="hv2-studio-callout__cta-icon" aria-hidden="true">{{ linkIcon(mus.studio) }}</span>
              </span>
            </component>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== BEYOND WORK ===================== -->
    <section class="hv2-beyond">
      <div class="hv2-inner">
        <h2 class="hv2-section-header">{{ bey.heading }}</h2>
        <div class="hv2-beyond__cards">
          <component
            v-for="(card, cIdx) in bey.cards"
            :is="linkTag(card)"
            :key="card.label"
            v-bind="linkAttrs(card)"
            class="hv2-beyond-card"
            :class="{
              'hv2-beyond-card--linked': hasLink(card),
              'hv2-beyond-card--active': activeCard === cIdx,
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
              <div
                class="hv2-beyond-card__icon"
                v-html="icons[card.icon]"
                aria-hidden="true"
              />
              <span class="hv2-beyond-card__label">{{ card.label }}</span>
              <span class="hv2-beyond-card__sub">{{ card.sub }}</span>
            </div>
            <div class="hv2-beyond-card__detail" :aria-hidden="activeCard !== cIdx">
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

const home = computed(() => store.content?.home || {});
const hero = computed(() => home.value.hero || {});
const eng = computed(() => home.value.engineering || {});
const mus = computed(() => home.value.drums || {});
const bey = computed(() => home.value.beyond || {});

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

const linkIcon = (item) => isExternalUrl(item) ? "↗" : "→";

onMounted(() => scrollToHash(route.hash));
watch(() => route.hash, scrollToHash);
watch(home, () => scrollToHash(route.hash));

const icons = {
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3.5 21v-1a5.5 5.5 0 0 1 11 0v1"/><path d="M16 4.5a3 3 0 0 1 0 5"/><path d="M18 14a4.5 4.5 0 0 1 3 4.25V21"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l4-5"/><path d="M8 18h8"/><path d="M7 14h.01"/><path d="M17 14h.01"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "credit-card": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  package: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8.5 12 3 3 8.5l9 5.5 9-5.5Z"/><path d="M3 8.5v7L12 21l9-5.5v-7"/><path d="M12 14v7"/><path d="m7.5 5.8 9 5.5"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6v5h-5"/><path d="M4 18v-5h5"/><path d="M18.5 10A7 7 0 0 0 6.8 6.6L4 9.2"/><path d="M5.5 14a7 7 0 0 0 11.7 3.4L20 14.8"/></svg>`,
  plug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7V3"/><path d="M15 7V3"/><path d="M7 7h10v4a5 5 0 0 1-10 0V7Z"/><path d="M12 16v5"/><path d="M8 21h8"/></svg>`,
  "file-text": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="13" r="1" fill="currentColor"/></svg>`,
  film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  tv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  bicycle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 0 0-1 1l-3.5 9.5"/><path d="M5.5 17.5l5-9.5 2 2.5 3.5-3"/><path d="M11 6h4"/></svg>`,
  "family-play": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="3"/><path d="M3 21v-1a5 5 0 0 1 10 0v1"/><circle cx="17" cy="9" r="2"/><path d="M13 21v-1a4 4 0 0 1 8 0v1"/></svg>`,
  grill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a8 8 0 0 1 16 0"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="3" y1="11" x2="21" y2="11"/><path d="M5 11a7 5 0 0 0 14 0"/><line x1="8" y1="16" x2="6" y2="21"/><line x1="16" y1="16" x2="18" y2="21"/></svg>`,
  vinyl: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
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

.hv2-hero {
  padding: 6.5rem 0;
}
.hv2-engineering {
  padding: 5rem 0;
}
.hv2-music {
  padding: 5rem 0;
}
.hv2-beyond {
  padding: 5rem 0;
}

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

  &__icon {
    margin-left: 0.35rem;
    line-height: 1;
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
      content: "";
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
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
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
    align-items: stretch;

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
    justify-content: flex-start;

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

  display: block;
  width: 100%;
  margin-top: 2.5rem;
  padding: 1.25rem 1.25rem 1.25rem 1.1rem;

  @include respond-below(md) {
    margin-top: 3.75rem;
  }
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-left: 3px solid var(--color-link);
  border-radius: 8px;
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

  &__cta-icon {
    margin-left: 0.2rem;
    line-height: 1;
  }

  &--linked {
    cursor: pointer;

    &:hover {
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
