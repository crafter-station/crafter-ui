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
          Tune the real catalog through WebMCP. The Customize panel and your
          agent edit the same theme.
        </p>
        <div className="doc-sections">
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
              Unzip it and run bun scripts/create-app.ts with a new app path.
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
            <h2>Install the skill</h2>
            <p>
              The repository includes .agents/skills/crafter-ui/SKILL.md. Add it
              to your agent’s project skills. Every generated library includes
              its own named skill, token source and agent guide.
            </p>
            <a className="doc-text-link" href="/skill.md">
              Read SKILL.md ↗
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
