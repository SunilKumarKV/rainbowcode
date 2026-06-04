# RainbowCode Foundation Architecture

## Apps
- `apps/web`: Next.js product application.

## Packages
- `packages/ui`: reusable UI components.
- `packages/config`: shared ESLint, TypeScript, Tailwind config.
- `packages/utils`: shared helpers.
- `packages/cli`: RBC CLI for installing themes/components.

## Product Modules
- Brand Studio
- Theme Studio
- Component Studio
- Canvas Studio
- Code Studio
- Docs, Blog, Marketplace, Templates, Community

## Architecture Rules
- Strict TypeScript.
- Component-based architecture.
- Server validation with Zod.
- No secrets in frontend bundles.
- Accessibility and performance checked before release.
