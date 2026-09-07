import { describe, expect, test } from "bun:test";
import { type CodeLanguage, highlightCode } from "./syntax";

describe("Crafter syntax", () => {
  const samples: [CodeLanguage, string][] = [
    [
      "tsx",
      'export function Card() {\n  return <div title="<script>">{42}</div>;\n}\n',
    ],
    ["bash", "agent-browser webmcp invoke get_theme --params '{}'\n"],
    ["json", '{\r\n  "primary": "#121212"\r\n}\r\n'],
    ["css", ":root {\n  --radius: 0.25rem;\n}\n"],
    ["tsx", ""],
  ];
  for (const [language, source] of samples) {
    test(`preserves ${language} source and line endings ${source.length}`, async () => {
      const tokens = await highlightCode(source, language);
      expect(tokens.map((token) => token.content).join("")).toBe(source);
      expect(new Set(tokens.map((token) => token.offset)).size).toBe(
        tokens.length,
      );
    });
  }
  test("classifies grammar into theme tokens", async () => {
    const tokens = await highlightCode(
      '// greeting\nconst value = "hello";\nconst count = 42;',
      "tsx",
    );
    for (const kind of ["comment", "keyword", "string", "number"]) {
      expect(tokens.some((token) => token.kind === kind)).toBe(true);
    }
  });
});
