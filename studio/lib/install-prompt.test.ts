import { expect, test } from "bun:test";
import { strFromU8, unzipSync } from "fflate";
import { GET } from "../app/starter.zip/route";
import { installPrompt } from "./install-prompt";

test("team prompt discovers the current host and protects existing projects", () => {
  const prompt = installPrompt("http://localhost:4324");
  expect(prompt).toContain("http://localhost:4324/skill.md");
  expect(prompt).toContain("Preserve unrelated changes");
  expect(prompt).toContain("Do not deploy");
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
});
