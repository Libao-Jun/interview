import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const pages = source.getPages();

  // 文档页面
  const docsEntries: MetadataRoute.Sitemap = pages.map((page) => {
    // page.url 例如 /docs/fundamentals/html
    // trailingSlash 模式下确保以 / 结尾
    const url = page.url.endsWith("/") ? page.url : `${page.url}/`;
    const lastModified = page.data.updatedAt
      ? new Date(page.data.updatedAt)
      : new Date();

    return {
      url: `${siteUrl}${url}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  // 首页
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: `${siteUrl}/`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  };

  return [homeEntry, ...docsEntries];
}
