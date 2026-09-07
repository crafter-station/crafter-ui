export function installPrompt(origin: string) {
  const guide =
    origin === "https://ui.crafter.run"
      ? "https://crafter.run/design.md"
      : `${origin}/design.md`;
  return `Use Crafter UI's design guidelines at ${guide} for UI work in this project. Respect its existing tooling and conventions.`;
}
