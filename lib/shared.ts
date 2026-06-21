export const appName = "前端面试知识库";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repoName = repository.split("/")[1] ?? "";
const basePath =
  isGitHubPages && repoName && !repoName.endsWith(".github.io")
    ? `/${repoName}`
    : "";

export const docsRoute = `${basePath}/docs`;
export const docsImageRoute = `${basePath}/og/docs`;

export const gitConfig = {
  user: "libao-jun",
  repo: "interview",
  branch: "main",
};
