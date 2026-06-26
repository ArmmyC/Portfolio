<!-- prettier-ignore -->
<div align="center">

<img src="./public/favicon.svg" width="82" height="82" alt="Kamolpop monogram" />

# Kamolpop.dev

*A personal engineering portfolio for AI infrastructure, embedded systems, robotics, and computer architecture projects.*

![React](https://img.shields.io/badge/React-18-20232a?style=flat-square&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Test-Vitest-6e9f18?style=flat-square)

[Overview](#overview) • [Features](#features) • [Quick-start](#quick-start) • [Project-structure](#project-structure) • [Deployment](#deployment)

</div>

## Overview

**Kamolpop.dev** is the portfolio website for **Kamolpop Vitayarat**, also known as **ArmmyC** or **Arm**, a Computer Engineering student at **KMUTT**. The site presents engineering work across AI infrastructure, embedded systems, edge AI, robotics, RISC-V, FPGA, and practical software projects.

The app is built with Vite, React, TypeScript, Tailwind CSS, Radix/shadcn-style UI primitives, theme support, and SEO metadata for rich social previews.

> [!NOTE]
> The repository is currently named `Portfolio`, which is simple but generic. **Kamolpop.dev** is a stronger project name because it matches the canonical site identity and feels more personal, professional, and memorable.

## Features

| Capability | What it provides |
| --- | --- |
| Personal landing page | About, experience, projects, recognition, skills, and contact sections |
| Responsive navigation | Sidebar layout on desktop and mobile navigation on smaller screens |
| Project showcase | Curated engineering projects with category, status, tech stack, and links |
| SEO-ready metadata | Description, Open Graph, Twitter card, canonical URL, and JSON-LD person schema |
| Theming | Light/dark mode support through `next-themes` |
| Interactive details | Ambient mouse glow, reveal animations, and cat-themed easter egg UI |
| Modern frontend stack | React 18, TypeScript, Vite, Tailwind, Radix UI, React Query, and Vitest |

## Tech stack

```text
Framework      Vite + React + TypeScript
Styling        Tailwind CSS + CSS variables
UI primitives  Radix UI / shadcn-style components
Routing        React Router
State/data     TanStack React Query
Theme          next-themes
Testing        Vitest + Testing Library
Build output   dist/
```

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The Vite dev server is configured to run on port `8080`.

### 3. Build for production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run build:dev` | Build with development mode settings |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |

## Content model

Most portfolio content lives in [`src/data/portfolio.ts`](./src/data/portfolio.ts):

- Profile name, nickname, role, intro, location, email, GitHub, and LinkedIn
- Navigation labels
- Experience entries
- Featured projects
- Recognition and certifications
- Skill groups
- Cat status messages used by the interactive UI

> [!TIP]
> To update the portfolio content, start with `src/data/portfolio.ts` before editing individual section components.

## Project structure

```text
.
├── public/                 # Favicons, manifest, social preview assets
├── src/
│   ├── components/         # Shared UI, navigation, mascot, and section components
│   ├── components/sections # About, Experience, Projects, Recognition, Skills, Contact
│   ├── data/portfolio.ts   # Main portfolio content source
│   ├── hooks/              # Active-section and reveal-animation hooks
│   ├── pages/              # Route pages
│   ├── App.tsx             # Providers, router, theme, and route setup
│   ├── index.css           # Tailwind layers, design tokens, animations
│   └── main.tsx            # React entry point
├── index.html              # SEO, Open Graph, icons, fonts, and root mount
├── tailwind.config.ts      # Tailwind theme extension and plugins
├── vite.config.ts          # Vite, React SWC, aliases, and dev server config
└── package.json            # Scripts and dependencies
```

## Deployment

This is a static Vite app. Any host that can serve the generated `dist/` directory works.

```bash
npm run build
```

Deploy the generated output:

```text
dist/
```

Recommended deployment targets include GitHub Pages, Vercel, Netlify, Cloudflare Pages, or a static web server.

> [!IMPORTANT]
> Update the canonical URL, Open Graph image URL, and social metadata in `index.html` when deploying to a different domain.

## Naming recommendation

The current repository name, `Portfolio`, is short but too generic. **Kamolpop.dev** is the better project name because it aligns with the site URL, the SEO metadata, and the personal brand behind the portfolio.
