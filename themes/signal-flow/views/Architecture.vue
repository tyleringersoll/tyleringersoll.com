<template>
  <div v-if="archContent" class="arch-page">

    <!-- Page intro -->
    <section v-if="introSection" class="arch-section arch-intro">
      <div class="arch-inner">
        <h2>{{ introSection.heading }}</h2>
        <p
          v-for="(para, i) in prose(introSection)"
          :key="i"
          class="arch-intro__body"
          v-html="para"
        />
        <ul v-if="bullets(introSection).length" class="arch-list">
          <li v-for="(item, i) in bullets(introSection)" :key="i" v-html="item" />
        </ul>
      </div>
    </section>

    <section
      v-for="(section, sIdx) in contentSections"
      :key="sIdx"
      class="arch-section"
      :class="{ 'arch-section--alt': sIdx % 2 === 0 }"
    >
      <div class="arch-inner">
        <article :id="section.id" class="arch-card">
          <component :is="`h${section.headingLevel || 3}`" class="arch-card__title">
            {{ section.heading }}
          </component>

          <div class="arch-card__body">
            <p v-for="(para, i) in prose(section)" :key="i" v-html="para" />
          </div>

          <div v-if="section.scores" class="gauges">
            <div v-for="score in section.scores" :key="score.label" class="gauges__item">
              <div class="gauge" :class="`gauge--${scoreBand(score.value)}`">
                <svg viewBox="0 0 80 80" aria-hidden="true">
                  <circle class="gauge__track" cx="40" cy="40" r="34" />
                  <circle
                    class="gauge__fill"
                    cx="40" cy="40" r="34"
                    :stroke-dasharray="circ"
                    :stroke-dashoffset="circ * (1 - score.value / 100)"
                    transform="rotate(-90 40 40)"
                  />
                </svg>
                <span class="gauge__value">{{ score.value }}</span>
              </div>
              <span class="gauges__label">{{ score.label }}</span>
            </div>
          </div>

          <ul v-if="section.optimizations?.length" class="arch-list">
            <li v-for="(opt, j) in section.optimizations" :key="j" v-html="strip(opt)" />
          </ul>

          <ul v-if="bullets(section).length" class="arch-list">
            <li v-for="(item, i) in bullets(section)" :key="i" v-html="item" />
          </ul>
        </article>
      </div>
    </section>
  </div>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const store = useContentStore();
const { content } = storeToRefs(store);

const archContent = computed(() => {
  if (!content.value) return null;
  return content.value.architecture ?? null;
});

const introSection = computed(() => {
  const first = archContent.value?.[0];
  return first?.headingLevel === 2 ? first : null;
});

const contentSections = computed(() => {
  const sections = archContent.value || [];
  return introSection.value ? sections.slice(1) : sections;
});

const strip = (s) => s.trim().replace(/^•\s*/, '');
const prose = (section) => (section?.content || []).filter(p => !p.trim().startsWith('•'));
const bullets = (section) => (section?.content || []).filter(p => p.trim().startsWith('•')).map(strip);

const scoreBand = (value) => {
  if (value >= 90) return 'pass';
  if (value >= 50) return 'average';
  return 'fail';
};

const circ = 2 * Math.PI * 34;
</script>

<style lang="scss" scoped>
.arch-page {
  width: 100%;
}

// ─── Section wrappers ─────���──────────────────────────────────────────────────

.arch-section {
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-border);

  @include respond-below(md) {
    padding: 1.5rem 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &--alt {
    background-color: var(--color-bg-secondary);
  }
}

.arch-inner {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $container-padding-x;

  :deep(article) {
    margin-top: 0;
    margin-bottom: 0;
  }
}

// ─── Intro section ──────────────────────────────────────────────────────────

.arch-intro {
  h2 {
    margin-bottom: 1.25rem;
  }
}

.arch-intro__body {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0 0 1rem;

  &:last-child {
    margin-bottom: 0;
  }
}

// ─── Card ───────────────────────���──────────────────────────────────────────

.arch-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__title {
    color: var(--color-accent-line);
    margin: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-size: 0.95rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }
}

// ─── Bulleted lists ─────────────────────────────────────────────────────────

.arch-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li {
    position: relative;
    margin: 0;
    padding: 0 0 0 1.5rem;
    font-size: 0.9rem;
    line-height: 1.75;
    color: var(--color-text-secondary);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.5em;
      width: 12px;
      height: 12px;
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpolyline points='3 8 6.5 11.5 13 5' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpolyline points='3 8 6.5 11.5 13 5' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      mask-size: contain;
      -webkit-mask-size: contain;
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      background-color: var(--color-accent-line);
      opacity: 0.5;
    }

    :deep(strong) {
      color: var(--color-text-primary);
      font-weight: 600;
    }
  }
}

// ─── Lighthouse gauges ──────���────────────────────────��──────────────────────

.gauges {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: nowrap;
  max-width: 400px;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  &__label {
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-secondary);
    text-align: center;
  }
}

.gauge {
  --gauge-color: var(--color-accent-line);
  position: relative;
  width: 68px;
  height: 68px;
  @include flex-center;

  // Lighthouse score bands: pass 90-100, average 50-89, fail 0-49.
  &--pass    { --gauge-color: #0cce6b; }
  &--average { --gauge-color: #ffa400; }
  &--fail    { --gauge-color: #ff4e42; }

  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--gauge-color) 30%, transparent));
  }

  &__track {
    fill: none;
    stroke: var(--color-border);
    stroke-width: 4;
    opacity: 0.3;
  }

  &__fill {
    fill: none;
    stroke: var(--gauge-color);
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.8s ease, stroke 0.3s ease;
  }

  &__value {
    position: absolute;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--gauge-color);
    line-height: 1;
  }
}

// ─── Links ─────────────────────────────────────────��────────────────────────

:deep(a) {
  color: var(--color-link);
  text-decoration: none;
  @include transition(color);

  &:hover {
    color: var(--color-link-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
}
</style>
