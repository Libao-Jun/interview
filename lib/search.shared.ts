import { components } from "@orama/orama";

const cjkSequencePattern =
  /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+/gu;

function getCjkTokens(input: string) {
  const tokens = new Set<string>();

  for (const match of input.matchAll(cjkSequencePattern)) {
    const sequence = match[0].toLowerCase();
    const characters = Array.from(sequence);

    if (characters.length === 1) {
      tokens.add(characters[0]);
      continue;
    }

    tokens.add(sequence);

    for (let size = 2; size <= Math.min(characters.length, 4); size += 1) {
      for (let index = 0; index <= characters.length - size; index += 1) {
        tokens.add(characters.slice(index, index + size).join(""));
      }
    }
  }

  return Array.from(tokens);
}

export function createMixedLanguageTokenizer() {
  const tokenizer = components.tokenizer.createTokenizer({
    language: "english",
    stopWords: false,
  });
  const originalTokenize = tokenizer.tokenize.bind(tokenizer);

  tokenizer.tokenize = function tokenize(input, language, prop, withCache = true) {
    const baseTokens = originalTokenize(input, language, prop, withCache);

    if (typeof input !== "string") return baseTokens;
    if (prop && tokenizer.tokenizeSkipProperties.has(prop)) return baseTokens;

    const cjkTokens = getCjkTokens(input)
      .map((token) => tokenizer.normalizeToken(prop ?? "", token, withCache))
      .filter(Boolean);

    if (cjkTokens.length === 0) return baseTokens;

    return Array.from(new Set([...baseTokens, ...cjkTokens]));
  };

  return tokenizer;
}