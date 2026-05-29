<template>
  <section v-if="section" id="about-site" class="showcase-section">
    <div class="showcase-inner">
      <div class="showcase-two-col">

        <div class="showcase-left">
          <h2>{{ section.heading }}</h2>
          <p v-for="(para, i) in section.content" :key="i" v-html="para" />
          <div v-if="section.cta" class="showcase-btn-wrap">
            <NuxtLink :to="section.cta.url" class="showcase-btn">
              {{ section.cta.label }} →
            </NuxtLink>
          </div>
        </div>

        <div class="showcase-right">
          <div v-if="section.scores" class="scores-card">
            <p class="scores-label">Lighthouse Scores</p>
            <p class="scores-intro">By leaning into Nuxt's SSR and keeping the JavaScript payload minimal, the site consistently hits top-tier performance metrics.</p>
            <div class="gauges">
              <div v-for="score in section.scores" :key="score.label" class="gauges__item">
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
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  sections: { type: Array, default: () => [] }
});

const section = computed(() => props.sections[0] || null);

const circ = 2 * Math.PI * 34;
</script>

<style lang="scss" scoped>

// ─── Section wrapper ────────────────────────────────────────────────────────

.showcase-section {
  padding: 5rem 0;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 6rem;

  @include respond-below(md) {
    padding: 3rem 0;
  }
}

.showcase-inner {
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $container-padding-x;
}

// ─── Two-column grid ────────────────────────────────────────────────────────

.showcase-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @include respond-below(md) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

// ─── Left column ────────────────────────────────────────────────────────────

.showcase-left {
  h2 {
    margin-bottom: 1.25rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-secondary);
    margin: 0 0 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.showcase-btn-wrap {
  margin-top: 2rem;

  @include respond-below(sm) {
    .showcase-btn {
      width: 100%;
    }
  }
}

.showcase-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.75rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  background-color: var(--color-link);
  color: var(--color-btn-primary-text);
  border: 2px solid var(--color-link);
  @include transition(all);

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

// ─── Right column ────────────────────────────────────────────────────────────

.showcase-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @include respond-to(md) {
    padding-top: 4rem;
  }
}

// ─── Scores card ────────────────────────────────────────────────────────────

.scores-card {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent-line);
  border-radius: 8px;
  padding: 1.5rem 1.25rem 1.25rem 1.1rem;
}

.scores-label {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-line);
}

.scores-intro {
  margin: 0 0 1.25rem;
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

// ─── Gauges ─────────────────────────────────────────────────────────────────

.gauges {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem 0.5rem;

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
</style>
