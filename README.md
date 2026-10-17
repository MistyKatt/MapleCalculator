# MapleCalculator

MapleStory 角色属性与输出变化对比工具。当前版本仅包含项目框架和简洁首页，尚未实现伤害公式、角色存档或 JSON 导入。

## 本地开发

使用 Node.js 24 LTS 与 npm，依赖版本通过 `package-lock.json` 固定。

```sh
npm ci
npx playwright install chromium
npm run dev
```

打开 http://localhost:3000 。

## 验证命令

| 命令 | 用途 |
| --- | --- |
| `npm run lint` | ESLint，零警告 |
| `npm run typecheck` | 生成 Next.js 路由类型并运行 TypeScript 检查 |
| `npm test` | Vitest 单元测试 |
| `npm run test:watch` | 单元测试监听模式 |
| `npm run test:coverage` | 单元测试与覆盖率报告 |
| `npm run test:integration` | 构建后使用 Playwright 测试静态网站 |
| `npm run test:integration:ui` | Playwright 交互式测试界面 |
| `npm run verify` | 完整本地与 CI 检查 |
| `npm run build` | 生成 `out/` 静态网站 |
| `npm start` | 预览已构建的静态网站 |

Playwright 自动在 `127.0.0.1:3100` 启动独立静态服务，测试结束后关闭。首次运行或更新 Playwright 后需安装对应 Chromium。CI 使用 `npx playwright install --with-deps chromium`。

## 项目结构与约定

- `src/app/`：App Router 页面、布局和全局样式。
- `tests/unit/`：Vitest 配置辅助与初始页面测试；也支持源码旁的 `*.test.ts(x)`。
- `tests/integration/`：Playwright 浏览器集成测试，命名为 `*.spec.ts`。
- `docs/`：需求与验收标准。
- `.github/`：CI 与 PR 模板。

后续核心计算放在 `src/lib/calculations/`，使用不依赖 React、浏览器或存储的纯函数；对应测试使用 `// @vitest-environment node`。浏览器存档与 JSON 校验将作为独立模块实现，并通过客户端组件调用。无存档时使用预设值。这些功能不属于本次框架搭建范围。

项目使用 `output: "export"` 生成静态文件，无 API routes、Server Actions 或数据库。未来 localStorage 访问必须在客户端执行，避免构建期间访问浏览器 API。

初始测试仅验证测试链路和首页加载；添加计算及交互后，需补充对应的业务测试与边界条件。当前无可用的计算操作，不添加虚构业务逻辑作为测试示例。

## 开发工作流

1. GitHub Issue 定义需求与 Acceptance Criteria。
2. 阅读项目规范，从 main 创建 `codex/<feature>` 分支。
3. 实现功能与必要测试，运行 `npm run verify`。
4. 提交并推送分支，创建关联 Issue 的 Pull Request。
5. GitHub Actions 通过，完成 Codex Code Review 与项目所有者 Review。
6. Review 通过后合并 main，保持主分支稳定。

初始框架的验收标准见 [docs/foundation-requirement.md](docs/foundation-requirement.md)。

## 依赖维护

ESLint 暂使用 Next.js 官方插件组合兼容的 9.x；其部分插件尚未声明支持 ESLint 10，需一起升级。`compression` 通过 override 使用已修复版本。初始安装的审计报告另有 `braces` 深度嵌套模式导致拒绝服务的告警，来自 Next.js ESLint 插件的开发依赖链，尚无可用补丁；不进入导出的静态网站。后续跟踪上游修复，避免用 `npm audit fix --force` 将框架配置降级到不兼容版本。
