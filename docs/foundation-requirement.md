# Project foundation

## Requirement

Set up MapleCalculator's application and verification framework without adding gameplay calculations or character data features.

## Acceptance criteria

- Next.js App Router and strict TypeScript.
- Minimal project homepage with no starter logos, demo links or external fonts.
- Static export without application backend or database.
- Vitest and React Testing Library run a homepage unit smoke test; future calculation tests use pure functions and the Node environment.
- Playwright runs a homepage load and refresh smoke test against the production static export.
- ESLint, TypeScript, unit coverage, build and browser tests pass through `npm run verify`.
- GitHub Actions runs verification on pull requests and pushes to main.
- README explains local development, tests, architecture and review workflow.

This local requirement records the intended initial GitHub Issue. Creating the remote Issue was blocked by the connected integration's permissions (HTTP 403).
