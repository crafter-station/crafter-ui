"use client";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { installPrompt } from "@/lib/install-prompt";

export function UseCrafterButton() {
  const [status, setStatus] = useState("idle");
  const [prompt, setPrompt] = useState("");
  async function copy() {
    const text = installPrompt(location.origin);
    setPrompt(text);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return (
    <>
      <Button className="primary-link" onClick={copy}>
        {status === "copied" ? "Prompt copied" : "Use in my project"}
        {status === "copied" ? <Check size={16} /> : <ArrowRight size={16} />}
      </Button>
      <Link className="home-secondary" href="/components">
        Browse components <ArrowUpRight size={16} />
      </Link>
      <span className="home-action-note" role="status">
        {status === "copied"
          ? "Paste into your agent to use Crafter UI."
          : "One shared design system. For your whole team."}
      </span>
      {status === "error" && (
        <textarea
          aria-label="Crafter setup prompt"
          readOnly
          value={prompt}
          onFocus={(event) => event.target.select()}
          className="col-span-full w-full border border-input bg-background p-3 text-xs"
          rows={8}
        />
      )}
    </>
  );
}
