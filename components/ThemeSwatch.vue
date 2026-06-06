<template>
  <span class="theme-swatch" aria-hidden="true">
    <span :style="{ background: swatch.background }" />
    <span :style="{ background: swatch.primary }" />
    <span :style="{ background: swatch.secondary }" />
  </span>
</template>

<script setup>
defineProps({
  swatch: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.theme-swatch {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: var(--theme-swatch-width, 3rem);
  height: var(--theme-swatch-height, 1.6rem);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;

  span {
    display: block;
    height: 100%;
  }
}
</style>
