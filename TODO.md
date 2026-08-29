# tyleringersoll.com — Refocus Plan & TODO

**Goal:** Make tyleringersoll.com the engineering-career identity site. The homepage keeps its
50/50 engineering/music framing, but the deep music content moves to tyleringersolldrums.com.
Architecture joins the main nav. Fix the SEO bugs found during the audit.

**Audience for this file:** an implementation agent (cheaper model). Each task lists exact files
and acceptance criteria. Copy marked `DRAFT` was written for Tyler to approve — do not invent
alternative copy; use it verbatim or ask.

**Guardrails for the implementing agent:**
- Do NOT add dependencies. This site's 100/100/100/100 Lighthouse score is a showcased feature
  (see the Architecture page); every task must keep Lighthouse CI green (`.lighthouserc.json`).
- Do NOT restyle anything. These are content/routing/meta changes only.
- Both themes (`themes/signal-flow/`, `themes/reel-to-reel/`) render every page — changes to a
  page mean touching both themes' views and both manifests.
- Run `npm run test` after each phase; the suite must stay green. Update or delete specs that
  reference removed things — never skip them.
- Work on a feature branch off `main`; do not push to `main` directly.

---

## Phase 1 — Remove /music, redirect to tyleringersolldrums.com

The music page and its timeline leave this site. `/music` 301s to the drums site so existing
backlinks and bookmarks keep working. The homepage "Music" section STAYS (it already links out).

- [ ] **1.1 Data:** In `data/content.js`:
  - Delete the entire `drums: [ … ]` array (the music page content, lines ~410–621). Do NOT
    touch `home.drums` (the homepage Music section) — that stays.
  - `navigation`: replace `{ name: "Music", url: "/music" }` with
    `{ name: "Architecture", url: "/architecture" }` so nav = Home, Resume, Architecture.
  - `home.drums.cta` / `home.drums.ctaUrl`: currently "View my musical history" → `/music`.
    Change to `cta: "View my music career"` and
    `ctaUrl: "https://tyleringersolldrums.com"` with `ctaExternal: true` — follow however the
    theme Home views render the existing external `home.drums.studio.url` link (target=_blank,
    rel=noopener). Check both themes' `views/Home.vue` render this CTA as external correctly
    (reel-to-reel's Home.vue has a fallback `:to="mus.ctaUrl || '/music'"` — remove the
    `/music` fallback).
- [ ] **1.2 Routes/views:** Delete `pages/music.vue`, `themes/signal-flow/views/Music.vue`,
  `themes/reel-to-reel/views/Music.vue`, and remove the Music view registration from
  `themes/signal-flow/manifest.ts` and `themes/reel-to-reel/manifest.ts`.
- [ ] **1.3 Prerender:** In `nuxt.config.ts` remove `"/music"` from `nitro.prerender.routes`.
- [ ] **1.4 Redirect:** In `netlify.toml`, delete the `/music` → `/music/index.html` 200 rewrite
  and add (above the remaining rewrites):
  ```toml
  [[redirects]]
    from = "/music"
    to = "https://tyleringersolldrums.com"
    status = 301
    force = true

  [[redirects]]
    from = "/music/*"
    to = "https://tyleringersolldrums.com"
    status = 301
    force = true
  ```
- [ ] **1.5 Lighthouse CI:** Remove the `/music/index.html` URL from `.lighthouserc.json`.
- [ ] **1.6 Tests:** Delete `tests/pages/music.spec.js`. Update fixtures in
  `tests/components/Header.spec.js` (nav item Music → Architecture) and
  `tests/pages/index.spec.js` (`ctaUrl: "/music"` → the new external URL). Grep the whole
  `tests/` dir for `music` and fix any other references. Suite must pass with coverage
  thresholds intact.
- [ ] **1.7 Sitemap:** Remove the `/music` entry from `public/sitemap.xml` (domain fix is 2.1).
- [ ] **1.8 Sweep:** `grep -ri "/music" --include="*.vue" --include="*.js" --include="*.ts"` the
  repo (excluding node_modules/.nuxt/.output/.lighthouseci) and resolve every remaining hit.

**Acceptance:** `npm run generate` succeeds with no `/music` output; `npm run test` green;
nav shows Home / Resume / Architecture in both themes; homepage Music section links out to
tyleringersolldrums.com.

## Phase 2 — SEO & identity fixes (bugs found in audit)

