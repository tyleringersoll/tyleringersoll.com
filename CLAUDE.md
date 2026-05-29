# CLAUDE.md

Rules and preferences for working on this site. Read before making any changes.

---

## Responses

- Be concise. Lead with the action or answer, skip preamble.
- No trailing summaries after completing a task. The diff speaks for itself.
- No emojis unless explicitly asked.
- Short, direct sentences. If it can be said in one sentence, don't use three.

---

## Writing Voice

All content on this site is written in first person, for Tyler Ingersoll. Match this voice exactly when writing or editing content.

### Tone
- Direct and factual. No marketing language, no hype, no padding.
- Confident but not boastful. Let specifics do the work.
- Human. Personal details (family, hobbies, place) are part of the voice, not separate from it.
- No filler phrases: avoid "a passion for", "I'm excited to", "leveraged", "spearheaded", "dynamic", "innovative".

### Specificity
- Always use real details: actual band names, venue names, company names, year ranges, placements, technologies.
- Vague claims without grounding are not this voice. Bad: "I've played many shows." Good: "We held down The Stone Balloon, The East End Cafe, and The Deer Park Tavern."
- Placements, clients, and accolades are stated plainly, not sold.

### Structure
- Short paragraphs. One idea per paragraph, two to three sentences max.
- Lists use bullet points (•) in content strings, not markdown dashes.
- Resume content can be denser but stays specific and factual.

### Punctuation
- **No em dashes. Ever.** Do not use — in any content. Use a comma, period, or restructure the sentence instead.
- No en dashes for ranges in prose. Spell it out or use a comma.
- Year ranges use an en dash with no spaces: 2007–2008.
- Parentheses are fine for short asides.

### Content examples to match
> "I'm a frontend engineer and engineering leader. At Best Egg, I lead a team shipping customer-facing products that touch millions of users."

> "We won UD's Battle of the Bands, held down The Stone Balloon, The East End Cafe, and The Deer Park Tavern, and earned support slots with Sugar Ray, Collective Soul, Lifehouse, and the All American Rejects."

> "After the Crash Motive wound down, I co-founded SpeakerCity with a group of top-tier players from the Philadelphia area."

---

## Color System

This site uses a CSS custom property system with dark mode as the default and a `.light-mode` class for light mode.

### Implementation
- Define all colors as CSS custom properties on `:root` (dark) and `html.light-mode` (light).
- Apply via `color: var(--color-link)` etc. Never hardcode hex values in components.
- Theme toggle adds/removes `.light-mode` on the `html` element.

### Dark mode (default `:root`)
```css
--color-bg-primary: #151a1e;
--color-bg-secondary: #1f272d;
--color-bg-nav: #2C363F;
--color-bg-surface: #343d46;
--color-text-primary: #fefefe;
--color-text-secondary: #a7adba;
--color-text-muted: #65737e;
--color-border: #4f5b66;
--color-nav-link: #ffffff;
--color-accent-line: #00B7FF;
--color-link: #ff6f69;
--color-link-hover: #ffcc5c;
--color-active-nav: #ffcc5c;
--color-focus: #0072FF;
```

### Light mode (`html.light-mode`)
```css
--color-bg-primary: #f5f5f0;
--color-bg-secondary: #e8e8e2;
--color-bg-nav: #dde0e4;
--color-bg-surface: #d4d7dc;
--color-text-primary: #1a1a1a;
--color-text-secondary: #444a55;
--color-text-muted: #5e6672;
--color-border: #c0c5cb;
--color-nav-link: #1a1a1a;
--color-accent-line: #007ab5;
--color-link: #c0392b;
--color-link-hover: #b07d00;
--color-active-nav: #007ab5;
--color-focus: #0055cc;
```

### Color usage rules
- Links: `var(--color-link)` default, `var(--color-link-hover)` on `:hover`
- Headings (h2, h3, h4): `var(--color-accent-line)`
- Focus outlines: `2px solid var(--color-focus)` with `2px offset` on `:focus-visible`
- Active/selected nav: `var(--color-active-nav)`
- No custom `::selection` styles

---

## Code

- Avoid over-engineering. Only build what is directly needed.
- Don't add docstrings, comments, or type annotations to code you didn't change.
- Don't add error handling for scenarios that can't happen.
- Don't create helpers or abstractions for one-time operations.
- Prefer editing existing files over creating new ones.
- No backwards-compatibility shims for removed code.
