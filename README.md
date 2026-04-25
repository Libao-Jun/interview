# interview

当前目录已经初始化为一个基于 Next.js 的 Fumadocs 文档站。

## 启动开发环境

```bash
pnpm dev
```

默认访问地址：<http://localhost:3000/docs>

## 常用命令

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm types:check
```

## 项目结构

- `app/(home)`：站点首页和其他普通页面
- `app/docs`：Fumadocs 文档页面与布局
- `app/api/search/route.ts`：本地 Orama 搜索接口
- `content/docs`：文档内容目录，新增 Markdown/MDX 文档从这里开始
- `lib/source.ts`：Fumadocs 内容源加载入口
- `source.config.ts`：MDX 集合和内容处理配置

## 分支介绍

- main: 生产分支，稳定可靠。
- dev: 开发分支
- feature: 新功能分支

## 写文档

在 `content/docs` 下新增 `.md` 或 `.mdx` 文件即可，首页文档示例已经生成。

## AI Chat

当前模板已启用 Inkeep AI 聊天入口，环境变量位于 `.env.local`：

```env
INKEEP_API_KEY=
```

如果暂时不接入 Inkeep，可以先留空；页面仍可正常启动，但 Ask AI 功能不可用。

## GitHub Pages 发布

- 已添加 GitHub Actions 工作流，推送到 `main` 分支后会自动执行静态构建并发布到 GitHub Pages。
- Pages 构建会关闭 `Ask AI` 入口，因为 GitHub Pages 不支持当前的 `/api/chat` 服务端接口。

## 参考资料

- <https://fumadocs.dev/docs>
- <https://fumadocs.dev/docs/mdx>
- <https://nextjs.org/docs>
