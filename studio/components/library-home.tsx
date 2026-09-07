"use client";

import { ArrowRight, ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { ComponentPreview } from "@/components/component-preview";
import { FoundationPreview } from "@/components/foundation-preview";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";

export function LibraryHome() {
  return (
    <div className="site-shell library-home">
      <SiteHeader />
      <main id="main">
        <section className="library-hero">
          <Link
            className="release-label"
            href="/components/crafter/settings-card"
          >
            <span className="status-dot" /> THE CRAFTER COMPONENT LIBRARY{" "}
            <ArrowRight size={13} />
          </Link>
          <h1>
            A foundation.
            <br />
            Your own language.
          </h1>
          <p>
            Composable primitives. Thoughtful defaults. Components that grow
            from a single action into the interfaces you ship.
          </p>
          <div className="home-actions">
            <Link className="primary-link" href="/docs">
              Get started <ArrowRight size={16} />
            </Link>
            <Link className="home-secondary" href="/components">
              Browse components <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="home-lineage">
            <span>shadcn/ui</span>
            <span>→</span>
            <span>Crafter components</span>
            <span>→</span>
            <span>Your product</span>
          </div>
        </section>
        <div className="section-divider">
          <span>THE PIECES, IN PRACTICE</span>
          <span>INTERACTIVE EXAMPLES / SOURCE INCLUDED</span>
        </div>
        <section aria-label="Component showcase" className="home-showcase">
          <article className="showcase-card">
            <div className="showcase-label">
              <span>01 / FOUNDATION</span>
              <Badge variant="outline">shadcn</Badge>
            </div>
            <div className="showcase-controls">
              <FoundationPreview name="button" />
              <FoundationPreview name="input" />
              <FoundationPreview name="badge" />
            </div>
            <Link className="showcase-caption" href="/components/shadcn/button">
              <span>Start with the primitives</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
          <article className="showcase-card showcase-settings">
            <div className="showcase-label">
              <span>02 / ORGANISM</span>
              <Badge variant="outline">Crafter</Badge>
            </div>
            <div className="showcase-example">
              <ComponentPreview name="settings-card" />
            </div>
            <Link
              className="showcase-caption"
              href="/components/crafter/settings-card"
            >
              <span>A complete settings flow</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
          <article className="showcase-card">
            <div className="showcase-label">
              <span>03 / ATOM</span>
              <Badge variant="outline">Crafter</Badge>
            </div>
            <div className="showcase-action">
              <Layers3 size={34} strokeWidth={1} />
              <h2>
                One action.
                <br />
                Every state.
              </h2>
              <p>
                Pending, disabled and done. The little details belong in the
                component.
              </p>
              <ComponentPreview name="action-button" />
            </div>
            <Link
              className="showcase-caption"
              href="/components/crafter/action-button"
            >
              <span>Meet the action button</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
          <article className="showcase-card">
            <div className="showcase-label">
              <span>04 / MOLECULE</span>
              <Badge variant="outline">Crafter</Badge>
            </div>
            <div className="showcase-example">
              <ComponentPreview name="text-field" />
            </div>
            <Link
              className="showcase-caption"
              href="/components/crafter/text-field"
            >
              <span>Give your fields context</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
          <article className="showcase-card">
            <div className="showcase-label">
              <span>05 / ORGANISM</span>
              <Badge variant="outline">Crafter</Badge>
            </div>
            <div className="showcase-example">
              <ComponentPreview name="empty-state" />
            </div>
            <Link
              className="showcase-caption"
              href="/components/crafter/empty-state"
            >
              <span>Make the next step obvious</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
          <article className="showcase-card">
            <div className="showcase-label">
              <span>06 / MOLECULE</span>
              <Badge variant="outline">Crafter</Badge>
            </div>
            <div className="showcase-copy">
              <h2>
                Worth repeating.
                <br />
                Without the repetition.
              </h2>
              <ComponentPreview name="copy-button" />
              <p>
                Real clipboard feedback, with an honest error state when copying
                fails.
              </p>
            </div>
            <Link
              className="showcase-caption"
              href="/components/crafter/copy-button"
            >
              <span>Copy, with confidence</span>
              <ArrowUpRight size={16} />
            </Link>
          </article>
        </section>
        <section className="home-create">
          <div>
            <div className="eyebrow">MAKE IT YOURS</div>
            <h2>
              Your components.
              <br />
              Your defaults. Every time.
            </h2>
            <p>
              Pick your pieces and take a personal registry into your next
              project.
            </p>
          </div>
          <Link href="/create" className="primary-link">
            Create your library <ArrowRight size={16} />
          </Link>
        </section>
        <footer className="site-footer">
          <a href="https://crafter.run">Made at Crafter Station ↗</a>
          <span>Keep the source. Make it yours.</span>
          <Link href="/docs">Documentation ↗</Link>
        </footer>
      </main>
    </div>
  );
}
