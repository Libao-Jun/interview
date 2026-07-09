import { siteConfig } from "./seo";

// 不需要手动拼接 basePath，Next.js 的 next.config.mjs 中 basePath 配置
// 会自动为所有路由添加前缀，手动拼接会导致路径重复（如 /interview/interview/docs）
export const docsRoute = `/docs`;
export const docsImageRoute = `/og/docs`;

export const gitConfig = {
  user: "libao-jun",
  repo: "interview",
  branch: "main",
};

/** @deprecated 使用 siteConfig.name（来自 @/lib/seo） */
export const appName = siteConfig.name;
