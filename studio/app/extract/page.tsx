import { ArrowRight, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { CopyButton } from "@/components/ui/copy-button";

const inspect =
  "bun run extract --project ../my-app --entry src/components/card.tsx";
const build = `${inspect} --out ../my-library`;

export default function ExtractPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="extract-page">
        <div className="eyebrow">BRING YOUR OWN COMPONENTS</div>
        <h1>
          You already have
          <br />
          <span>a starting point.</span>
        </h1>
        <p className="extract-intro">
          Take a component you like from a project you own. We trace its imports
          and package it into a library you can use again.
        </p>
        <a
          href="/api/extractor"
          className="primary-link extract-download"
          download
        >
          <Download size={16} />
          Download the extractor
        </a>
        <p className="extract-note">
          Runs on your computer with Bun. Your source stays there.
        </p>
        <div className="extraction-steps">
          <section>
            <div className="step-label">
              <span>01</span> Unzip and install
            </div>
            <p>
              Open a terminal in the downloaded folder and run{" "}
              <code>bun install</code>. This installs the parser, not anything
              into your app.
            </p>
          </section>
          <section>
            <div className="step-label">
              <span>02</span> Pick your starting point
            </div>
            <p>
              Point it at your project and a component file. It lists everything
              that component needs, including local aliases, re-exports, and
              packages.
            </p>
            <div className="extract-command">
              <code>{inspect}</code>
              <CopyButton value={inspect} label="Copy inspect command" />
            </div>
            <p className="extract-note">
              Replace the project and entry paths with yours. Repeat{" "}
              <code>--entry</code> to select more components.
            </p>
          </section>
          <section>
            <div className="step-label">
              <span>03</span> Make it portable
            </div>
            <p>
              When the report has no unresolved issues, add an empty output
              directory. You get source code, a shadcn registry, and exact
              installation instructions.
            </p>
            <div className="extract-command">
              <code>{build}</code>
              <CopyButton value={build} label="Copy extraction command" />
            </div>
          </section>
          <section>
            <div className="step-label">
              <span>04</span> Use it somewhere new
            </div>
            <p>
              Install the generated registry into a second app with the command
              in its README. Try the component there, then host your registry
              when you are happy with it.
            </p>
          </section>
        </div>
        <div className="extraction-boundary">
          <h2>Clear about what travels.</h2>
          <p>
            TypeScript, JavaScript, local imports, re-exports, JSON, and SVG
            source are supported. Stylesheets, binary assets, computed imports,
            and server dependencies are reported for review. Global styles and
            providers still need a decision from you.
          </p>
          <p>
            The extractor resolves the code graph. Testing it in another app
            tells you whether the component is truly ready to reuse.
          </p>
        </div>
        <a href="/create" className="quiet-link">
          Prefer a fresh start? Make a library from our components{" "}
          <ArrowRight size={14} />
        </a>
      </main>
      <footer className="site-footer">
        <a href="https://crafter.run">Made at Crafter Station ↗</a>
        <span>Keep the source. Make it yours.</span>
      </footer>
    </div>
  );
}
