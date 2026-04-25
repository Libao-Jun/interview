import { createFromSource } from "fumadocs-core/search/server";
import { buildSearchIndex } from "@/lib/search.server";
import { createMixedLanguageTokenizer } from "@/lib/search.shared";
import { source } from "@/lib/source";

export const dynamic = "force-static";
const searchApi = createFromSource(source, {
  tokenizer: createMixedLanguageTokenizer(),
  buildIndex: buildSearchIndex,
});

export async function GET() {
  return searchApi.staticGET();
}
