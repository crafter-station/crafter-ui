export const catalog = [
  {
    name: "action-button",
    title: "Action button",
    category: "Actions",
    description:
      "Pending state, disabled behavior, and a clear progress label.",
    usage:
      '<ActionButton pending={saving} pendingLabel="Saving…">Save changes</ActionButton>',
    roots: ["action-button"],
  },
  {
    name: "copy-button",
    title: "Copy button",
    category: "Actions",
    description: "Clipboard feedback that only succeeds when the copy does.",
    usage: '<CopyButton value="bun run dev" />',
    roots: ["copy-button"],
  },
  {
    name: "text-field",
    title: "Text field",
    category: "Forms",
    description:
      "A label, description, and accessible validation in one place.",
    usage:
      '<TextField label="Project name" description="Visible to your team" required />',
    roots: ["text-field"],
  },
  {
    name: "empty-state",
    title: "Empty state",
    category: "Feedback",
    description: "Explain what is missing and give people a next step.",
    usage:
      '<EmptyState title="No projects yet" description="Create your first project." action={<Button>Create project</Button>} />',
    roots: ["empty-state"],
  },
  {
    name: "section-heading",
    title: "Section heading",
    category: "Layout",
    description: "Consistent page hierarchy with room for an action.",
    usage:
      '<SectionHeading title="Projects" description="Everything you are building." />',
    roots: ["section-heading"],
  },
  {
    name: "settings-card",
    title: "Settings card",
    category: "Blocks",
    description:
      "A complete settings surface with validation and async save feedback.",
    usage: '<SettingsCard name="My project" onSave={saveProject} />',
    roots: ["settings-card"],
  },
] as const;

export type ComponentName = (typeof catalog)[number]["name"];
export const componentNames = catalog.map((item) => item.name);
