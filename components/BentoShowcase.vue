<template>
  <section v-if="section" id="about-site" class="showcase-section">
    <div class="showcase-container">
      <h2 class="showcase-heading">About This Site</h2>

      <div class="showcase-card">
        <div class="showcase-card__body">
          <p v-for="(para, i) in section.content" :key="i" v-html="para" />
        </div>

        <div v-if="section.scores" class="gauges">
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

        <div v-if="section.cta" class="showcase-card__cta">
          <NuxtLink :to="section.cta.url" class="showcase-btn">
            {{ section.cta.label }} →
          </NuxtLink>
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
  padding: 6rem 0 5rem;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 6rem;

  @include respond-below(sm) {
    padding: 4rem 0 3rem;
  }
}

.showcase-container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 $container-padding-x;
}

.showcase-heading {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-accent-line);
  margin-bottom: 3rem;

  @include respond-below(sm) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
}

// ─── Card ──────────────────────────────────────────────────────────────────

.showcase-card {
  margin: 0;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  max-width: 720px;

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

  &__cta {
    padding-top: 0.5rem;
  }
}

.showcase-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-accent-line);
  border: 2px solid var(--color-accent-line);
  @include transition(all);

  &:hover {
    background-color: var(--color-accent-line);
    color: #0d1014;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }
}

// ─── Lighthouse gauges ──────────────────────────────────────────────────────

.gauges {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
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
