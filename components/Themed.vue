<template>
  <component :is="resolved" v-if="resolved" :key="activeThemeId" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";
import { resolveThemedComponent } from "~/themes/registry";

// Renders the active theme's component for `name`, forwarding all attrs/slots, and
// falls back to the default theme when the active theme doesn't override it.
// Components resolve synchronously (see themes/registry.ts), so a theme change is an
// instant swap. Keyed by theme so the swap fully remounts rather than trying to
// patch between two unrelated component trees.
defineOptions({ inheritAttrs: false });

const props = defineProps({
  name: { type: String, required: true },
});

const store = useThemeStore();
const activeThemeId = computed(() => store.activeThemeId);
const resolved = computed(() => resolveThemedComponent(store.activeThemeId, props.name));
</script>
