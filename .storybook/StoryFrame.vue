<script setup>
import { watch, onUnmounted } from "vue";
import { useThemeStore } from "../stores/theme";
import { useUiStore } from "../stores/ui";

const props = defineProps({ appearance: String, storyId: String });
const theme = useThemeStore();
const ui = useUiStore();
// Keep the real state/actions. Replace only persistence inside the preview app;
// its iframe shares an origin with the portfolio in the deployed build.
theme._persist = () => {};
watch(
  () => [props.appearance, props.storyId],
  () => {
    const [id, mode] = (props.appearance || "signal-flow:dark").split(":");
    theme.applyInitialPreference(id, mode);
    theme._apply();
    ui.$reset();
    document.documentElement.classList.remove(
      "theme-boot-cloaked",
      "theme-fading",
      "theme-transitioning",
    );
  },
  { immediate: true },
);
onUnmounted(() => {
  ui.$reset();
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="workshop-frame"><slot /></div>
</template>
