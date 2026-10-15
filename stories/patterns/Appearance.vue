<script setup>
import ThemeDrawer from "../../components/ThemeDrawer.vue";
import CommandPalette from "../../components/CommandPalette.vue";
import { useUiStore } from "../../stores/ui";
import { useThemeStore } from "../../stores/theme";
defineProps({
  drawer: { type: Boolean, default: true },
  palette: { type: Boolean, default: true },
});
const ui = useUiStore();
const theme = useThemeStore();
</script>
<template>
  <main class="specimen" style="min-height: 600px">
    <p class="eyebrow">Interaction / Appearance</p>
    <h1>Make it feel like you.</h1>
    <p class="lede">
      Choose a theme with the drawer, or search by name with the command
      palette. Both use the same store.
    </p>
    <div class="specimen-card">
      <h2>{{ theme.activeTheme.label }}</h2>
      <p>{{ theme.mode }} mode · Preview preferences stay in this workshop.</p>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 24px">
      <button v-if="drawer" class="workshop-button" @click="ui.openDrawer()">
        Open appearance drawer</button
      ><button v-if="palette" class="workshop-button" @click="ui.openPalette()">
        Search available themes
      </button>
    </div>
    <p v-if="palette">
      The palette also opens with ⌘K / Ctrl+K when this preview has focus.
    </p>
    <ThemeDrawer v-if="drawer" /><CommandPalette v-if="palette" />
  </main>
</template>
