<template>
  <div v-if="musicContent" class="music-page">
    <!-- Article sections (intro, hybrid rig, explore) -->
    <section
      v-for="(group, gIdx) in sectionGroups"
      :key="gIdx"
      class="music-section"
      :class="{ 'music-section--alt': gIdx % 2 !== 0 }"
    >
      <div class="music-inner">
        <template v-for="{ entry, idx } in group.entries" :key="idx">
          <!-- Section heading (h2 with no content, no roles) -->
          <h2
            v-if="entry.headingLevel === 2 && (!entry.content || entry.content.length === 0) && !entry.roles"
            class="section-heading"
            v-html="entry.heading"
          />
          <!-- Regular article (no roles) -->
          <template v-else-if="!entry.roles">
            <Article :article="entry" :index="idx" />
            <div v-if="entry.cta" class="music-cta-wrap">
              <a
                :href="entry.cta.url"
                :target="entry.cta.external ? '_blank' : null"
                :rel="entry.cta.external ? 'noopener noreferrer' : null"
                class="music-cta-btn"
              >
                {{ entry.cta.label }} →
              </a>
            </div>
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

// ─── Section headings ────────────────────────────────────────────────────────

.section-heading {
  margin-bottom: $spacing-md;
}

// ─── CTA button ──────────────────────────────────────────────────────────────

.music-cta-wrap {
  margin-top: $spacing-md;
  margin-bottom: $spacing-lg;
}

.music-cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.75rem;

  @include respond-below(sm) {
    width: 100%;
    justify-content: center;
  }
  border-radius: 9999px;
  font-size: 0.95rem;
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
