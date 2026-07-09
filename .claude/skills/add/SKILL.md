---
name: add
description: 新增 .mdx 文档模块的完整工作流。当用户提到新增、添加、创建文档/篇章/章节/页面时触发此 skill。涵盖：创建 .mdx 文件 → 更新导读索引 → CHANGELOG 记录 → 构建验证 → Git 规范提交。
---

# 新增文档模块

> 从创建文件到合并提交的端到端工作流。每一步都确保新增内容可被发现、可被追溯、可通过构建。

---

## 1. 创建源文件

`content/docs/` 下的**文件位置决定了它在知识库中的导航归属**——放错目录意味着用户永远找不到。

### 路径选择

| 归属 | 路径 | 示例 |
| --- | --- | --- |
| 基础知识 | `content/docs/fundamentals/<name>.mdx` | `fundamentals/webassembly.mdx` |
| 工程化 | `content/docs/engineering/<name>.mdx` | `engineering/ci-cd.mdx` |
| 独立篇章 | `content/docs/<name>.mdx` | `interview-tips.mdx` |

### Frontmatter 模板

`title` 和 `description` 是必填字段——前者控制侧边栏导航文本，后者作为 SEO 摘要和列表卡片文案：

```yaml
---
title: <页面标题>
description: <一句话描述，用于摘要和列表展示>
icon: <LucideIcon>   # 可选，如 BookOpen、Code、Rocket
---
```

### 首页置顶（可选）

需要出现在首页「最近补充」区域时追加：

```yaml
featuredOnHome: true
homeLabel: 最近补充
updatedAt: <YYYY-MM-DD>
```

---

## 2. 更新导读索引

新增的页面必须在对应的导读文件中注册入口——**导航系统不会自动发现新文件**，遗漏更新会导致"幽灵页面"（存在但不可达）。

### 影响矩阵

| 新增位置 | 必须更新的索引 |
| --- | --- |
| `fundamentals/<name>.mdx` | `fundamentals/index.mdx` + `content/docs/index.mdx` |
| `engineering/<name>.mdx` | `engineering/index.mdx` + `content/docs/index.mdx` |
| 顶层 `<name>.mdx` | `content/docs/index.mdx` |

### 更新规则

- 在对应分组表格末尾追加行：`| **[标题](/docs/path)** | 核心关注点 |`
- 全新分组方向 → 新开 `###` 子标题并补入内容地图
- 篇章数量变化 → 同步更新顶部概览中的数字
- 推荐阅读路径 → 确认是否需要新增步骤

---

## 3. 记录 CHANGELOG

**没有记录的改动等于没有发生**——未来的维护者（包括你自己）依赖 CHANGELOG 理解项目演进。

### 当日版本追加

在 `CHANGELOG.md` 顶部当前版本的 `### 新增` 表格追加：

```markdown
| `content/docs/fundamentals/new-page.mdx` | 描述新页面涵盖的核心内容 |
```

导读同步更新追加到 `### 修改`：

```markdown
| `content/docs/index.mdx` | 知识库总览同步新增 xxx 章节 |
```

### 跨日处理

日期已变更时，新建 `## [YYYY-MM-DD vX.Y.Z]` 版本条目。版本号遵循 [semver](https://semver.org/lang/zh-CN/)。

---

## 4. 构建验证

改动后**必须在本地验证构建通过**——CI 上的失败意味着部署回滚和额外的时间成本。

```bash
pnpm build
```

完整静态导出验证（一比一模拟 GitHub Actions 环境）：

```bash
rm -rf .next out && GITHUB_PAGES=true GITHUB_REPOSITORY="Libao-Jun/interview" npx next build
```

### 验证点

- 新页面出现在路由表（`/docs/<path>`）
- OG 图片路由生成正常（`/og/docs/<path>/image.png`）
- TypeScript 类型检查零错误

---

## 5. Git 提交

核心改动与配套更新**必须拆分提交**——混在一起会让 `git blame` 和 `git revert` 失去精度。

### 提交拆分

```bash
# 第一次：新增文档内容
git add content/docs/xxx.mdx
git commit -m "feat( docs ): 新增 xxx 篇章"

# 第二次：配套导读和 CHANGELOG
git add content/docs/index.mdx content/docs/xxx/index.mdx CHANGELOG.md
git commit -m "chore( docs ): 导读与内容地图同步更新"
```

### 前缀约定

| 前缀 | 场景 |
| --- | --- |
| `feat( docs ):` | 新增文档篇章 |
| `chore( docs ):` | 导读、CHANGELOG 配套更新 |

Commit 末尾追加：`Co-Authored-By: Claude <noreply@anthropic.com>`

---

## 检查清单

- [ ] `title` + `description` 已填写
- [ ] 文件位于正确的目录层级
- [ ] 对应导读 `index.mdx` 已更新
- [ ] `content/docs/index.mdx` 总览已同步
- [ ] `CHANGELOG.md` 已记录
- [ ] `pnpm build` 零错误通过
- [ ] 核心改动与配套更新已拆分提交