The live primary domain is `https://www.tyleringersoll.com` (apex 301s to www — verified
2026-08-29). Canonical tags in `app.vue` already use www; everything else disagrees.

- [ ] **2.1 Wrong domain in sitemap/robots (copy-paste from ingersoll.dev):**
  `public/sitemap.xml` and the `Sitemap:` line in `public/robots.txt` point at
  `https://ingersoll.dev`. Change all URLs to `https://www.tyleringersoll.com` (and drop
  `/music` per 1.7, add nothing else).
- [ ] **2.2 og:url / twitter host mismatch:** In `nuxt.config.ts`, `og:url` and `og:image`
  URLs use the apex domain. Change to `https://www.tyleringersoll.com/…`.
- [ ] **2.3 Per-page titles & descriptions:** Today all four routes share one global
  title/description. Add `useSeoMeta({ title, description, ogTitle, ogDescription })` in a
  `<script setup>` block in each page wrapper (`pages/index.vue`, `pages/resume.vue`,
  `pages/architecture.vue`) — the wrappers are theme-independent, so this is the right layer.
  DRAFT copy (Tyler may edit):
  - Home — title: `Tyler Ingersoll | Frontend Engineering Leader & Drummer`;
    description: `Tyler Ingersoll leads frontend engineering teams building enterprise fintech
    applications, and has spent three decades as a touring and session drummer.`
  - Resume — title: `Resume | Tyler Ingersoll — Frontend Engineering Leader`;
    description: `25+ years across frontend architecture, design systems, and engineering
    leadership: Best Egg, Vanguard, Agilent, and enterprise agency work.`
  - Architecture — title: `How This Site Is Built | Tyler Ingersoll`;
    description: `The architecture of tyleringersoll.com: Nuxt 3 prerendering, a multi-theme
    design system, 100/100/100/100 Lighthouse scores, and a 99%-coverage test suite.`
  Keep the global fallback in `nuxt.config.ts` as-is.
