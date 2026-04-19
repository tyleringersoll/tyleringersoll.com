<template>
  <footer v-if="content" class="footer">
    <section class="footer-connect">
      <div class="footer-inner">
        <h2 class="footer-heading">{{ connect.heading }}</h2>
        <p class="footer-sub">{{ connect.subtext }}</p>

        <div class="footer-social-circles">
          <a
            v-for="link in content.socialIcons"
            :key="link.alt"
            :href="link.url"
            :target="link.url.startsWith('mailto') ? null : '_blank'"
            :rel="link.url.startsWith('mailto') ? null : 'noopener noreferrer'"
            class="footer-social-circle"
            :aria-label="link.title || link.alt"
          >
            <div class="footer-social-circle__disk" v-html="link.svg" />
            <span>{{ link.alt }}</span>
          </a>
        </div>

        <div class="footer-cta-wrap">
          <a href="mailto:tyler@ingersoll.dev" class="footer-btn">{{ connect.cta }}</a>
        </div>
      </div>
    </section>

    <section class="footer-legal">
      <div class="footer-inner">
        <p
          class="footer-legal__text"
          v-for="(para, index) in processedLegal"
          :key="index"
          v-html="para"
        />
      </div>
    </section>
  </footer>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
});

const store = useContentStore();

const connect = computed(() => store.content?.homePage?.connect || {});

const currentYear = computed(() => new Date().getFullYear());

const processedLegal = computed(() => {
  if (!props.content.legal || !Array.isArray(props.content.legal)) {
    return [];
  }
  return props.content.legal.map((text) =>
    text.replace(/{YEAR}/g, currentYear.value.toString())
  );
});
</script>

<style lang="scss" scoped>
.footer-connect {
  background-color: var(--color-bg-deepest);
  padding: 5rem 0 4rem;

  @include respond-below(md) {
    padding: 3rem 0;
  }
}

.footer-inner {
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $container-padding-x;
}

.footer-heading {
  margin: 0 0 2.5rem;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-primary);
  text-align: center;
}

.footer-sub {
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin: -1.5rem 0 2.5rem;
}

.footer-social-circles {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;

  @include respond-below(xs) {
    gap: 1rem;
  }
}

.footer-social-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  @include transition(all);

  &__disk {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 2px solid var(--color-border);
    background-color: var(--color-bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    @include transition(all);

    :deep(svg),
    :deep(svg path),
    :deep(svg circle),
    :deep(svg polygon) {
      fill: var(--color-text-secondary);
      width: 28px;
      height: 28px;
      max-width: 28px;
      max-height: 28px;
    }
  }

  span {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-muted);
    @include transition(color);
  }

  &:hover .footer-social-circle__disk {
    border-color: var(--color-link-hover);
    background-color: var(--color-bg-surface);

    :deep(svg),
    :deep(svg path),
    :deep(svg circle),
    :deep(svg polygon) {
      fill: var(--color-link-hover);
    }
  }

  &:hover span {
    color: var(--color-text-secondary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 4px;
    border-radius: 4px;
  }
}

.footer-cta-wrap {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  @include respond-below(sm) {
    .footer-btn {
      width: 100%;
    }
  }
}

.footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 2.5rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--color-accent-line);
  color: #0d1014;
  border: 2px solid var(--color-accent-line);
  @include transition(all);

  &:hover {
    background-color: transparent;
    color: var(--color-accent-line);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }
}

.footer-legal {
  background-color: var(--color-bg-deepest);
  padding: 0 0 $spacing-lg;

  &__text {
    margin: 0;
    font-size: 0.8rem;
    text-align: center;
    color: var(--color-text-muted);
  }
}
</style>
