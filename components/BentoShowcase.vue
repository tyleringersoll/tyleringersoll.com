<template>
  <section id="about-site" class="bento-section">
    <div class="bento-container">
      <h2 class="bento-heading">About This Site</h2>

      <div class="bento-wrapper">

        <!-- Row 1: Performance (7) + Built With (5) -->
        <article v-if="perf" :id="perf.id" class="bento-card card-performance">
          <h3 class="bento-card__title">{{ perf.heading }}</h3>
          <div class="bento-card__body">
            <p v-for="(para, i) in prose(perf)" :key="i" v-html="para" />
          </div>
          <div v-if="perf.scores" class="gauges">
            <div v-for="score in perf.scores" :key="score.label" class="gauges__item">
              <div class="gauge">
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
          <ul v-if="perf.optimizations?.length" class="bento-list">
            <li v-for="(opt, j) in perf.optimizations" :key="j" v-html="strip(opt)" />
          </ul>
        </article>

        <article v-if="builtWith" :id="builtWith.id" class="bento-card card-built-with">
          <h3 class="bento-card__title">{{ builtWith.heading }}</h3>
          <div class="bento-card__body">
            <p v-for="(para, i) in prose(builtWith)" :key="i" v-html="para" />
          </div>
          <ul v-if="bullets(builtWith).length" class="bento-list">
            <li v-for="(item, i) in bullets(builtWith)" :key="i" v-html="item" />
          </ul>
        </article>

        <!-- Row 2: Accessibility (5) + Architecture (7) -->
        <article v-if="a11y" :id="a11y.id" class="bento-card card-accessibility">
          <h3 class="bento-card__title">{{ a11y.heading }}</h3>
          <div class="bento-card__body">
            <p v-for="(para, i) in prose(a11y)" :key="i" v-html="para" />
          </div>
          <ul v-if="bullets(a11y).length" class="bento-list">
            <li v-for="(item, i) in bullets(a11y)" :key="i" v-html="item" />
          </ul>
        </article>

        <article v-if="arch" :id="arch.id" class="bento-card card-case-study">
          <h3 class="bento-card__title">{{ arch.heading }}</h3>
          <div class="bento-card__body">
            <p v-for="(para, i) in arch.content" :key="i" v-html="para" />
          </div>
        </article>

      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  sections: { type: Array, default: () => [] }
});

const find = (id) => props.sections.find(s => s.id === id);
const builtWith = computed(() => find('built-with'));
const perf      = computed(() => find('performance'));
const a11y      = computed(() => find('accessibility'));
const arch      = computed(() => find('case-study'));

const strip = (s) => s.trim().replace(/^•\s*/, '');
const prose = (section) => (section?.content || []).filter(p => !p.trim().startsWith('•'));
const bullets = (section) => (section?.content || []).filter(p => p.trim().startsWith('•')).map(strip);

const circ = 2 * Math.PI * 34;
</script>

<style lang="scss" scoped>

// ─── Section wrapper ────────────────────────────────────────────────────────

.bento-section {
  padding: 6rem 0 5rem;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 6rem;

  @include respond-below(sm) {
    padding: 4rem 0 3rem;
  }
}

.bento-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 $container-padding-x;
}

.bento-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-accent-line);
  margin-bottom: 3rem;

  @include respond-below(sm) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
}

// ─── 12-column asymmetric grid ──────────────────────────────────────────────

.bento-wrapper {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

// ─── Card placements ────────────────────────────────────────────────────────

.card-performance  { grid-column: span 7; }
.card-built-with   { grid-column: span 5; }
.card-accessibility { grid-column: span 5; }
.card-case-study   { grid-column: span 7; }

@include respond-below(sm) {
  .card-performance,
  .card-built-with,
  .card-accessibility,
  .card-case-study {
    grid-column: span 12;
  }
}

// ─── Base card ──────────────────────────────────────────────────────────────

.bento-card {
  // Override global article margins from _typography.scss
  margin: 0;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  @include transition(all);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent-line);
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-accent-line);
    // Override global h3 margin
    margin: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      font-size: 0.88rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      margin: 0;
    }
  }
}

// ─── Bulleted lists ─────────────────────────────────────────────────────────

.bento-list {
  // Override global ul styles from _typography.scss
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li {
    position: relative;
    // Override global li styles from _typography.scss
    margin: 0;
    padding: 0 0 0 1.5rem;
    font-size: 0.84rem;
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

// ─── Lighthouse gauges ──────────────────────────────────────────────────────

.gauges {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

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
  }
}

.gauge {
  position: relative;
  width: 68px;
  height: 68px;
  @include flex-center;

  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent-line) 30%, transparent));
  }

  &__track {
    fill: none;
    stroke: var(--color-border);
    stroke-width: 4;
    opacity: 0.3;
  }

  &__fill {
    fill: none;
    stroke: var(--color-accent-line);
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.8s ease;
  }

  &__value {
    position: absolute;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1;
  }
}

// ─── Links ──────────────────────────────────────────────────────────────────

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
