import { expect, test } from "bun:test";
import { strFromU8, unzipSync } from "fflate";
import { GET } from "../app/starter.zip/route";
import { installPrompt } from "./install-prompt";

test("team prompt provides design system context without prescribing app setup", () => {
  const prompt = installPrompt("http://localhost:4324");
  expect(prompt).toContain("http://localhost:4324/design.md");
  expect(prompt).toContain("existing tooling and conventions");
  expect(prompt).not.toContain("Bun");
  expect(prompt).not.toContain("starter.zip");
  expect(prompt).not.toContain("Build one working screen");
});
test("starter download contains an executable setup, theme and agent skill", async () => {
  const response = GET(new Request("http://localhost:4324/starter.zip"));
  expect(response.status).toBe(200);
  const files = unzipSync(new Uint8Array(await response.arrayBuffer()));
  expect(files["crafter-registry/theme.json"]).toBeDefined();
  expect(strFromU8(files["crafter-registry/scripts/create-app.ts"])).toContain(
    "Destination already exists",
  );
  expect(
    strFromU8(files["crafter-registry/.agents/skills/crafter-ui/SKILL.md"]),
  ).toContain("http://localhost:4324/starter.zip");
  const registry = JSON.parse(
    strFromU8(files["crafter-registry/registry.json"]),
  );
  expect(registry.items).toHaveLength(78);
  const design = strFromU8(files["crafter-registry/DESIGN.md"]);
  expect(design).toContain("Design with Crafter UI");
  expect(design).toContain("http://localhost:4324/components");
  expect(design).toBe(strFromU8(files["crafter-registry/public/design.md"]));
  expect(installPrompt("https://ui.crafter.run")).toContain(
    "https://crafter.run/design.md",
  );
});
