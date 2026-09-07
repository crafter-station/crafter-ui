import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocsShell } from "@/components/docs-shell";

const install =
  "bunx --bun shadcn@4.21.0 add http://localhost:4324/r/starter.json";
export const metadata = { title: "Introduction | Crafter UI" };
export default function Page() {
  return (
    <DocsShell>
      <article className="intro-doc">
        <div className="eyebrow">GET STARTED</div>
        <h1>
          Your foundation.
          <br />
          Your decisions.
        </h1>
        <p className="doc-lead">
          Crafter UI is a component library built on shadcn and Base UI. Explore
          the primitives, compose your own language, and take the source into
          your project.
        </p>
        <div className="doc-sections">
          <section>
            <h2>Two layers, one library</h2>
            <p>
              <strong>shadcn</strong> holds the primitives: buttons, inputs,
              cards and dialogs. <strong>Crafter</strong> holds opinionated
              compositions with focused APIs, sensible states and less repeated
              markup. Both layers share the same Crafter colors, typography and
              sharp corners used throughout this site.
            </p>
            <div className="atomic-overview">
              {[
                [
                  "01",
                  "Atoms",
                  "A focused action or control.",
                  "/components/crafter/action-button",
                ],
                [
                  "02",
                  "Molecules",
                  "Related pieces working together.",
                  "/components/crafter/text-field",
                ],
                [
                  "03",
                  "Organisms",
                  "A complete section or task.",
                  "/components/crafter/settings-card",
                ],
              ].map(([n, title, text, href]) => (
                <Link key={n} href={href}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Link>
              ))}
            </div>
            <p>
              The levels describe the component's responsibility, not a strict
              count of DOM nodes. Templates and pages come after a pattern has
              proved useful in a real product.
            </p>
          </section>
          <section>
            <h2>Install the Crafter defaults</h2>
            <p>
              Use a React 19 and Tailwind 4 project initialized with shadcn Base
              UI. Start with a clean project, or review the changes before
              replacing components you already use.
            </p>
            <CodeBlock code="bunx --bun shadcn@4.21.0 init --base base" />
            <CodeBlock code={install} />
            <p>
              The starter applies Crafter's monochrome theme and includes all 76
              shadcn and Crafter components with their dependencies. Individual
              component installs preserve your existing theme.
            </p>
          </section>
          <section>
            <h2>Build your own library</h2>
            <p>
              Choose a name, theme and components in the style generator, then
              download a ready-to-host registry. Already have components in an
              app? The local extractor follows their imports and prepares an
              installable bundle.
            </p>
            <div className="intro-actions">
              <Link href="/create">Open style generator ↗</Link>
              <Link href="/extract">Extract your components ↗</Link>
            </div>
          </section>
        </div>
      </article>
    </DocsShell>
  );
}
