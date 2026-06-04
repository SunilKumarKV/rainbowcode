# RainbowCode

RainbowCode is a global design-to-code platform where users visually create and customize logos, themes, components, pages, and full design systems. Every change updates a live preview and generates production-ready code.

## Product Studios

- Brand Studio: logo, typography, colors, brand kits
- Theme Studio: glass, neon, minimal, gaming, luxury, SaaS themes
- Component Studio: buttons, cards, inputs, navbar, sidebar, dashboard UI
- Canvas Studio: draw, drag, resize like Paint/Figma
- Code Studio: React, Next.js, Tailwind, HTML/CSS export
- RBC CLI: initialize projects, add components, install themes
- Docs, Blog, Marketplace, Templates, Community

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Radix UI
- Konva.js
- Zustand
- React Hook Form
- Zod
- PostgreSQL
- Prisma
- Auth.js
- Cloudflare R2
- Redis + BullMQ later

## Monorepo

```txt
apps/
  web/       RainbowCode web app
  docs/      Documentation site
packages/
  ui/        Shared UI primitives
  tokens/    Theme token engine
  config/    Shared configs
  rbc-cli/   CLI package
prisma/      Database schema
docs/        Product, architecture, security, QA docs
scripts/     Automation scripts
```

## Founder Rule

Do not randomly code features. First design architecture, folder structure, issues, DB schema, API contracts, and tests.

## First Build Priority

1. Monorepo setup
2. Next.js web app
3. Tailwind design system
4. Dashboard layout
5. Editor layout
6. Theme token engine
7. Button builder prototype
8. Code preview/export
9. Docs structure
10. CLI package structure

## Commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
