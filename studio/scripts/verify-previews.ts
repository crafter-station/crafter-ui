import { componentHref, documentation } from "../lib/documentation";

const session = "crafter-runtime";
async function browser(...args: string[]) {
  const process = Bun.spawn(["agent-browser", "--session", session, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const output = await new Response(process.stdout).text();
  const error = await new Response(process.stderr).text();
  if (await process.exited)
    throw new Error(`${args.join(" ")}: ${error || output}`);
  return output;
}
const results: unknown[] = [];
for (const width of [1280, 390]) {
  await browser("set", "viewport", String(width), "900");
  for (const entry of documentation) {
    const path = componentHref(entry);
    await browser("errors", "--clear");
    await browser("open", `http://localhost:4324${path}`);
    try {
      await browser(
        "wait",
        "--fn",
        'Boolean(document.querySelector(".doc-preview")?.querySelector("button,input,svg,img,[data-slot],h1,h2,h3,p,span,hr"))',
      );
      const errors = JSON.parse(await browser("errors", "--json")).data.errors;
      const layout = JSON.parse(
        JSON.parse(
          await browser(
            "eval",
            'JSON.stringify({width:innerWidth,scroll:document.documentElement.scrollWidth,heading:document.querySelector("h1")?.textContent})',
          ),
        ),
      );
      results.push({ path, width, errors, ...layout });
    } catch (error) {
      results.push({ path, width, failure: String(error) });
    }
    if (results.length % 8 === 0)
      console.log(`Checked ${results.length} previews`);
    await Bun.write(
      "evidence/maturity/preview-runtime.json",
      JSON.stringify(results, null, 2),
    );
  }
}
const failed = results.filter((entry) => {
  const r = entry as {
    failure?: string;
    errors: unknown[];
    width: number;
    scroll: number;
  };
  return r.failure || r.errors.length || r.scroll > r.width;
});
if (failed.length) {
  console.log(JSON.stringify(failed));
  process.exitCode = 1;
} else console.log(`All ${results.length} desktop/mobile previews passed.`);
