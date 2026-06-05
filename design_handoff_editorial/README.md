# Handoff: "Editorial Grid" Theme Addition for tyleringersoll.com

## Overview
This bundle is a visual handoff for adding a new **Editorial Grid** aesthetic to **tyleringersoll.com**. This will be integrated as a **new, secondary theme** within the site's existing multi-theme architecture. The goal is to introduce a print-inspired grid system—hairline rules, hard corners, a single amber accent on near-black paper, and a sans/mono type pairing—**without altering or overwriting the existing default theme.**

The target codebase is the existing **Nuxt 3 + Vue 3 + SCSS** site (the folder this handoff sits next to / the repo you have open in Claude Code). **No new framework, no rewrite** — recreate this look by extending the existing Vue components and SCSS architecture, scoping all new styles strictly to the new theme.

## About the design files
The files in this bundle are **design references built in HTML/React (Babel-in-browser)** — they are prototypes showing the intended look, layout, and behavior. **They are NOT production code to paste in.** Your job is to **recreate this design inside the existing Nuxt/Vue codebase** as a distinct theme, reusing its components, pages, and content store.

Open these to see the target:
- `Home.html`, `Resume.html`, `Music.html`, `Architecture.html` — run any of them in a browser (they load React + Babel from CDN; just open the file).
- `editorial.css` — **the single source of truth for the visual system.** Every measurement, color, font, border, and spacing value lives here. Port THIS into SCSS as theme-scoped variables and rules.
- `page-*.jsx` + `ed-shared.jsx` — the markup/structure of each page (masthead, meta row, section headers, grids). Read these to understand DOM structure and class names.
- `tyler-content.js`, `tyler-content-pages.js` — the copy used in the mockups. Your real content already lives in `data/content.js` / `stores/content.js`; **keep using the real store**, these are only here so the prototypes render.

## Fidelity
**High-fidelity.** Colors, type, spacing, and borders in `editorial.css` are final — match them exactly. Recreate the UI pixel-for-pixel using the codebase's existing SCSS + Vue patterns, ensuring all styling is encapsulated within the new theme namespace.

---

## Recommended strategy (read this first)

The existing site is **fully token-driven** and supports multiple themes. 

The strictest rule for this implementation is **DO NOT OVERWRITE THE DEFAULT THEME FILES.** The cleanest path is to create new theme files that parallel the existing ones:

1. **Create a new theme token file.** Instead of replacing values in `assets/styles/themes/_theme-vars.scss`, create a new file (e.g., `_theme-editorial.scss`) and map the editorial values to the existing CSS custom properties. Register this new theme within the existing multi-theme setup. See the **token mapping table** below.
2. **Integrate with the theme toggle:** Update the site's theme switcher (e.g., `components/ThemeToggle.vue`, `stores/theme.js`) to include "Editorial" as an option alongside the default theme. The editorial design is intrinsically a dark, amber-on-near-black system.
3. **Add the new type + structural tokens.** The editorial system introduces fonts and rule weights the current site doesn't have. Add them to your variable files, but scope their application to the editorial theme selector (e.g., `.theme-editorial` or `[data-theme="editorial"]`):
   - Fonts: **Archivo** (400–900) for display/body, **Spline Sans Mono** (400–700) for labels, kickers, nav, captions. Load via Google Fonts. 
   - `--rule: #2a2b30` (hairline) and `--rule2: #3a3b42` (heavier section divider) — the entire layout is built on 1px / 1.5px rules between grid cells. Add these as new tokens specific to the editorial theme.
   - **Border-radius is 0 everywhere.** Override the default pills (`9999px`) and 8–12px radii on cards/buttons/callouts specifically when the editorial theme is active.

### Token mapping table (editorial → existing CSS variable)
Set these values in your new `_theme-editorial.scss` (or equivalent theme definition file):

