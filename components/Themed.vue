<template>
  <component :is="resolved" v-if="resolved" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup>
import { useThemeStore } from "~/stores/theme";
import { resolveThemedComponent } from "~/themes/registry";

// Renders the active theme's component for `name`, forwarding all attrs/slots.
// Falls back to the default theme when the active theme doesn't override it.
defineOptions({ inheritAttrs: false });

const props = defineProps({
  name: { type: String, required: true },
});

const store = useThemeStore();
const resolved = computed(() => resolveThemedComponent(store.activeThemeId, props.name));
</script>
