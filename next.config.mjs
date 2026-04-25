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
  ...(isGitHubPages
    ? {
        output: "export",
        trailingSlash: true,
        assetPrefix: basePath || undefined,
        basePath: basePath || undefined,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default withMDX(config);