| Editorial role        | Editorial value | Map onto existing token        |
|-----------------------|-----------------|--------------------------------|
| paper (page bg)       | `#0C0D10`       | `--color-bg-primary`           |
| panel (raised bg)     | `#101115`       | `--color-bg-secondary` / `--color-bg-surface` |
| ink (primary text)    | `#ECEAE3`       | `--color-text-primary`         |
| soft (body text)      | `#C7C6C1`       | `--color-text-secondary`       |
| mute (labels/captions)| `#8B8C90`       | `--color-text-muted`           |
| amber (accent)        | `#FFC24B`       | `--color-accent-line`, `--color-link`, `--color-svg-accent` |
| amber hover           | `#FFD06A`       | `--color-link-hover`           |
| rule (hairline)       | `#2A2B30`       | `--color-border`               |
| rule2 (section rule)  | `#3A3B42`       | *(new token, e.g. `--color-border-strong`)* |
| button text on amber  | `#1A1205`       | `--color-btn-primary-text`     |

> Note: the editorial system uses **one** accent (amber) where the current site uses several. Collapsing them all to amber is intentional for this specific theme.

---

## Page-by-page spec

*Note: All structural changes and CSS classes mentioned below must be conditionally applied or scoped so they do not break the layout of the default theme.*

### Global shell (scope to `layouts/default.vue` + `components/Header.vue` / `Footer.vue`)
- **Page frame:** centered column, `max-width: 1320px`, `border-left/right: 1px solid --rule2`, `min-height: 100vh`. Sits on `--paper`.
- **Masthead** (`.masthead`): sticky, `padding: 18px 56px`, `border-bottom: 1.5px solid --rule2`, translucent bg `rgba(12,13,16,.9)` + `backdrop-filter: blur(10px)`.
  - Name: weight 800, 15px, `letter-spacing .22em`, uppercase.
  - Nav links: Spline Sans Mono, 12px, `.12em`, uppercase, `--mute` → `--ink` on hover. Active link gets a leading amber `●` bullet (8px). Map this to the existing route-active state.
- **Meta row** (`.meta`): 3-col grid, hairline dividers, `padding: 13px 56px` per cell. Mono labels.
- **Section header** (`.shead`): baseline-aligned flex; `.idx` = weight 900, 30px, amber, tabular-nums (e.g. "01"); `h2` = weight 800, 30px, `.02em`, uppercase. `.shead.lg h2` scales to `clamp(34px,4.4vw,52px)`.
- **Footer** (`.foot`): space-between, `border-top: 1.5px solid --rule2`, `padding: 22px 56px`. Mono copyright text; social icons `--mute` → `--amber` on hover, 18px.
- **Links/buttons:**
  - `.link` — inline mono label, 12px `.14em` uppercase, `border-bottom: 1.5px solid --amber`, gap grows on hover (10px → 16px).
  - `.cbtn` — solid amber block button, text `#1a1205`, weight 700, 14px `.08em` uppercase, `padding: 15px 26px`, **no radius**, hover `#ffd06a`. 
  - `.chip` — mono 11px, `1px solid --rule2`, `radius 2px`, `padding 5px 9px`.

### Home (`pages/index.vue`)
- **Hero** (`.heroband`): 2-col grid `1.55fr 1fr`, hairline divider between.
  - Left (`.heroL`): kicker (mono amber), then `.bigname` — weight 900, `clamp(64px,8.4vw,108px)`, `line-height .86`, `letter-spacing -.03em`, uppercase. **Second line is outlined text:** `-webkit-text-stroke: 1.4px --amber; color: transparent`.
  - Right (`.heroR`): full-bleed **portrait** image, `object-fit: cover`, `filter: grayscale(1) contrast(1.06)`, with an absolute mono caption chip bottom-left. → image: `public/profile_glitch_subtle.webp`.
- **Engineering** (`.eng`): 2-col `1.4fr 1fr`. Left = body copy + `.cbtn`. Right = competency rows stacked with hairline dividers, then a `.callout` panel.
- **Music** (`.music`): 2-col `1fr 1.05fr`. Left = image (`filter: saturate(.78) contrast(1.02)`) with an amber `.tag` chip top-left; image `public/images/studio_kit.webp`. Right = body copy + a 3-cell `.statrow`.
- **Beyond** (`.beyond`): 4-col grid, hairline dividers. Inline details, no hover-flip in the editorial theme.
- **Connect** band: space-between, big uppercase `h3` `clamp(32px,4.4vw,46px)` + mono sub + `.cbtn`.

