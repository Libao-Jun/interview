# 更新日志

## [2026-07-08 v1.2.1] GitHub Pages 路径重复修复

### Bug 原因：`/interview` 被加了两次

| 来源                           | 加的路径                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `next.config.mjs` → `basePath` | `/interview`（Next.js 自动为所有路由加前缀）                      |
| `lib/shared.ts` → `docsRoute`  | `/interview/docs`（手动拼接）                                     |
| **最终**                       | `/interview` + `/interview/docs` = `/interview/interview/docs` ❌ |

### 修复：去掉 `lib/shared.ts` 中的手动拼接

让 Next.js 的 `basePath` 统一处理前缀：

| 环境         | `docsRoute` | Next.js `basePath` | 最终 URL                |
| ------------ | ----------- | ------------------ | ----------------------- |
| 本地         | `/docs`     | 无                 | `/docs/...` ✓           |
| GitHub Pages | `/docs`     | `/interview`       | `/interview/docs/...` ✓ |

### 变更文件

| 文件            | 改动说明                                                                             |
| --------------- | ------------------------------------------------------------------------------------ |
| `lib/shared.ts` | 移除手动 `basePath` 拼接，`docsRoute` 和 `docsImageRoute` 不再包含 `/interview` 前缀 |

## [2026-07-08 v1.2.0] 项目性能优化

### 变更的文件 (24 个)

| 类别       | 文件                              | 改动说明                                                              |
| ---------- | --------------------------------- | --------------------------------------------------------------------- |
| 构建加速   | `package.json`                    | dev 命令添加 `--turbo`，保留 `dev:webpack` 回退                       |
| 构建加速   | `next.config.mjs`                 | 添加 `turbopack.resolveAlias` + `experimental.optimizePackageImports` |
| 性能优化   | `lib/search.server.ts`            | `collectSearchAliases()` 改为懒加载，不在模块顶层执行                 |
| 性能优化   | `lib/search.shared.ts`            | CJK tokenizer n-gram 从 unigram~4gram 缩减到 bigram~3gram             |
| 性能优化   | `app/api/search/route.ts`         | 搜索 API 添加 `Cache-Control: max-age=3600` 缓存头                    |
| 性能优化   | `app/docs/[[...slug]]/page.tsx`   | dev 模式跳过全量预编译，改为按需懒编译（**首屏从 63s → ~7s**）        |
| 性能优化   | `app/og/docs/[...slug]/route.tsx` | dev 模式同样跳过 OG 图片全量预生成                                    |
| 格式化修复 | 19 个 `.mdx` 文件                 | `<Callout>` → `:::` 语法 + 列表结构规范化                             |

### 效果对比

| 指标            | 优化前                     | 优化后                            |
| --------------- | -------------------------- | --------------------------------- |
| `pnpm dev` 启动 | ~30 秒                     | **833ms** (↓ 36x)                 |
| 首次页面访问    | **63s** (全量预编译 24 页) | **~7s** (按需编译单页)            |
| 后续页面访问    | 111ms~427ms                | ✅ 不变                           |
| `pnpm build`    | 正常                       | ✅ 正常（30 路由全部生成）        |
| Callout 格式化  | 右键格式化乱序             | ✅ `:::` 纯 markdown，格式化安全  |
| search route    | 无缓存                     | ✅ 1 小时强制缓存                 |
| GitHub Actions  | —                          | ✅ 不影响（dev 参数不参与 build） |
