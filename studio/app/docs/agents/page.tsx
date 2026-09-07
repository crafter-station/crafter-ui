import { CodeBlock } from "@/components/code-block";
import { DocsShell } from "@/components/docs-shell";
export const metadata = { title: "For agents | Crafter UI" };
const discover =
  "agent-browser --session crafter-theme open http://localhost:4324\nagent-browser --session crafter-theme webmcp list\nagent-browser --session crafter-theme webmcp invoke get_theme --params '{}'";
export default function Page() {
  return (
    <DocsShell>
      <article className="intro-doc">
        <div className="eyebrow">FOR AGENTS</div>
        <h1>
          Your agent.
          <br />
          Your design system.
        </h1>
        <p className="doc-lead">
          Use Crafter UI consistently across your team’s projects. Create a
          separate design system when you want your own defaults.
        </p>
        <div className="doc-sections">
          <section>
            <h2>Use Crafter UI with your team</h2>
            <p>
              Click “Use in my project” on the homepage and paste the prompt
              into your agent. The design guide provides component and token
              guidance for future UI work, using your project’s existing tools.
              No starter download or new application is required.
            </p>
            <p>
              Keep the shared Crafter tokens and components consistent across
              projects. Contribute reusable improvements through the Crafter UI
              repository; keep product-specific compositions in your app.
            </p>
          </section>
          <section>
            <h2>Connect</h2>
            <p>
              Use agent-browser 0.36 or newer with its compatible Chrome. WebMCP
              is experimental. Open this catalog in the agent’s browser session;
              it does not automatically attach to another browser tab.
            </p>
            <CodeBlock code={discover} />
            <p>
              For a hosted catalog, replace the localhost URL with its address.
              Unsupported browsers keep the visual editor available.
            </p>
          </section>
          <section>
            <h2>Read, tune, verify</h2>
            <p>
              get_theme returns light/dark tokens and the current revision.
              patch_theme takes expectedRevision, mode and a tokens object. It
              validates the whole change before applying it and returns a diff.
              reset_theme restores the baseline or a previous revision.
            </p>
            <p>
              Code highlighting uses the same theme: edit syntax-* tokens for
              each mode in Customize or through patch_theme.
            </p>
            <p>
              Try: “Make the inputs softer, keep the monochrome palette, and
              check the result on mobile.” The agent should inspect screenshots
              and keyboard focus after editing.
            </p>
          </section>
          <section>
            <h2>Create a library</h2>
            <p>
              On /create, get_library returns the draft and all 76 available
              components. configure_library updates identity and selection using
              expectedRevision. export_library returns a manifest and
              exportRequest; POST that request to download the ZIP. Use
              includeFiles: true only when you need source contents in context.
              The export is your own design-system registry. Its optional
              create-app.ts helper can scaffold a new demo using Bun; adopting
              the design system in an existing app does not require it.
            </p>
            <p>
              Save library downloads one file containing identity, selection and
              both themes. Import library restores it in another session. Agents
              use save_library and import_library for the same round trip. Valid
              changes also persist in this browser.
            </p>
          </section>
          <section>
            <h2>Keep your changes</h2>
            <p>
              Edits are saved in this browser. export_theme returns theme.json
              and theme.css; it does not write files. Save theme.json in the
              repository to make it the baseline. Verify in a fresh session to
              prove the file, rather than a cached draft, supplies the theme.
            </p>
            <p>
              Exported registries also include theme.json. Run bun run build
              after editing it to synchronize their registry tokens.
            </p>
          </section>
          <section>
            <h2>Two guides, two workflows</h2>
            <p>
              Read DESIGN.md for product UI patterns: composition, spacing,
              typography, states and component usage. Use SKILL.md when creating
              or maintaining your own library. Every export includes its own
              DESIGN.md, named skill and token source.
            </p>
            <a className="doc-text-link" href="/design.md">
              Use Crafter: DESIGN.md ↗
            </a>
            <br />
            <a className="doc-text-link" href="/skill.md">
              Create your own: SKILL.md ↗
            </a>
          </section>
          <section>
            <h2>Token vocabulary</h2>
            <p>
              Colors use semantic pairs such as primary and primary-foreground.
              radius controls corners; font-sans sets typography; control-height
              adjusts supported input and button density. Light and dark are
              edited independently. All changes have revision checks and the
              last 20 snapshots are available for undo.
            </p>
          </section>
        </div>
      </article>
    </DocsShell>
  );
}