### Resume (`pages/resume.vue`)
- **Page head** (`.pagehead`): 2-col `1.5fr 1fr`. Left = kicker + `.ph-title` + intro paragraphs. Right = stacked `.ph-fact` blocks.
- **Timeline entries** (`.entry`): 2-col `1fr 2.3fr`, hairline divider per row. Left = mono index, uppercase company, amber year. Right = stacked `.role` blocks: mono uppercase subtitle, lead paragraph, then `ul` with custom amber dash bullets (`li::before` = 6px×1.5px amber bar).
- **Skills** (`.skillgrid`): 4-col, hairline dividers; each `.sk` = mono amber header (ruled) + list with faint row dividers.

### Music (`pages/music.vue`)
- **Music hero** (`.mhero`): 2-col `1.1fr 1fr`. Left = intro paragraphs. Right = tall image (`min-height 420px`, `saturate(.82) contrast(1.02)`) + amber `.tag` chip.
- Reuses section headers, `.entry`/`.role` rows, stat rows, and `.simple` blocks for discography / gear / placements. 

### Architecture (`pages/architecture.vue`)
- **Arch rows** (`.arch`): 2-col `1fr 2.3fr`, hairline divider. Left = big amber index + uppercase `h3`. Right = body paragraphs; some are dash-bulleted; inline `code` styled with `--panel` bg + amber text + `1px solid --rule2`.
- **Scores** (`.scores`): 4-col bordered grid; each `.sc` = huge amber value + mono label, centered.

---

## Interactions & behavior
Keep the existing routing, content store, and any existing behavior. Specific interaction notes for the editorial theme:
- **Hover states:** nav links lighten; `.link` arrow gap grows 10→16px; `.cbtn` lightens to `#ffd06a`; footer social icons go amber. All transitions ~`.15s`.
- **Reduced motion:** `editorial.css` already disables transitions under `@media (prefers-reduced-motion: reduce)` — preserve that.
- The current Home has a **hover-flip "Beyond Work" card**; the editorial theme uses an inline display instead. Use conditional rendering or theme-scoped CSS to disable the flip specifically for the editorial theme.

## Responsive behavior
Single breakpoint at **`max-width: 980px`** (see bottom of `editorial.css`):
- All 2-col grids collapse to 1 column; right-borders become bottom-borders.
- `.beyond` 4→2 cols; `.skillgrid` 4→2 cols.
- Section paddings drop from `56px` to `28px` horizontal.
Reconcile with the existing breakpoints in `_variables.scss` (`$breakpoint-md: 1024px`) — use the existing `respond-below` mixin; 980px ≈ the `md` boundary.

## Assets
- `public/profile_glitch_subtle.webp` — hero portrait (Home). Rendered grayscale + contrast bump.
- `public/images/studio_kit.webp` — studio image (Home Music section + Music page hero).
- Icons in the mockups are inline SVGs — reuse the existing icon set in `index.vue`'s `icons` map; restyle to amber, 18–26px via theme scoping.
- Fonts: Google Fonts **Archivo** + **Spline Sans Mono** (links already in each HTML `<head>`).

---

## Suggested Claude Code prompt
> I want to add a new "Editorial Grid" theme to this Nuxt site using the design handoff in `design_handoff_editorial/`. Start by reading `design_handoff_editorial/README.md` and `editorial.css`, and open the four HTML files to see the target. 
> 
> CRITICAL: The site currently has a multi-theme architecture. You MUST NOT overwrite or break the default theme. All your work must be added alongside the existing code as a new theme.
> 
> 1. Add Archivo + Spline Sans Mono. Create a NEW token file (e.g., `_theme-editorial.scss`) mapping the editorial hex values to the existing CSS custom properties per the README's mapping table. Hook this new theme into the existing theme switcher.
> 2. Apply the global shell styles (masthead, meta row, section header, footer, buttons, links) to match `editorial.css`, but scope these changes strictly to the editorial theme using CSS namespaces (e.g., `[data-theme="editorial"]`) or theme-specific component variants.
> 3. Restyle `pages/index.vue`, then `resume.vue`, `music.vue`, `architecture.vue` one at a time. Reuse the existing content store. When making structural or class changes, ensure they are conditionally applied based on the active theme so the default theme remains completely unaffected. Border-radius should be 0 in the editorial theme.
> 
> Show me your plan for scoping the CSS and component logic before writing the code, and provide a diff per file before moving on.