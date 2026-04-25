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
- `content/docs`：文档内容目录，新增 Markdown/MDX 文档后会自动进入文档路由与搜索索引
- `lib/source.ts`：Fumadocs 内容源加载入口
- `source.config.ts`：MDX 集合和内容处理配置

## 分支介绍

- main: 生产分支，稳定可靠。
- dev: 开发分支
- feature: 新功能分支

## 写文档

在 `content/docs` 下新增 `.md` 或 `.mdx` 文件即可，首页文档示例已经生成。

- 新增文档被 Fumadocs 正常识别后，会自动进入页面路由和搜索索引，不需要额外配置搜索。
- 文档标题、描述、正文标题和正文内容会自动参与搜索。
- 如果你新增的是目录分组、修改了侧边栏显示名称，或者希望分组名本身也能被搜索命中，需要同步维护对应目录下的 `meta.json`。

## GitHub Pages 发布

- 已添加 GitHub Actions 工作流，推送到 `main` 分支后会自动执行静态构建并发布到 GitHub Pages。
- 报错: `github-pages` Value 'github-pages' is not valid
  - 解决方案：去 GitHub 仓库设置里创建或同步一个名为 github-pages 的 Environment。
  > 路径是 Settings → Environments → New environment → github-pages。

## 参考资料

- <https://fumadocs.dev/docs>
- <https://fumadocs.dev/docs/mdx>
- <https://nextjs.org/docs>
