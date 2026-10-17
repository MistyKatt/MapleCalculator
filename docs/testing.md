# Running tests in VS Code

Open the `MapleCalculator` repository folder itself in VS Code (the folder containing `package.json`). In **Terminal > New Terminal**, run the commands below. There is no `.sln` or separate test project: npm scripts are the project's shared command interface.

## First-time setup

Use Node.js 24, then run:

```sh
npm ci
npx playwright install chromium
```

## Unit tests: Vitest

```sh
npm test
npm run test:watch
npm run test:coverage
```

Use one command at a time: these respectively run once, watch for edits, and generate coverage under `coverage/`. A running Next.js app is not required.

Run one file or one named test:

```sh
npm test -- tests/unit/home.test.tsx
npm test -- -t "shows the project identity"
```

`describe`, `it` and `expect` provide grouping, test cases and assertions, similar to familiar xUnit/NUnit patterns. Tests can live in `tests/unit/` or alongside source as `*.test.ts(x)`. Future pure calculation tests should use `// @vitest-environment node`; page/component tests use the configured jsdom environment.

For Test Explorer and breakpoint debugging, install the official **Vitest** extension (`vitest.explorer`). Open the Testing panel in VS Code and use Run/Debug beside a test. The CLI remains the CI-compatible entry point.

## Browser integration tests: Playwright

```sh
npm run test:integration
npm run test:integration:ui
```

The first runs headless Chromium; the second opens Playwright's interactive test UI. Both build the app first. Playwright starts the static site on `127.0.0.1:3100` and shuts it down afterwards. You do not need to run `npm run dev`; leave port 3100 free.

Run or debug a single test file:

```sh
npm run test:integration -- tests/integration/home.spec.ts
npm run test:integration -- --debug
npx playwright show-report
```

For VS Code Test Explorer, install Microsoft's **Playwright Test for VSCode** extension (`ms-playwright.playwright`). The tests and Playwright configuration already exist; do not generate another setup. Run `npm run build` before running tests through the extension because it invokes Playwright directly and bypasses the npm build wrapper. Then use Run/Debug beside tests in the Testing panel. Rebuild after application edits when using this route.

These tests operate through a real browser and serve as UI integration/E2E tests. The current smoke test covers homepage load, refresh and uncaught page errors. Character editing and import tests will be added with those features.

## Before a PR

```sh
npm run verify
```

This runs lint, TypeScript, unit coverage, production build and browser tests, matching GitHub Actions. Initial smoke-test coverage does not imply coverage of future calculation logic.

Official references: [Vitest IDE integration](https://vitest.dev/guide/ide.html), [Playwright in VS Code](https://playwright.dev/docs/getting-started-vscode).
