"use client";
import { useEffect, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import type { CodeLanguage, highlightCode } from "@/lib/syntax";

type Tokens = Awaited<ReturnType<typeof highlightCode>>;
export function CodeBlock({
  code,
  language = "bash",
}: {
  code: string;
  language?: CodeLanguage;
}) {
  const [highlight, setHighlight] = useState<{
    code: string;
    tokens: Tokens;
  } | null>(null);
  useEffect(() => {
    let active = true;
    void import("@/lib/syntax")
      .then((module) => module.highlightCode(code, language))
      .then((tokens) => {
        if (active) setHighlight({ code, tokens });
      })
      .catch(() => {
        if (active) setHighlight(null);
      });
    return () => {
      active = false;
    };
  }, [code, language]);
  return (
    <div className="syntax-block">
      <div className="syntax-toolbar">
        <span>{language === "bash" ? "Terminal" : language.toUpperCase()}</span>
        <CopyButton value={code} label="Copy code" />
      </div>
      <section
        className="syntax-scroll"
        tabIndex={0}
        aria-label={`${language} code`}
      >
        <pre>
          <code>
            {highlight?.code === code
              ? highlight.tokens.map((token) => (
                  <span
                    key={token.offset}
                    data-syntax={token.kind}
                    style={{
                      color: `var(--syntax-${token.kind})`,
                      fontStyle: token.italic ? "italic" : undefined,
                    }}
                  >
                    {token.content}
                  </span>
                ))
              : code}
          </code>
        </pre>
      </section>
    </div>
  );
}
