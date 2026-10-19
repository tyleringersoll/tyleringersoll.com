# ingersoll.dev

<!-- Deploy + CI -->
[![Netlify Status](https://api.netlify.com/api/v1/badges/cb5e5fbb-8b81-48e7-8f60-d49785a701a4/deploy-status)](https://app.netlify.com/sites/tyleringersoll/deploys)
[![Tests](https://github.com/tyleringersoll/ingersoll.dev/actions/workflows/test.yml/badge.svg)](https://github.com/tyleringersoll/ingersoll.dev/actions/workflows/test.yml)
[![Lighthouse](https://github.com/tyleringersoll/ingersoll.dev/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/tyleringersoll/ingersoll.dev/actions/workflows/lighthouse.yml)
[![codecov](https://codecov.io/gh/tyleringersoll/ingersoll.dev/branch/main/graph/badge.svg)](https://codecov.io/gh/tyleringersoll/ingersoll.dev)

<!-- Meta -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-24-339933?logo=node.js&logoColor=white)](.nvmrc)

<!-- Stack -->
![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-state-FFD859?logo=pinia&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-styling-CC6699?logo=sass&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-tested-6E9F18?logo=vitest&logoColor=white)

Personal portfolio website built with Nuxt 3, hosted on Netlify.

## Tech Stack

- **Nuxt 3** - SSR/SSG framework with Vue 3 + `<script setup>`
- **Pinia** - State management
- **Sass** - Styling
- **Vitest + @nuxt/test-utils** - Unit testing
- **Netlify** - Static hosting

## Setup

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test           # one-shot
npm run test:watch     # watch mode
npm run test:coverage  # with coverage report
```

## Content

Static site content lives in [data/content.js](data/content.js).

The PDF resume download is hidden for now while a new, template-based version is
made. To bring it back, put the PDF in `public/` and add `pdfUrl` (for example
`"/Tyler_Ingersoll_Resume.pdf"`) to the first `resume` entry in `data/content.js`;
both themes show the download link only when that key is set.

The old generator still builds a PDF from that same file:

```bash
python3 -m venv /tmp/tyler-resume-venv
/tmp/tyler-resume-venv/bin/pip install -r scripts/requirements-resume.txt
/tmp/tyler-resume-venv/bin/python scripts/generate_resume.py
```

The generator writes `public/Tyler_Ingersoll_Resume.pdf`. It keeps recent roles
in detail and condenses earlier roles; the web resume retains the full history.


## Component workshop (Storybook)

The public workshop is built automatically at `/storybook/` with the portfolio.
It imports the actual components, content, theme registry, and Sass. Start with
**Start here → Inside the site** for a guided tour. Foundations show computed
colors, type specimens, spacing, breakpoints, motion, and theme behavior.
Component docs include controls and examples; interaction stories exercise the
keyboard and focus contracts. Full page compositions cover both layouts.

```sh
npm run storybook       # Development UI on port 6006
npm run build-storybook # Site asset generation + standalone .storybook-static
npm run generate        # Portfolio + workshop in .output/public (dist)
npm run test:storybook -- --url http://127.0.0.1:6006
```

The development command first generates the site’s font/image assets, then starts
Storybook. This also bypasses the Nuxt Fonts preview middleware’s H3-event issue.
Run Nuxt and Storybook development separately: both use `.nuxt`. `npm run dev`
serves the last `npm run build-storybook` output at `/storybook/`; rebuild it to
see story changes there. Production
builds run sequentially for the same reason. The build reuses Nuxt's generated
font files and verifies every font reference before publishing the workshop.
No Storybook code is imported into the portfolio bundle.

The preview excludes analytics and saved-theme bootstrap. It uses the real theme
store with persistence disabled inside the iframe, so examples cannot overwrite
portfolio preferences. The Appearance toolbar sets a starting state; component
interactions do not update that toolbar label. Docs render examples in separate
iframes to isolate document-level theme tokens and overlays.

`stories/docs/` explains architecture, accessibility review, and story authoring.
The Storybook CI workflow builds the integrated output and runs stories, play
functions, and axe checks in Chromium. Local browser test runs require Playwright
Chromium (`npx playwright install chromium`) and a running Storybook/static server.
The ordinary Vitest suite remains `npm run test:coverage`.
