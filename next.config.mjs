import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const basePath =
  isGitHubPages && repoName && !repoName.endsWith(".github.io")
    ? `/${repoName}`
    : "";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "@": "./",
      "collections": "./.source",
    },
  },
  experimental: {
    optimizePackageImports: [
      "@orama/orama",
      "fumadocs-ui",
      "fumadocs-core",
      "lucide-react",
    ],
  },
  ...(isGitHubPages
    ? {
        output: "export",
        assetPrefix: basePath || undefined,
        basePath: basePath || undefined,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default withMDX(config);
