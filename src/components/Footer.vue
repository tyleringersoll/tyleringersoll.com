<template>
  <footer v-if="content" class="footer">
    <section class="container">
      <h2 v-html="content.socialHeading" />
      <div class="footer__social">
        <SocialIcons
          v-for="(link, index) in content.socialIcons"
          :key="index"
          :svg="link.svg"
          :alt="link.alt"
          :title="link.title ? link.title : null"
          :url="link.url"
        />
      </div>
    </section>
    <section class="container footer__legal">
      <p
        class="footer__legal-text"
        v-for="(para, index) in processedLegal"
        :key="index"
        v-html="para"
      />
    </section>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import SocialIcons from "./SocialIcons.vue";

const props = defineProps({
  content: {
    type: Object,
    default: () => ({}),
  },
});

const currentYear = computed(() => {
  return new Date().getFullYear();
});

const processedLegal = computed(() => {
  if (!props.content.legal || !Array.isArray(props.content.legal)) {
    return [];
  }
  return props.content.legal.map((text) => {
    return text.replace(/{YEAR}/g, currentYear.value.toString());
  });
});
</script>

<style lang="scss" scoped>
.footer {
  margin: auto 0 0;
  padding: $spacing-lg 0;
  background-color: var(--color-bg-secondary);

  &__social {
    margin: $spacing-sm 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-sm;

    @include respond-below(sm) {
      justify-content: space-between;
      gap: $spacing-xs;
    }
  }

  &__legal {
    margin-top: $spacing-lg;
  }

  &__legal-text {
    margin: 0;
    font-size: 0.8rem;
  }
}
</style>
