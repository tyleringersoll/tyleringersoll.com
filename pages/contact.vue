<template>
  <section v-if="contactContent" class="contact container">
    <template v-for="(entry, idx) in introContent" :key="idx">
      <Article :article="entry" :index="idx" />
    </template>
    <div class="contact__cards">
      <div
        v-for="(card, idx) in cardContent"
        :key="idx"
        class="contact__card"
      >
        <h3>{{ card.heading }}</h3>
        <p
          v-for="(para, pIdx) in card.content"
          :key="pIdx"
          v-html="para"
          class="contact__card-text"
        />
        <ul class="contact__links">
          <li v-for="(link, lIdx) in card.links" :key="lIdx">
            <a
              :href="link.url"
              :class="['contact__btn', lIdx === 0 ? 'contact__btn--primary' : 'contact__btn--secondary']"
              v-bind="link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
            >{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const store = useContentStore();
const { content } = storeToRefs(store);

const contactContent = computed(() => {
  if (!content.value) return null;
  return content.value.contact ?? null;
});

const introContent = computed(() =>
  contactContent.value?.filter((e) => !e.links) ?? []
);

const cardContent = computed(() =>
  contactContent.value?.filter((e) => e.links) ?? []
);
</script>

<style lang="scss" scoped>
.contact {
  &__cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;
    align-items: stretch;

    @include respond-below(sm) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: $spacing-lg;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    display: flex;
    flex-direction: column;

    h3 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &__card-text {
    color: var(--color-text-secondary);
  }

  &__links {
    list-style: none;
    margin: auto 0 0;
    padding: $spacing-sm 0 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__btn {
    display: block;
    width: 100%;
    padding: 0.7rem 1.75rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 3px;
    }

    &--primary {
      background-color: var(--color-link);
      color: var(--color-btn-primary-text);
      border: 2px solid var(--color-link);

      &:hover {
        background-color: var(--color-link-hover);
        border-color: var(--color-link-hover);
        color: #1a1a1a;
        transform: translateY(-1px);
      }
    }

    &--secondary {
      background-color: transparent;
      color: var(--color-text-primary);
      border: 2px solid var(--color-border);

      &:hover {
        background-color: var(--color-bg-surface);
        border-color: var(--color-accent-line);
        color: var(--color-accent-line);
        transform: translateY(-1px);
      }
    }
  }
}
</style>
