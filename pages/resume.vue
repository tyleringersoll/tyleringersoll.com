<template>
  <section v-if="resumeContent" class="resume container">
    <template v-for="(entry, entryIdx) in resumeContent" :key="entryIdx">
      <!-- First entry: flex header with download button + intro paragraph -->
      <article v-if="!entry.roles && entryIdx === 0" class="article resume-intro">
        <div class="resume-header">
          <h2 class="first-heading" v-html="entry.heading" />
          <a
            href="/Tyler_Ingersoll_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="resume-download"
          >
            <svg class="resume-download__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>
        <p
          v-for="(para, paraIdx) in entry.content"
          :key="paraIdx"
          v-html="para"
        />
      </article>
      <Article v-else-if="!entry.roles" :article="entry" :index="entryIdx" />
      <article v-else class="article employer">
        <component
          :is="`h${entry.headingLevel || 3}`"
          class="employer__name"
          :id="slugify(entry.heading)"
          :class="{ 'first-heading': entryIdx === 0 }"
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
            :expanded="isExpanded(entryIdx, roleIdx)"
            @toggle="toggleRole(entryIdx, roleIdx)"
          >
            <template v-for="(para, paraIdx) in role.content" :key="paraIdx">
              <hr v-if="para.trim().startsWith('<strong>Tech:')" class="tech-divider" />
              <p
                :class="{ 'article__bullet-item': para.trim().startsWith('•') }"
                v-html="formatPara(para)"
              />
            </template>
          </TimelineItem>
        </Timeline>
      </article>
    </template>
  </section>
  <section v-else class="container">
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
  </section>
</template>

<script setup>
import { useContentStore } from "~/stores/content";

const { scrollToHash } = useScrollToHash();
const store = useContentStore();
const { content, isLoading } = storeToRefs(store);
const route = useRoute();

const resumeContent = computed(() => {
  if (isLoading.value || !content.value) return null;
  return content.value.resume ?? null;
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
  const entries = resumeContent.value || [];
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
watch(resumeContent, () => handleHash(route.hash));
</script>

<style lang="scss" scoped>
.resume {
  max-width: 900px;
}

// ─── Header row with download button ──────────────────────────────────────────

.resume-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;
  flex-wrap: wrap;

  h2 {
    margin-bottom: 0;
  }
}

.resume-download {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border: 2px solid var(--color-accent-line);
  border-radius: 9999px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-accent-line);
  text-decoration: none;
  white-space: nowrap;
  @include transition(all);

  &:hover {
    background-color: var(--color-accent-line);
    color: #0d1014;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 3px;
  }

  &__icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
}

.resume-intro p {
  line-height: 1.75;
  color: var(--color-text-secondary);
}

// ─── Employer ────────────────────────────────────────────────────────────────

.employer {
  &__name {
    margin-bottom: $spacing-md;
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
