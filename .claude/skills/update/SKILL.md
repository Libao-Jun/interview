---
name: update
description: 修改已有功能或模块的完整工作流。当用户提到修改、修复、更新、重构、调整、优化已有代码/文档/配置时触发此 skill。涵盖：定位修改 → 同步关联 → CHANGELOG 记录 → 构建验证 → Git 规范提交，含四个常见场景速查。
---

# 修改已有功能 / 模块

> 从定位到提交的端到端工作流。每一步都确保修改不引入回归、不遗漏关联、可被追溯。

---

## 1. 定位目标文件

**先 Read 确认现状，再 Edit 精确替换**——跳过阅读直接修改是引入 bug 的最快方式。涉及多个文件时，优先将定义收敛到 `lib/seo.ts` 或 `lib/shared.ts` 等单一配置源——分散的定义天然制造不一致。

### 改动类型 → 文件范围

| 改动类型 | 涉及范围 |
| --- | --- |
| 文档内容 | `content/docs/**/*.mdx` |
| 导读索引 | `content/docs/**/index.mdx` |
| 组件 / UI | `components/**/*.tsx`、`app/**/*.tsx` |
| 项目配置 | `next.config.mjs`、`package.json`、`tsconfig.json` |
| 工具 / 常量 | `lib/**/*.ts` |
| SEO / 元数据 | `lib/seo.ts`、`lib/home.ts`、`app/layout.tsx` |

---

## 2. 同步关联文件

**修改不是孤立事件**——一个文件变更可能让其他文件的描述、引用或配置变成谎言。

### 关联矩阵

| 修改了 | 同时检查 |
| --- | --- |
| `lib/seo.ts` | `app/layout.tsx`、`lib/home.ts`、`app/(home)/page.tsx` 中的 `siteConfig` 引用 |
| `lib/home.ts` | `app/(home)/page.tsx` 中的 `home*` 导入 |
| `components/*.tsx` | 所有 `app/` 页面中对该组件的引用 |
| `content/docs/xxx/index.mdx` | `content/docs/index.mdx` 中对应的内容地图描述 |
| `content/docs/xxx/<page>.mdx` | `content/docs/xxx/index.mdx` 中对该页面的描述行 |
| `content/docs/index.mdx` | 快速入口 Cards 和推荐阅读路径 |

### 同步原则

- 章节标题或描述变更 → 所有引用该章节的导读同步更新
- 配置文件值变更 → 搜索项目中对该值的旧引用并替换
- 组件接口变更 → 遍历所有使用方确认兼容

---

## 3. 记录 CHANGELOG

**没有记录的改动等于没有发生**——未来的维护者（包括你自己）依赖 CHANGELOG 理解项目演进。

### 选择正确分类

| 改动性质 | CHANGELOG 分类 |
| --- | --- |
| 修复 bug、错误链接、错误描述 | `### 修复` |
| 重构结构、调整分组、优化表达 | `### 修改` |
| 新增组件、新增配置项 | `### 新增` |
| 删除废弃内容 | `### 移除`（不存在则新建） |

### 当日 vs 跨日

- **当日**：追加到当前版本条目对应的分类表格
- **跨日**：新建 `## [YYYY-MM-DD vX.Y.Z]` 版本条目

### 版本号增量

| 改动级别 | semver | 示例提交信息 |
| --- | --- | --- |
| 修复 bug、改错字、补链接 | **PATCH** (v1.3.1 → v1.3.2) | `fix( docs ): 修正 xxx` |
| 重构、内容更新、小功能 | **MINOR** (v1.3.1 → v1.4.0) | `refactor( docs ): 重构 xxx` |
| 架构级不兼容变更 | **MAJOR** | 极少使用 |

---

## 4. 构建验证

改动后**必须在本地验证构建通过**——CI 上的失败意味着部署回滚和额外的时间成本。

```bash
pnpm build
```

一比一模拟 GitHub Actions 环境：

```bash
rm -rf .next out && GITHUB_PAGES=true GITHUB_REPOSITORY="Libao-Jun/interview" npx next build
```

### 验证点

- TypeScript 类型检查零错误
- 路由表正常，页面数量无意外增减
- `public/` 静态资源正确导出到 `out/`

---

## 5. Git 提交

核心改动与配套更新**必须拆分提交**——`fix: 修正闭包示例` 比 `fix: 修改一堆东西` 在 `git log` 中有价值一百倍。

### 提交拆分

```bash
# 核心改动
git add <主要改动的文件>
git commit -m "fix: 修正 xxx 问题"

# 配套更新
git add content/docs/index.mdx CHANGELOG.md
git commit -m "chore( docs ): 导读同步 + 更新 CHANGELOG"
```

### 前缀约定

| 前缀 | 场景 |
| --- | --- |
| `fix:` | 修复 bug、错误链接、错误描述 |
| `refactor:` | 重构已有代码/文档结构 |
| `chore:` | 配置、依赖、CHANGELOG 维护 |
| `style:` | 格式调整，不影响逻辑 |
| `perf:` | 性能优化 |
| `docs:` | 仅文档内容变更 |

Commit 末尾追加：`Co-Authored-By: Claude <noreply@anthropic.com>`

---

## 场景速查

### 修文档错字 / 错误描述

```
修改 .mdx → CHANGELOG「修复」→ pnpm build → git commit -m "fix( docs ): 修正 xxx"
```

### 重构导读 / 调整分组

```
修改 index.mdx → 检查总览同步 → CHANGELOG「修改」→ pnpm build → git commit -m "refactor( docs ): 重构 xxx"
```

### 更新项目配置

```
修改配置 → 检查旧值引用 → CHANGELOG「修改」→ pnpm build → git commit -m "chore: 更新 xxx"
```

### 修改组件或 UI

```
修改组件 → 遍历引用方 → CHANGELOG → pnpm build + pnpm dev 肉眼确认 → git commit -m "fix: 修复 xxx 组件"
```

---

## 检查清单

- [ ] 文件已 Read 后 Edit，风格与周围代码一致
- [ ] 关联文件已同步（导读、引用方、配置源）
- [ ] `CHANGELOG.md` 已追加到正确分类
- [ ] `pnpm build` 零错误通过
- [ ] 核心改动与配套更新已拆分提交
