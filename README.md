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
