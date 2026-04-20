<template>
  <div v-if="musicContent" class="music-page">
    <!-- Article sections (intro, hybrid rig, explore) -->
    <section
      v-for="(group, gIdx) in sectionGroups"
      :key="gIdx"
      class="music-section"
      :class="{ 'music-section--alt': gIdx % 2 !== 0 }"
    >
      <div class="music-inner" :class="{ 'music-inner--two-col': isTwoColGroup(group) }">
        <template v-for="{ entry, idx } in group.entries" :key="idx">
          <!-- Section heading (h2 with no content, no roles) -->
          <h2
            v-if="entry.headingLevel === 2 && (!entry.content || entry.content.length === 0) && !entry.roles"
            class="section-heading"
            v-html="entry.heading"
          />
          <!-- Credits list -->
          <ul v-else-if="entry.credits" class="credits-list">
            <li v-for="credit in entry.credits" :key="credit.title" class="credits-list__item">
              <span class="credits-list__title">{{ credit.title }}</span>
              <span class="credits-list__detail">{{ credit.detail }}</span>
            </li>
          </ul>
          <!-- Regular article (no roles) -->
          <template v-else-if="!entry.roles">
            <template v-if="entry.cta && isTwoColGroup(group)">
              <a
                :href="entry.cta.url"
                :target="entry.cta.external ? '_blank' : null"
                :rel="entry.cta.external ? 'noopener noreferrer' : null"
                class="music-studio-callout"
              >
                <p class="music-studio-callout__label">{{ entry.heading }}</p>
                <p v-for="(para, i) in entry.content" :key="i" v-html="para" />
                <span class="music-studio-callout__cta">{{ entry.cta.label }} →</span>
              </a>
            </template>
            <template v-else-if="entry.cta">
              <div class="music-cta-card">
                <Article :article="entry" :index="idx" />
                <div class="music-cta-wrap">
                  <a
                    :href="entry.cta.url"
                    :target="entry.cta.external ? '_blank' : null"
                    :rel="entry.cta.external ? 'noopener noreferrer' : null"
                    class="music-cta-btn"
                  >
                    {{ entry.cta.label }} →
                  </a>
                </div>
              </div>
            </template>
            <template v-else>
              <Article :article="entry" :index="idx" />
            </template>
          </template>
          <!-- Timeline entry with roles -->
          <article v-else class="article employer">
            <h3
              class="employer__name"
              :id="slugify(entry.heading)"
              v-html="entry.heading"
            />
            <Timeline>
              <TimelineItem
                v-for="(role, roleIdx) in entry.roles"
                :key="roleIdx"
                :dates="roleDates(role.subheading)"
                :title="roleTitle(role.subheading)"
                :title-tag="`h${(entry.headingLevel || 3) + 1}`"
                :expandable="true"
                :expanded="isExpanded(idx, roleIdx)"
                @toggle="toggleRole(idx, roleIdx)"
              >
                <template v-for="(para, paraIdx) in role.content" :key="paraIdx">
                  <p
                    :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
                    v-html="formatPara(para)"
                  />
                </template>
              </TimelineItem>
            </Timeline>
          </article>
        </template>
      </div>
    </section>
  </div>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const { scrollToHash } = useScrollToHash();
const store = useContentStore();
const { content } = storeToRefs(store);
const route = useRoute();

const musicContent = computed(() => {
  if (!content.value) return null;
  return content.value.music ?? null;
});

const sectionGroups = computed(() => {
  const entries = musicContent.value || [];
  const groups = [];
  let current = null;

  entries.forEach((entry, idx) => {
    if (entry.headingLevel === 2) {
      current = { entries: [] };
      groups.push(current);
    }
    if (current) {
      current.entries.push({ entry, idx });
    }
  });

  return groups;
});

const isTwoColGroup = (group) => {
  const entries = group.entries.map(e => e.entry);
  return entries.some(e => e.cta) && entries.some(e => !e.cta && !e.roles && e.content?.length);
};

