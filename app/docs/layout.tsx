import { cache } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const getPageTree = cache(() => source.getPageTree());

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={getPageTree()} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
