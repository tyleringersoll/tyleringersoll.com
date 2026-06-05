<template>
  <footer v-if="content" class="ed-frame foot">
    <div class="foot__c">
      <div
        v-for="(line, i) in legal"
        :key="i"
        v-html="line"
      />
    </div>
    <div class="foot__soc">
      <a
        v-for="link in content.socialIcons"
        :key="link.alt"
        :href="link.url"
        :target="link.url.startsWith('mailto') ? null : '_blank'"
        :rel="link.url.startsWith('mailto') ? null : 'noopener noreferrer'"
        :aria-label="link.title || link.alt"
        v-html="link.svg"
      />
    </div>
  </footer>
</template>

<script setup>
// Editorial footer. Same prop contract as the default Footer; reuses the real
// store's socialIcons + legal lines (with {YEAR} substitution).
const props = defineProps({
  content: { type: Object, default: () => ({}) },
});

const currentYear = computed(() => new Date().getFullYear());

const legal = computed(() =>
  (props.content.legal || []).map((text) =>
    text.replace(/{YEAR}/g, currentYear.value.toString())
  )
);
</script>
