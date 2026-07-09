// ============================================================
// SEO / 站点元数据配置（整个项目唯一的一份 metadata 配置）
// ============================================================

export const siteConfig = {
  /** 站点名称（用于 <title> / og:site_name 等） */
  name: "前端面试知识库",

  /** 站点默认描述 */
  description:
    "零散面试题和项目经验整理成的知识库，围绕 HTML/CSS、JavaScript/TypeScript、Vue/React、浏览器、网络、工程化等方向组织，覆盖初级到专家级别的面试路线图。",

  /** 首页独用标题（绝对标题，不使用模板） */
  homeTitle: "前端面试知识库 — 从基础到专家的面试路线图",

  /** 首页独用描述（更偏产品向） */
  homeDescription:
    "一套围绕 HTML/CSS、JavaScript/TypeScript、Vue/React、浏览器渲染、网络链路与工程化场景展开的面试知识库。按初级→中级→高级→专家四条路线切入，把知识点映射到真实项目与追问链路。",

  /** 首页 Hero 区域的 H1 标题 */
  homeHeroTitle: "零散面试题和项目经验整理成的知识库",

  /** 首页 Hero 区域的副标题 */
  homeHeroSubtitle: "一套围绕基础知识、框架实战和工程化场景展开的面试路线图。",

  /** SEO 关键词 */
  keywords: [
    "前端面试",
    "前端开发",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "面试题",
    "知识库",
    "CSS",
    "HTML",
    "浏览器",
    "网络",
    "工程化",
    "性能优化",
  ],

  /** 作者信息 */
  author: {
    name: "libao-jun",
    url: "https://github.com/libao-jun",
  },

  /** 语区 */
  locale: "zh_CN",

  /** 站点 URL */
  url: "https://libao-jun.github.io/interview/",
};

/**
 * 获取站点完整 URL（用于 sitemap / robots / metadataBase 等）。
 * 优先从环境变量读取，其次根据 GITHUB_PAGES / GITHUB_REPOSITORY 自动推断，
 * 最后回退到 localhost。
 */
export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (siteUrl) return siteUrl;

  const repository = process.env.GITHUB_REPOSITORY ?? "";
  const [owner, repo] = repository.split("/");

  if (process.env.GITHUB_PAGES === "true" && owner && repo) {
    return repo.endsWith(".github.io")
      ? `https://${repo}`
      : `https://${owner}.github.io/${repo}`;
  }

  return "http://localhost:3000";
}