- [ ] **2.4 JSON-LD Person schema:** In `app.vue`, add one `useHead` script block, rendered on
  every route:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tyler Ingersoll",
    "url": "https://www.tyleringersoll.com",
    "jobTitle": "Director of Software Engineering",
    "knowsAbout": ["Frontend Architecture", "Design Systems", "Engineering Leadership", "Web Performance", "Drums"],
    "sameAs": [
      "https://github.com/tyleringersoll",
      "https://www.linkedin.com/in/tyleringersoll",
      "https://tyleringersolldrums.com",
      "https://ingersoll.dev",
      "https://www.strava.com/athletes/3303002"
    ]
  }
  ```
- [ ] **2.5 Positioning nudge (copy only, one edit):** The hero/masthead keeps the dual
  identity, but nothing on the homepage says Tyler leads teams — the engineering blurb is
  pure-IC voice while the resume opens with "Director". In `data/content.js`, change the first
  sentence of `home.engineering.body` from
  `"I build frontend applications with Vue, Angular, and TypeScript."` to DRAFT:
  `"I'm an engineering director who still builds: I lead customer-facing engineering teams and
  ship production code in Vue, Angular, and TypeScript."` Leave the rest of the paragraph
  unchanged. Also in `content.meta.tag`, change `<span>Frontend engineer</span>` to
  `<span>Engineering leader</span>` (OPEN QUESTION #2 — skip if Tyler says no).

**Acceptance:** `curl` each generated page: unique `<title>`, one canonical, og:url on www,
JSON-LD present and valid (paste into https://validator.schema.org). Lighthouse SEO stays ≥95.

## Phase 3 — Port missing music content INTO ../tyleringersolldrums.com

Audit result: the drums site already covers most of the timeline (Wind-up era, producers
Gilmore/Wattenberg/Nicolo/DiDia, Madden/Super Bowl/Fantastic Four placements, SpeakerCity,
Healthy Doses, discography). These items exist ONLY on tyleringersoll.com's music page and
would be lost when Phase 1 deletes it. Port them into the drums repo
(`/Users/tyleringersoll/GitHub/tyleringersolldrums.com` — it has its own CLAUDE.md; follow its
content conventions, likely `data/pages/work.js` / `session.js`):

Posible idea to add to Work page on tyleringersolldrums.com -- add a historical timeline that we have on this site to under the press section. Take the style and look feel from this page, and it would be cool because I can add events as they occur going forward.

- [ ] **3.1 Omnisoul 2024 reunion** (currently only an image-alt on the drums site!). Source
  copy from this repo's `data/content.js` (`drums` array, "Omnisoul Reunion" entry): 20-year
  anniversary of *Happy Outside* at World Cafe Live, Philadelphia; proceeds to charity; full
  retrospective set with original band and guests; separate set of songs Derek Fuhrmann wrote
  for Phillip Phillips, Goo Goo Dolls, Kygo, and O.A.R.; archival re-release with remastered
  audio, bonus tracks, updated artwork.
- [ ] **3.2 Curtiss Helldiver (2006)** — missing entirely from the drums site, and it includes
  a marquee drum-world credit: **opened for Taylor Hawkins and the Coattail Riders**; won a
  battle of the bands at North Star Bar, Philadelphia; punk-rock band alongside The Crash
  Motive with heavy live improvisation.
- [ ] **3.3 Optional color (Tyler's call, low priority):** Healthy Doses shared festival bills
  with The Disco Biscuits and Lake Trout (drums site mentions Camp Oswego but not these);
  Omnisoul's WSTW "station record for most-requested song" claim (drums site has the #12
  year-end ranking only); Trellist Agency Band 2015–2017 (bass, corporate events — probably
  off-brand for a drum-session site, include only if Tyler wants it).
- [ ] **3.4 Verify a discrepancy before porting anything Skitzo-related:** this repo says bass
  on "A Night in Hell & A Sunday Morning" for LP *Ghosts* (2013); the drums site lists
  *Ghosts: The Beyond* (2016). Ask Tyler which is correct — do not guess.

**Acceptance:** drums-site build passes its own checks; new entries match the surrounding
voice and structure; nothing duplicated.

## Phase 4 — Competitive-analysis enhancements (prioritized; most need Tyler's input)

What director/staff-level engineers' personal sites consistently have that this one lacks,
ranked by payoff. None of these block Phases 1–3.


- [ ] **4.3 `/now` page (LOW effort).** A dated "what I'm doing now" page (Derek Sivers
  convention): current role focus, current build projects, current music projects, current
  reads. Freshness signal for a not-job-searching site. Add to footer, not main nav.
- [ ] **4.4 `/uses` page (LOW effort, strong fit).** Frontend-community convention
  (uses.tech). Tyler's dev setup + AI tooling; cross-link the drums site's gear page for the
  studio side — plays perfectly with the audiophile/hi-fi identity already on the homepage.
- [ ] **4.5 Downloadable PDF resume (LOW).** One link on `/resume`. Even not-searching, people
  Tyler meets will ask. Tyler supplies the PDF; agent adds the link (skip @media print
  gymnastics).
- [ ] **4.7 Per-page OG images (LOW, cosmetic).** One shared og-image today; per-page variants
  make shared links look intentional.
- [ ] **4.8 Contact identity cleanup (LOW — OPEN QUESTION #4).** Footer email is
  `tyler@ingersoll.dev`; the drums site uses `hello@tyleringersoll.com`. Pick one public
  address per property, or one overall. use hello@tyleringersoll.com <--

**Deliberately NOT doing** (anti-patterns from the competitive review): skill bars/percentage
meters, a project-thumbnail grid (ingersoll.dev already owns that role), stock imagery, blog
scaffolding with placeholder posts, newsletter popups, chatbots. The three-site structure is a
strength — hub (this site) + code lab (ingersoll.dev) + music (drums site) — keep each focused
and cross-linked, which Phases 1–2 complete.

---

## Open questions for Tyler

1. **Phase 2.3 draft titles/descriptions and 2.5 copy** — approve or edit before the agent
   applies them (they're the only invented copy in this plan).
2. **Masthead tag** — keep "Frontend engineer / Drummer" or move to "Engineering leader /
   Drummer"? (2.5 assumes the change; easy to skip.) I modified the titles, use new titles
4. **Public email** — consolidate on one address? yes I commented hello@tyleringersoll.com
5. **Skitzo Calypso *Ghosts*** — 2013 LP or 2016 *Ghosts: The Beyond*? (blocks 3.4) are they both releases? I recorded it in probably 2013 but the album released 2016 (do some research if you can on dates)

## Suggested execution order

Phase 1 and 2 together as one PR on this repo (they touch the same files). Phase 3 as one PR
on the drums repo. Phase 4 items individually, only after Tyler answers the open questions.
