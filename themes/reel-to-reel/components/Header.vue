<template>
  <header v-if="content" class="ed-frame masthead">
    <NuxtLink to="/" class="name"><span v-html="content.name" /></NuxtLink>

    <!-- Desktop: inline nav -->
    <div class="masthead__right">
      <nav class="masthead__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="item in navigation"
          :key="item.url"
          :to="item.url"
          class="masthead__link"
        >{{ item.name }}</NuxtLink>
      </nav>
    </div>

    <!-- Mobile: hamburger + slide-out panel -->
    <MobileNav class="masthead__mobile" :content="navigation" />
  </header>
</template>

<script setup>
// Editorial masthead. Same prop contract as the default Header so the shared
// layout can swap it via <Themed name="Header">. Theme switching lives in the
// global Customize drawer (FAB) + ⌘K palette, not the nav.
defineProps({
  content: { type: Object, default: () => ({}) },
  navigation: { type: Array, default: () => [] },
});
</script>
