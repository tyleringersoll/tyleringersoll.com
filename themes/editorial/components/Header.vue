<template>
  <header v-if="content" class="ed-frame masthead">
    <NuxtLink to="/" class="name"><span v-html="content.name" /></NuxtLink>

    <!-- Desktop: inline nav + theme controls -->
    <div class="masthead__right">
      <nav class="masthead__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.url"
          :to="item.url"
          class="masthead__link"
        >{{ item.name }}</NuxtLink>
      </nav>
      <div class="masthead__controls">
        <ThemeCycle v-if="store.hasMultipleThemes" />
        <ThemeToggle v-if="store.supportsModes" />
      </div>
    </div>

    <!-- Mobile: hamburger + slide-out panel (panel includes the theme switcher) -->
    <MobileNav class="masthead__mobile" :content="navigation" />
  </header>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";

// Editorial masthead. Same prop contract as the default Header so the shared
// layout can swap it via <Themed name="Header">.
defineProps({
  content: { type: Object, default: () => ({}) },
  navigation: { type: Array, default: () => [] },
});

const store = useThemeStore();
</script>
