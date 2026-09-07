"use client";

import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomizeButton } from "@/components/theme-workbench";

export function SiteHeader() {
  const pathname = usePathname();
  const links = [
    ["/docs", "Docs"],
    ["/components", "Components"],
    ["/create", "Styles"],
    ["/extract", "Extract"],
  ];
  return (
    <header className="site-header library-header">
      <Link href="/" className="brand" aria-label="Crafter UI home">
        <span className="brand-mark">
          <Layers3 size={16} />
        </span>
        crafter<span className="brand-suffix">/ ui</span>
      </Link>
      <nav aria-label="Main navigation">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname.startsWith(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <CustomizeButton />
      <a
        className="agent-link"
        href="https://github.com/crafter-station/crafter-ui"
      >
        Source <ArrowUpRight size={13} />
      </a>
    </header>
  );
}
