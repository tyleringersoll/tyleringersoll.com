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
        <div class="employer__timeline">
          <div
            v-for="(role, roleIdx) in entry.roles"
            :key="roleIdx"
            class="role"
            :class="{ 'role--expanded': isExpanded(entryIdx, roleIdx) }"
          >
            <div
              class="role__trigger"
              role="button"
              tabindex="0"
              :aria-expanded="isExpanded(entryIdx, roleIdx)"
              @click="toggleRole(entryIdx, roleIdx)"
              @keydown.enter.prevent="toggleRole(entryIdx, roleIdx)"
              @keydown.space.prevent="toggleRole(entryIdx, roleIdx)"
            >
              <div class="role__left">
                <span class="role__dates-col">{{ roleDates(role.subheading) }}</span>
              </div>
              <div class="role__axis" aria-hidden="true">
                <span class="role__node">
                  <span class="role__icon">
                    <span class="role__icon-bar role__icon-bar--h" />
                    <span class="role__icon-bar role__icon-bar--v" />
                  </span>
                </span>
              </div>
              <component
                :is="`h${(entry.headingLevel || 3) + 1}`"
                class="role__subheading"
              >{{ roleTitle(role.subheading) }}</component>
            </div>
            <div
              class="role__content-wrapper"
              :aria-hidden="!isExpanded(entryIdx, roleIdx)"
              :inert="!isExpanded(entryIdx, roleIdx)"
            >
              <div class="role__content">
                <template v-for="(para, paraIdx) in role.content" :key="paraIdx">
                  <hr v-if="para.trim().startsWith('<strong>Tech:')" class="tech-divider" />
                  <p
                    :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
                    v-html="formatPara(para)"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
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

const formatPara = (para) => {
  const trimmed = para.trim();
  if (trimmed.startsWith('•')) {
    return trimmed.replace(/^•\s*/, '');
  }
  return para;
};

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
  &__name {
    margin-bottom: $spacing-md;
  }

  &__timeline {
    --col-date: 8rem;
    --col-axis: 1.5rem;
    --col-gap: 1.25rem;
    position: relative;

    @include respond-below(xs) {
      --col-date: 6rem;
      --col-axis: 1.5rem;
      --col-gap: 1rem;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(var(--col-date) + var(--col-gap) + var(--col-axis) / 2);
      width: 1px;
      background: var(--color-border);
      opacity: 0.45;
      pointer-events: none;
    }
  }
}

.role {
  display: grid;
  grid-template-columns: var(--col-date) var(--col-axis) 1fr;
  column-gap: var(--col-gap);
  padding: 0.75rem 0;

  &__trigger {
    grid-column: 1 / -1;
    grid-row: 1;
    display: grid;
    grid-template-columns: var(--col-date) var(--col-axis) 1fr;
    column-gap: var(--col-gap);
    align-items: center;
    cursor: pointer;
    user-select: none;
    @include focus-visible;
  }

  &__left {
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__dates-col {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--color-text-muted);
    white-space: nowrap;
    line-height: 1.4;
    @include transition(color);

    @include respond-below(xs) {
      font-size: 0.7rem;
      letter-spacing: 0.1em;
    }
  }

  &__axis {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  &__node {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    background: var(--color-bg-nav);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
  }

  &__subheading {
    grid-column: 3;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.4;
    @include transition(color);
  }

  &__icon {
    position: relative;
    display: inline-block;
    width: 0.55rem;
    height: 0.55rem;
  }

  &__icon-bar {
    position: absolute;
    background: currentColor;
    border-radius: 1px;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &--h {
      top: 50%;
      left: 0;
      right: 0;
      height: 1.5px;
      transform: translateY(-50%);
    }

    &--v {
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1.5px;
      transform: translateX(-50%);
    }
  }

  &__trigger:hover {
    .role__subheading {
      color: var(--color-accent-line);
    }

    .role__node {
      border-color: var(--color-accent-line);
      color: var(--color-accent-line);
    }
  }

  &--expanded {
    .role__subheading {
      color: var(--color-accent-line);
    }

    .role__node {
      border-color: var(--color-accent-line);
      color: var(--color-accent-line);
    }

    .role__icon-bar--v {
      transform: translateX(-50%) rotate(90deg);
      opacity: 0;
    }

    .role__dates-col {
      color: var(--color-text-secondary);
    }
  }

  &__content-wrapper {
    grid-column: 3;
    grid-row: 2;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    visibility: hidden;
    transition:
      max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease,
      visibility 0s linear 0.45s;
  }

  &--expanded &__content-wrapper {
    max-height: 200rem;
    opacity: 1;
    visibility: visible;
    transition:
      max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s ease 0.1s,
      visibility 0s linear 0s;
  }

  &__content {
    padding: $spacing-sm 0 $spacing-md;

    p {
      margin: 0 0 $spacing-sm;
      line-height: 1.75;
    }

    p:last-child {
      margin-bottom: 0;
    }

    strong {
      color: var(--color-text-primary);
    }
  }
}

.tech-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  opacity: 0.4;
  margin: $spacing-md 0 $spacing-sm;
}

.article__bullet-item {
  position: relative;
  padding-left: 1.25rem;
  text-indent: 0;

  &::before {
    content: "";
    position: absolute;
    left: 0.25rem;
    top: 0.7em;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color-accent-line);
  }
}
</style>
