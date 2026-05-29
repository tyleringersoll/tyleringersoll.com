<template>
  <div v-if="musicContent" class="music-page">
    <!-- Hero -->
    <section
      v-if="heroEntry"
      class="music-hero"
      :style="{ backgroundImage: `url(${heroBackgroundUrl})` }"
    >
      <div class="music-hero__overlay">
        <div class="music-hero__inner">
          <h2 class="music-hero__heading" v-html="heroEntry.heading" />
          <p
            v-for="(para, i) in heroEntry.content"
            :key="i"
            class="music-hero__text"
            v-html="para"
          />
          <a
            v-if="heroEntry.cta"
            :href="heroEntry.cta.url"
            target="_blank"
            rel="noopener noreferrer"
            class="music-hero__btn"
          >
            {{ heroEntry.cta.label }} ↗
          </a>
        </div>
      </div>
    </section>

    <!-- Content sections -->
    <section
      v-for="(group, gIdx) in contentGroups"
      :key="gIdx"
      class="music-section"
      :class="{ 'music-section--alt': gIdx % 2 === 0 }"
    >
      <div class="music-inner">
        <template v-for="{ entry, idx } in group.entries" :key="idx">
          <!-- Section heading (h2 with no content, no roles) -->
          <h2
            v-if="entry.headingLevel === 2 && (!entry.content || entry.content.length === 0) && !entry.roles && !entry.albums"
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
          <!-- Selected Discography (media-object list) -->
          <template v-else-if="entry.albums">
            <component :is="`h${entry.headingLevel || 3}`" class="archive-heading" v-html="entry.heading" />
            <div class="music-discography-list">
              <article v-for="album in entry.albums" :key="album.title" class="music-album">
                <div class="music-album__cover">
                  <a v-if="album.url" :href="album.url" target="_blank" rel="noopener noreferrer" class="music-album__cover-link">
                    <img :src="album.image" :alt="album.alt" />
                  </a>
                  <img v-else :src="album.image" :alt="album.alt" />
                </div>
                <div class="music-album__info">
                  <h4 class="music-album__title">{{ album.title }}</h4>
                  <p class="music-album__meta">{{ album.format }}, {{ album.year }} · {{ album.label }}</p>
                  <p v-if="album.description" class="music-album__desc">{{ album.description }}</p>
                  <a v-if="album.url" :href="album.url" target="_blank" rel="noopener noreferrer" class="music-album__link">Listen</a>
                </div>
              </article>
            </div>
          </template>
          <!-- Regular article (no roles) -->
          <template v-else-if="!entry.roles">
            <Article :article="entry" :index="idx" />
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
                :dates="roleDates(role.subheading, entry.years)"
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
  return content.value.drums ?? null;
});

const heroEntry = computed(() => {
  const entries = musicContent.value || [];
  return entries.find(e => e.type === 'hero') ?? null;
});

const img = useImage();
const heroBackgroundUrl = computed(() =>
  heroEntry.value?.src
    ? img(heroEntry.value.src, { width: 1600, quality: 75, format: 'webp' })
    : ''
);

const contentGroups = computed(() => {
  const entries = musicContent.value || [];
  const groups = [];
  let current = null;

  entries.forEach((entry, idx) => {
    if (entry.type === 'hero') return;
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

const splitRoleSubheading = (subheading) => String(subheading ?? '').split(' · ');
const isDateSegment = (value) =>
  /^(?:\d{4}|Present)(?:\s*-\s*(?:\d{4}|Present))?(?:,\s*\d{4})*$/i.test(String(value ?? '').trim());

const roleTitle = (subheading) => {
  const parts = splitRoleSubheading(subheading);
  const trailingPart = parts[parts.length - 1];
  return parts.length > 1 && isDateSegment(trailingPart)
    ? parts.slice(0, -1).join(' · ')
    : subheading;
};

const roleDates = (subheading, fallbackYears = '') => {
  if (fallbackYears) return fallbackYears;
  const parts = splitRoleSubheading(subheading);
  const trailingPart = parts[parts.length - 1];
  return parts.length > 1 && isDateSegment(trailingPart) ? trailingPart : '';
};

const slugify = (str) =>
  String(str ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const formatInlineMarkup = (text) =>
  text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const formatPara = (para) => {
  const trimmed = para.trim();
  if (trimmed.startsWith('•')) {
    return formatInlineMarkup(trimmed.replace(/^•\s*/, ''));
  }
  return formatInlineMarkup(para);
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

// ─── Hero section ───────────────────────────────────────────────────────────

.music-hero {
  background-size: cover;
  background-position: center 35%;
  border-bottom: 1px solid var(--color-border);

  &__overlay {
    background-color: rgba(0, 0, 0, 0.7);
    padding: clamp(3rem, 8vw, 6rem) 0;
  }

  &__inner {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 $container-padding-x;
  }

  &__heading {
    margin: 0 0 1rem;
    color: #fff;
  }

  &__text {
    margin: 0 0 1.5rem;
    max-width: 640px;
    font-size: 1.05rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 2rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    background-color: var(--color-link);
    color: #fff;
    border: 2px solid var(--color-link);
    @include transition(all);

    @include respond-below(sm) {
      width: 100%;
      justify-content: center;
    }

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
}

// ─── Section wrappers ────────────────────────────────────────────────────────

.music-section {
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--color-border);

  @include respond-below(md) {
    padding: 1.5rem 0;
  }

  &:last-child {
    border-bottom: none;
  }

  &--alt {
    background-color: var(--color-bg-secondary);
  }
}

.music-inner {
  max-width: 1200px;
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

// ─── Archive section headings ───────────────────────────────────────────────

.archive-heading {
  margin-top: $spacing-lg;
  margin-bottom: $spacing-md;
  color: var(--color-accent-line);
}

// ─── Discography (media-object list) ────────────────────────────────────────

.music-discography-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.music-album {
  display: flex;
  gap: 1.5rem;
  padding: $spacing-lg 0;
  border-bottom: 1px solid var(--color-border);

  &:first-child {
    border-top: 1px solid var(--color-border);
  }

  &:last-child {
    border-bottom: none;
  }

  @include respond-below(sm) {
    flex-direction: column;
    gap: 1rem;
  }

  &__cover {
    flex-shrink: 0;
    width: 160px;

    @include respond-below(sm) {
      width: 120px;
    }

    img {
      display: block;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid var(--color-border);
    }
  }

  &__cover-link {
    display: block;

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
      border-radius: 6px;
    }
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 0.25rem;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  &__meta {
    margin: 0 0 0.6rem;
    font-size: 0.82rem;
    color: var(--color-text-muted);
    letter-spacing: 0.02em;
  }

  &__desc {
    margin: 0 0 0.6rem;
    font-size: 0.9rem;
    line-height: 1.65;
    color: var(--color-text-secondary);
  }

  &__link {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-link);
    text-decoration: none;
    @include transition(color);

    &:hover {
      color: var(--color-link-hover);
    }

    &:focus-visible {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
    }
  }
}

// ─── Section headings ────────────────────────────────────────────────────────

.section-heading {
  margin-bottom: $spacing-md;
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
