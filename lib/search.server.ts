import type { AdvancedIndex } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

type SearchPageData = {
  structuredData?:
    | AdvancedIndex["structuredData"]
    | (() =>
        | AdvancedIndex["structuredData"]
        | Promise<AdvancedIndex["structuredData"]>);
  load?: () => Promise<{ structuredData: AdvancedIndex["structuredData"] }>;
};

function extractText(value: unknown): string | undefined {
  if (typeof value === "string") {
    const text = value.trim();
    return text.length > 0 ? text : undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const text = value
      .map((item) => extractText(item))
      .filter((item): item is string => Boolean(item))
      .join(" ")
      .trim();

    return text.length > 0 ? text : undefined;
  }

  if (
    value != null &&
    typeof value === "object" &&
    "props" in value &&
    typeof value.props === "object" &&
    value.props != null &&
    "children" in value.props
  ) {
    return extractText(value.props.children);
  }

  return undefined;
}

async function getStructuredData(
  page: (typeof source)["$inferPage"],
): Promise<AdvancedIndex["structuredData"]> {
  const pageData = page.data as SearchPageData;

  if (typeof pageData.structuredData === "function") {
    return await pageData.structuredData();
  }

  if (pageData.structuredData) {
    return pageData.structuredData;
  }

  if (typeof pageData.load === "function") {
    return (await pageData.load()).structuredData;
  }

  throw new Error(`Cannot find structured data for ${page.url}`);
}

function collectSearchAliases() {
  const aliases = new Map<string, Set<string>>();
  const pagesByUrl = new Map(source.getPages().map((page) => [page.url, page]));
  const pageTree = source.getPageTree();
  const rootName = extractText(pageTree.name);
  const rootIndexPage = source.getPage([]);

  function addAlias(url: string | undefined, alias: unknown) {
    const text = extractText(alias);
    if (!url || !text) return;

    const page = pagesByUrl.get(url);
    if (page && page.data.title === text) return;

    let entries = aliases.get(url);
    if (!entries) {
      entries = new Set<string>();
      aliases.set(url, entries);
    }

    entries.add(text);
  }

  function visit(nodes: Array<{ type?: string; name?: unknown; url?: string; index?: { url: string; name?: unknown }; children?: unknown[] }>) {
    for (const node of nodes) {
      if (node.type === "page") {
        addAlias(node.url, node.name);
        continue;
      }

      if (node.type !== "folder") continue;

      if (node.index) {
        addAlias(node.index.url, node.name);
        addAlias(node.index.url, node.index.name);
      }

      if (Array.isArray(node.children)) {
        visit(node.children as Array<{ type?: string; name?: unknown; url?: string; index?: { url: string; name?: unknown }; children?: unknown[] }>);
      }
    }
  }

  addAlias(rootIndexPage?.url, rootName);
  visit(pageTree.children as Array<{ type?: string; name?: unknown; url?: string; index?: { url: string; name?: unknown }; children?: unknown[] }>);

  return aliases;
}

const searchAliases = collectSearchAliases();

export async function buildSearchIndex(page: (typeof source)["$inferPage"]): Promise<AdvancedIndex> {
  const structuredData = await getStructuredData(page);
  const aliases = Array.from(searchAliases.get(page.url) ?? []);

  return {
    id: page.url,
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    structuredData: {
      headings: structuredData.headings,
      contents: [
        ...structuredData.contents,
        ...aliases.map((content) => ({
          heading: undefined,
          content,
        })),
      ],
    },
  };
}