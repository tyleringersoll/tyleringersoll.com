# tyleringersoll.com — Refocus Plan & TODO

**Goal:** Make tyleringersoll.com the engineering-career identity site. The homepage keeps its
50/50 engineering/music framing, but the deep music content moves to tyleringersolldrums.com.
Architecture joins the main nav. Fix the SEO bugs found during the audit.

**Status (2026-08-29):** Phases 1, 2, and 3 are done, plus 4.8. Phase 4 is what remains, and
every open item is blocked on content only Tyler can supply.

- This repo: branch `site-refocus`, commit `45d8774`. 172 tests pass. Lighthouse median of 3
  runs is 100 / 100 / 100 / 100 on all three routes.
- Drums repo: branch `work-timeline`, commit `6038c17`. Build passes, timeline verified in
  both light and dark mode.

Neither branch is pushed or merged. Review, then merge when ready.

**Guardrails (still apply to any further work):**
- Do NOT add dependencies. The 100/100/100/100 Lighthouse score is a showcased feature.
- Do NOT restyle anything unless the task says to.
- Both themes (`themes/signal-flow/`, `themes/reel-to-reel/`) render every page.
- Run `npm run test` after each change; update specs rather than skipping them.

---

## Phase 1 — Remove /music, redirect to tyleringersolldrums.com ✅ DONE

- [x] **1.1 Data:** Removed the `drums` array from `data/content.js`. Nav item Music →
  Architecture. Homepage music CTA now reads "View my music career" and points at
  `https://tyleringersolldrums.com` with `ctaExternal: true`. `home.drums` itself untouched.
- [x] **1.2 Routes/views:** Deleted `pages/music.vue` and both themes' `views/Music.vue`;
  removed `MusicView` from both manifests.
- [x] **1.3 Prerender:** `/music` removed from `nitro.prerender.routes`.
- [x] **1.4 Redirect:** `netlify.toml` now 301s `/music` and `/music/*` to the drum site with
  `force = true`. The old status-200 rewrite is gone.
- [x] **1.5 Lighthouse CI:** `/music/index.html` removed from `.lighthouserc.json`.
- [x] **1.6 Tests:** Deleted `tests/pages/music.spec.js`; updated `Header.spec.js`,
  `index.spec.js`, and `tests/themes/reel-to-reel.spec.js`. Added a spec asserting the music
  CTA renders as an external anchor with `target="_blank"` and `rel="noopener noreferrer"`.
- [x] **1.7 Sitemap:** `/music` entry removed.
- [x] **1.8 Sweep:** No `/music` references remain outside the intentional redirect rules.

**Extra, not in the original plan:** both themes rendered the music CTA as a `NuxtLink`, which
would have emitted a broken internal link to an external URL. signal-flow now routes it through
its existing `linkTag`/`linkAttrs` helpers; reel-to-reel uses a plain external anchor matching
its own callout pattern. The Architecture page also used `/music` as its worked example of the
trailing-slash rewrite, so that now uses `/resume` and gains a short "Retired Routes" bullet
describing the redirect.

## Phase 2 — SEO & identity fixes ✅ DONE

Live primary domain confirmed as `https://www.tyleringersoll.com` (apex 301s to www).

- [x] **2.1** `sitemap.xml` and `robots.txt` moved off `ingersoll.dev` onto the www host.
- [x] **2.2** `og:url` and `og:image` moved to the www host; global title/description updated
  to the new positioning.
- [x] **2.3** Per-page `useSeoMeta` on all three page wrappers, using Tyler's edited titles.
  Verified unique `<title>` per route in the built HTML.
- [x] **2.4** JSON-LD `Person` schema in `app.vue`, rendered on every route.
- [x] **2.5** Homepage engineering blurb now opens with the leadership role. `content.meta.tag`
  updated to "Frontend engineering leader / Drummer" — note this key turned out to be dead
  data, nothing renders it. The reel-to-reel masthead roleline, which IS rendered, was changed
  from "Frontend Engineer" to "Frontend Engineering Leader" to match. Revert that one line in
  `themes/reel-to-reel/views/Home.vue` if you'd rather it stayed.

## Phase 3 — Music content ported to the drums site ✅ DONE

Implemented as Tyler's suggested career timeline on the Work page, below Press, collapsible so
the section stays short. The newest entry is open by default. New events go in
`data/pages/work.js` under `timelineSection.items`. Ten entries, written to that repo's
CLAUDE.md voice rules (no em dashes, en-dash year ranges, cities spelled out).

- [x] **3.1 Omnisoul 2024 reunion** — was only an image alt-text on the drums site.
- [x] **3.2 Curtiss Helldiver (2006)** — was missing entirely, including the Taylor Hawkins and
  the Coattail Riders opener and the North Star Bar battle of the bands.
- [x] **3.3 Optional color** — included the Disco Biscuits / Lake Trout festival bills and the
  WSTW most-requested-song record, both taken from your own copy. **Left out** the Trellist
  Agency Band, since you flagged it as probably off-brand for a drum site. Say the word and
  it's a four-line addition.
- [x] **3.4 Skitzo Calypso discrepancy — RESOLVED.** They are two different releases, and the
  drums site was right. *Ghosts* (January 2, 2012) is a five-track record that does not contain
  your song. "A Night in Hell & A Sunday Morning" is track 4 on *Ghosts: The Beyond*
  (November 1, 2016), mixed and mastered by Tony Correlli at The Deep End Studio. So a 2013
  tracking date and a 2016 release are consistent. The timeline entry is filed under 2016 to
  match the discography. Worth knowing: Bandcamp's credits for that record don't list you at
  all, so if you want the credit visible publicly, Bandcamp is the place to fix it.

## Phase 4 — Remaining enhancements (all blocked on Tyler)

- [x] **4.8 Contact identity cleanup.** Consolidated on `hello@tyleringersoll.com` in all three
  places it appeared: the footer social icon, `components/Footer.vue`, and the reel-to-reel
  home connect button. Nothing points at `tyler@ingersoll.dev` any more.

- [ ] **4.3 `/now` page.** Ready to build; I need the content. Roughly five bullets: what
  you're focused on at work right now, what you're building personally, current music
  projects, what you're riding/reading/listening to. Include a date; the convention is to
  stamp "Last updated" on it. Link from the footer, not the main nav.
- [ ] **4.4 `/uses` page.** Ready to build; I have the software half already (Angular, Vue,
  Nuxt, TypeScript, Cursor, Copilot, Claude Code, Figma, DataDog, Netlify, GitHub Actions,
  all from your resume). I need the hardware: machine, monitor, keyboard, mouse, desk, audio
  interface, headphones. I'd cross-link the drums site's gear page for the studio side rather
  than duplicating it.
- [ ] **4.5 Downloadable PDF resume.** Drop a PDF in `public/` and I'll wire the link into the
  resume page header. One line of work once the file exists.
- [ ] **4.7 Per-page OG images.** Cosmetic. Needs a design decision from you on what the
  variants should look like; the current single `og-image.png` is not broken, just generic.

**Deliberately NOT doing:** skill bars, project-thumbnail grids (ingersoll.dev owns that),
stock imagery, blog scaffolding with placeholder posts, newsletter popups, chatbots.

---

## Suggested next steps

1. Review both branches and merge (`site-refocus` here, `work-timeline` on the drums repo).
2. After deploy, confirm `https://www.tyleringersoll.com/music` 301s to the drum site.
3. Resubmit the sitemap in Google Search Console. It has been pointing at `ingersoll.dev`, so
   this site's pages may never have been properly submitted.
4. Send me content for `/now` and `/uses` when you want those built.
