"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { CrafterMark } from "@/components/crafter-mark";
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
          <CrafterMark size={26} />
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
      <CommandPaletteTrigger className="ml-auto w-[220px] max-sm:hidden" />
      <CommandPaletteTrigger className="ml-auto sm:hidden" compact />
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