const expandedRoles = ref(new Set());

const roleTitle = (subheading) => subheading.split(' · ')[0];
const roleDates = (subheading) => subheading.split(' · ')[1] ?? '';

const slugify = (str) =>
  String(str ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

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

const expandRolesForHash = (hash) => {
  if (!hash) return;
  const slug = hash.replace(/^#/, '');
  const entries = musicContent.value || [];
  const set = new Set(expandedRoles.value);
  entries.forEach((entry, entryIdx) => {
    if (entry.roles && slugify(entry.heading) === slug) {
      entry.roles.forEach((_, roleIdx) => set.add(`${entryIdx}-${roleIdx}`));
    }
  });
  expandedRoles.value = set;
};

const handleHash = (hash) => {
  expandRolesForHash(hash);
  scrollToHash(hash);
};

onMounted(() => handleHash(route.hash));
watch(() => route.hash, handleHash);
watch(musicContent, () => handleHash(route.hash));
</script>

<style lang="scss" scoped>
.music-page {
  width: 100%;
}

// ─── Section wrappers ────────────────────────────────────────────────────────

.music-section {
  --section-bg: var(--color-bg-primary);
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-border);

  @include respond-below(md) {
    padding: 1.5rem 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &--alt {
    --section-bg: var(--color-bg-secondary);
    background-color: var(--color-bg-secondary);
  }
}

.music-inner {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 $container-padding-x;

  :deep(article) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :deep(h3) {
    margin-top: $spacing-xl;
    margin-bottom: $spacing-md;
  }
}

// ─── Two-column layout ────────────────────────────────────────────────────────

.music-inner--two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @include respond-below(md) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

// ─── Studio sidebar callout ───────────────────────────────────────────────────

.music-studio-callout {
  display: block;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-link);
  border-radius: 8px;
  padding: 1.25rem 1.25rem 1.25rem 1.1rem;
  text-decoration: none;
  color: inherit;
  @include transition(all);

  @include respond-to(md) {
    margin-top: 4.1rem;
  }

  p {
    margin: 0 0 0.4rem;
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--color-text-secondary);

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 0.6rem !important;
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-accent-line) !important;
  }

  &__cta {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--color-link);
    @include transition(color);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-link-hover);
    border-left-color: var(--color-link-hover);

    .music-studio-callout__cta {
      color: var(--color-link-hover);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }
}

// ─── Section headings ────────────────────────────────────────────────────────

.section-heading {
  margin-bottom: $spacing-md;
}

// ─── CTA section ─────────────────────────────────────────────────────────────

.music-cta-card {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-link);
  border-radius: 12px;
  padding: $spacing-lg;
  margin-top: $spacing-md;

  :deep(h3) {
    margin-top: 0;
    margin-bottom: $spacing-sm;
  }
}

// ─── CTA button ──────────────────────────────────────────────────────────────

.music-cta-wrap {
  margin-top: $spacing-md;
  margin-bottom: 0;
}

.music-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;

  @include respond-below(sm) {
    width: 100%;
    justify-content: center;
  }
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  background-color: var(--color-link);
  color: #fff;
  border: 2px solid var(--color-link);
  @include transition(all);

  &:hover {
    background-color: var(--color-link-hover);
    border-color: var(--color-link-hover);
    color: #1a1a1a;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }
}

// ─── Selected Credits list ───────────────────────────────────────────────────

.credits-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;

  &__item {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
    padding: $spacing-sm 0;
    border-bottom: 1px solid var(--color-border);

    &:first-child {
      border-top: 1px solid var(--color-border);
    }
  }

  &__title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  &__detail {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
}

// ─── Employer (timeline entries) ─────────────────────────────────────────────

.employer {
  & + .employer {
    margin-top: $spacing-xl;
  }

  &__name {
    margin-bottom: $spacing-md;
    color: var(--color-text-secondary);
  }
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
