# MapleCalculator project instructions

## Branches and delivery

- New branches use `<type>/<id>-<description>`:
  - `feature/` for new product functionality, for example `feature/001-add-new-player-type`.
  - `bug/` for bug fixes, for example `bug/001-fix-wrong-ied-calculator`.
  - `maintain/` for architecture, tooling, skills, documentation and other maintenance, for example `maintain/001-change-start-maple-branch-skill`.
- IDs are numeric work-item identifiers padded to at least three digits (`1` becomes `001`; `1234` stays `1234`). Use the user-provided identifier or the associated GitHub Issue number. Do not invent a GitHub Issue or claim a task ID is an existing Issue.
- Descriptions use lowercase ASCII letters and digits, with single hyphens between words. Git disallows spaces in branch names: use `feature/001-add-new-player-type`, not the display-style wording `feature/001 - Add new player type`. Do not include a literal `#` before the ID.
- The complete branch name must match `^(feature|bug|maintain)/[0-9]{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$`.
- For branch creation, use the repository skill at `.agents/skills/maple-start-branch/SKILL.md`. Continue an existing branch for follow-up work on the same work item.
- Start independent work from an up-to-date `main`. Do not rename existing branches or move uncommitted work merely to enforce this convention.
- Keep the repository README absent at this stage. Put specific requirements and usage guides in `docs/` when needed.
- Define requirements and acceptance criteria in a GitHub Issue. If access is unavailable, record them under `docs/` and report the limitation.
- Use a PR for delivery. Merge only after CI, Codex review and owner review pass; do not merge just because implementation is complete.

## Architecture

- Next.js App Router, TypeScript and static export; no application backend or database.
- Keep damage calculations as pure functions in `src/lib/calculations/`, independent of React and browser storage.
- Access localStorage only on the client. Validate imported character JSON before using it.
- Do not invent MapleStory formulas or silently assume a region, version or job when it changes the result. Document confirmed calculation assumptions and their sources.

## Verification

- Vitest: `npm test`; unit tests use `*.test.ts(x)`. Pure calculation tests use `// @vitest-environment node`.
- Playwright: `npm run test:integration`; browser tests use `tests/integration/*.spec.ts`. This command builds and starts the static site automatically.
- Before delivering code or build configuration changes, run `npm run verify` (ESLint, TypeScript, coverage, build and browser tests). Report failures or checks that could not run.
- Documentation-only changes need a diff and link review, not the full application test suite.
- Add calculation boundary cases and meaningful browser interaction tests as those features are implemented. Do not add gameplay features solely to demonstrate testing.
