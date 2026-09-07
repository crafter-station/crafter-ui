export function installPrompt(origin: string) {
  return `Set up Crafter UI in this project using ${origin}/skill.md.
Read the skill and save it to .agents/skills/crafter-ui/SKILL.md.
Inspect the existing stack and components before editing. Use Bun.
For a new app, follow the skill's starter.zip setup. For an existing compatible app, install only the components this project needs and apply the Crafter semantic tokens.
Preserve unrelated changes and review existing component conflicts before replacing files. If the stack is incompatible, explain the specific mismatch before making changes.
Build one working screen using Crafter, verify its main interaction and mobile layout, and tell me how to run it locally. Do not deploy.`;
}
