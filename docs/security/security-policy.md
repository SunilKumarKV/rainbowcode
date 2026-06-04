# Security Policy

## Baseline
- Never commit `.env` files.
- Validate all API input with Zod.
- Use Auth.js for authentication.
- Use Prisma parameterized queries.
- Use role-based authorization for dashboard/admin flows.
- Use signed URLs for Cloudflare R2 assets.
- Enable Dependabot and CodeQL.
- Require PR review before merge.

## Required Checks
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
- pnpm security:audit
