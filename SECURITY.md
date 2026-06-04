# Security Policy

## Supported Versions

Only the latest main branch is supported.

## Reporting

Do not open public issues for vulnerabilities.
Report security issues privately.

## Security Requirements

- TypeScript strict mode
- Input validation with Zod
- Authentication with Auth.js
- Prisma ORM
- CodeQL enabled
- Dependabot enabled
- Secret scanning enabled
- CSP headers
- Rate limiting
- Audit logging

## Release Gate

No production release without:
- CI passing
- Security checks passing
- QA sign-off
