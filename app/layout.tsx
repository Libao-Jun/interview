import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import Search from "@/components/search";
import ThemeProvider from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
});

function getMetadataBase() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (siteUrl) {
    return new URL(siteUrl);
  }

  const repository = process.env.GITHUB_REPOSITORY ?? "";
  const [owner, repo] = repository.split("/");

  if (process.env.GITHUB_PAGES === "true" && owner && repo) {
    const pageUrl = repo.endsWith(".github.io")
      ? `https://${repo}`
      : `https://${owner}.github.io/${repo}`;

    return new URL(pageUrl);
  }

  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
};

const themeInitScript = `try {
  const storageKey = "theme";
  const storedTheme = localStorage.getItem(storageKey) || "system";
  const resolvedTheme = storedTheme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : storedTheme;

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.style.colorScheme = resolvedTheme;
} catch {
  document.documentElement.classList.remove("dark");
  document.documentElement.style.colorScheme = "light";
}`;

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <RootProvider
            theme={{ enabled: false }}
            search={{ SearchDialog: Search }}
            i18n={{
              translations: {
                toc: "本页内容",
              },
            }}
          >
            {children}
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
