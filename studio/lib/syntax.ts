import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
export type CodeLanguage = "tsx" | "bash" | "json" | "css";
const palette = {
  "#111111": "text",
  "#222222": "keyword",
  "#333333": "string",
  "#444444": "function",
  "#555555": "number",
  "#666666": "comment",
  "#777777": "punctuation",
  "#888888": "type",
} as const;
let highlighter: ReturnType<typeof createHighlighterCore> | undefined;
function engine() {
  if (!highlighter)
    highlighter = createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      langs: [
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/bash.mjs"),
        import("shiki/langs/json.mjs"),
        import("shiki/langs/css.mjs"),
      ],
      themes: [
        {
          name: "crafter",
          type: "light",
          colors: {
            "editor.foreground": "#111111",
            "editor.background": "#ffffff",
          },
          tokenColors: [
            {
              scope: ["keyword", "storage"],
              settings: { foreground: "#222222" },
            },
            { scope: ["string"], settings: { foreground: "#333333" } },
            {
              scope: [
                "entity.name.function",
                "support.function",
                "entity.name.command",
              ],
              settings: { foreground: "#444444" },
            },
            {
              scope: ["constant.numeric", "constant.language"],
              settings: { foreground: "#555555" },
            },
            {
              scope: ["comment"],
              settings: { foreground: "#666666", fontStyle: "italic" },
            },
            { scope: ["punctuation"], settings: { foreground: "#777777" } },
            {
              scope: [
                "entity.name.type",
                "entity.name.tag",
                "support.type",
                "entity.other.attribute-name",
              ],
              settings: { foreground: "#888888" },
            },
          ],
        },
      ],
    });
  return highlighter;
}
export async function highlightCode(code: string, language: CodeLanguage) {
  const { tokens } = (await engine()).codeToTokens(code, {
    lang: language,
    theme: "crafter",
  });
  const separators = code.match(/\r\n|\n|\r/g) ?? [];
  let offset = 0;
  return tokens.flatMap((line, index) => {
    const output = line
      .filter((token) => token.content.length > 0)
      .map((token) => {
        const entry = {
          content: token.content,
          offset,
          kind: palette[token.color as keyof typeof palette] ?? "text",
          italic: token.fontStyle === 1,
        };
        offset += token.content.length;
        return entry;
      });
    if (index < tokens.length - 1) {
      const content = separators[index] ?? "\n";
      output.push({ content, offset, kind: "text", italic: false });
      offset += content.length;
    }
    return output;
  });
}
