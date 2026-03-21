<template>
  <section v-if="resumeContent" class="resume container">
    <template v-for="(entry, entryIdx) in resumeContent" :key="entryIdx">
      <Article v-if="!entry.roles" :article="entry" :index="entryIdx" />
      <article v-else class="article employer">
        <component
          :is="`h${entry.headingLevel || 3}`"
          class="employer__name"
          :class="{ 'first-heading': entryIdx === 0 }"
          v-html="entry.heading"
        />
        <template v-for="(role, roleIdx) in entry.roles" :key="roleIdx">
          <div
            class="role__left"
            role="button"
            tabindex="0"
            @click="toggleRole(entryIdx, roleIdx)"
            @keydown.enter.prevent="toggleRole(entryIdx, roleIdx)"
            @keydown.space.prevent="toggleRole(entryIdx, roleIdx)"
          >
            <span class="role__caret" :class="{ 'role__caret--open': isExpanded(entryIdx, roleIdx) }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
            <span class="role__dates-col">{{ roleDates(role.subheading) }}</span>
          </div>
          <component
            :is="`h${(entry.headingLevel || 3) + 1}`"
            class="role__subheading"
            role="button"
            tabindex="0"
            @click="toggleRole(entryIdx, roleIdx)"
            @keydown.enter.prevent="toggleRole(entryIdx, roleIdx)"
            @keydown.space.prevent="toggleRole(entryIdx, roleIdx)"
          >{{ roleTitle(role.subheading) }}</component>
          <transition name="role-expand">
            <div v-if="isExpanded(entryIdx, roleIdx)" class="role__content">
              <template v-for="(para, paraIdx) in role.content" :key="paraIdx">
                <hr v-if="para.trim().startsWith('<strong>Tech:')" class="tech-divider" />
                <p
                  :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
                  v-html="para"
                />
              </template>
            </div>
          </transition>
        </template>
      </article>
    </template>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useContentStore } from "@/store";
import Article from "@/components/Article.vue";

const store = useContentStore();
const { content, isLoading } = storeToRefs(store);

const resumeContent = computed(() => {
  if (isLoading.value || !content.value) return null;
  return content.value.resume ?? null;
});

const expandedRoles = ref(new Set());

const roleTitle = (subheading) => subheading.split(' · ')[0];
const roleDates = (subheading) => subheading.split(' · ')[1] ?? '';

const isExpanded = (entryIdx, roleIdx) =>
  expandedRoles.value.has(`${entryIdx}-${roleIdx}`);

const toggleRole = (entryIdx, roleIdx) => {
  const key = `${entryIdx}-${roleIdx}`;
  const set = new Set(expandedRoles.value);
  if (set.has(key)) {
    set.delete(key);
  } else {
    set.add(key);
  }
  expandedRoles.value = set;
};
</script>

<style lang="scss" scoped>
.employer {
  display: grid;
  grid-template-columns: 9rem 1fr;
  column-gap: $spacing-sm;
  align-items: center;

  @include respond-below(xs) {
    display: block;
  }

  &__name {
    grid-column: 1 / -1;
    margin-bottom: $spacing-md;
  }
}

.role {
  &__left {
    display: flex;
    align-items: center;
    gap: 0.4em;
    padding-top: $spacing-sm;
    margin-bottom: $spacing-xs;
    cursor: pointer;
    user-select: none;

    @include respond-below(xs) {
      display: none;
    }
  }

  &__dates-col {
    font-size: 1rem;
    color: var(--color-text-secondary);
    white-space: nowrap;
    line-height: 1.2;
  }

  &__subheading {
    display: block;
    width: fit-content;
    padding-top: $spacing-sm;
    margin: 0 0 $spacing-xs;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    cursor: pointer;
    user-select: none;
    position: relative;
    @include transition(color);

    &::before {
      content: "";
      position: absolute;
      top: calc(#{$spacing-sm} - 8px);
      left: 0;
      right: 0;
      height: 2px;
      background-color: $color-highlight-3;
      transform: scaleX(0);
      transform-origin: 0% 50%;
      @include transition(transform, 250ms, ease-in-out);
    }

    &:hover {
      color: $color-highlight-1;

      &::before {
        transform: scaleX(1);
      }
    }
  }

  &__left:hover + .role__subheading::before,
  &__left:has(.role__caret--open) + .role__subheading::before {
    transform: scaleX(1);
  }

  &__left:has(.role__caret--open) + .role__subheading {
    color: $color-highlight-2;
  }

  &__caret {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--color-text-muted);
    @include transition(transform);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__content {
    grid-column: 1 / -1;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: 1rem;
    padding: $spacing-sm $spacing-lg;
    margin: $spacing-sm 0 $spacing-md;
  }
}

.tech-divider {
  border: none;
  border-top: 1px solid var(--color-text-primary);
  margin: $spacing-md 0 $spacing-sm;
}

.article__bullet-item {
  padding-left: 1rem;
  text-indent: -0.5rem;
}

.role-expand {
  &-enter-active,
  &-leave-active {
    transition: max-height 0.3s ease, opacity 0.2s ease;
    overflow: hidden;
    max-height: 2000px;
  }

  &-enter-from,
  &-leave-to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
