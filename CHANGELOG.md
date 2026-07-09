# 更新日志

## [2026-07-09 v1.3.0] SEO 优化 

> SEO 优化 -> robots.txt / sitemap.xml / TDK + Meta

### 新增

| 文件                 | 说明                                                              |
| -------------------- | ----------------------------------------------------------------- |
| `lib/seo.ts`         | **唯一 SEO 配置源** — 集中管理 `siteConfig`（站点名/描述/关键词/作者）+ `getSiteUrl()` |
| `app/sitemap.ts`     | 动态生成 sitemap.xml，包含首页 + 全部 24 个文档页面的完整 URL     |
| `app/robots.ts`      | 改进：站点 URL 动态生成，指向完整 sitemap 地址                     |

### 修改

| 文件                      | 说明                                                                     |
| ------------------------- | ------------------------------------------------------------------------ |
| `app/layout.tsx`          | 根布局从 `lib/seo.ts` 读取配置，新增完整 TDK + Open Graph + Twitter Card + robots meta |
| `app/(home)/page.tsx`     | 首页从 `lib/seo.ts` 读取配置，新增独立 metadata（标题 / 描述 / OG / Twitter） |
| `lib/shared.ts`           | 移除 SEO 相关配置（迁移至 `lib/seo.ts`），保留路由常量和 `appName` 兼容别名 |

### SEO 优化详情

#### TDK（Title / Description / Keywords）
- **Title**: `前端面试知识库 — 从基础到专家的面试路线图`（首页），内页使用 `{标题} | 前端面试知识库` 模板
- **Description**: 覆盖核心卖点的详细描述（~60 字）
- **Keywords**: 前端面试、JavaScript、TypeScript、React、Vue 等 14 个核心关键词

#### Open Graph / Twitter Card
- `og:type`: website
- `og:site_name`: 前端面试知识库
- `og:locale`: zh_CN
- `twitter:card`: summary_large_image

#### Robots Meta
- `index: true` / `follow: true`
- `max-image-preview: large` / `max-snippet: -1`（不限制）

#### Sitemap
- 首页 priority=1.0, changefreq=daily
- 文档页 priority=0.8, changefreq=weekly
- `lastmod` 取自页面 `updatedAt` 字段

### 效果
- 搜索引擎可以正确抓取和索引所有页面
- 社交媒体分享时展示完整标题、描述和图片
- `robots.txt` 指向完整 sitemap URL，搜索引擎可自动发现

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
