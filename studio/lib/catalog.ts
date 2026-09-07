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
  {
    name: "status-indicator",
    title: "Status indicator",
    category: "Atoms",
    description: "Compact presence with a readable status label.",
    usage: '<StatusIndicator status="online" />',
    roots: ["status-indicator"],
  },
  {
    name: "keyboard-shortcut",
    title: "Keyboard shortcut",
    category: "Atoms",
    description: "A readable keyboard command with consistent keycaps.",
    usage: '<KeyboardShortcut keys={["\u2318", "K"]} label="Search" />',
    roots: ["keyboard-shortcut"],
  },
  {
    name: "search-field",
    title: "Search field",
    category: "Molecules",
    description: "A controlled search input with an accessible clear action.",
    usage: "<SearchField value={query} onValueChange={setQuery} />",
    roots: ["search-field"],
  },
  {
    name: "member-item",
    title: "Member item",
    category: "Molecules",
    description: "Identity, contact and role in one compact row.",
    usage:
      '<MemberItem name="Alex Rivera" email="alex@example.com" memberRole="Owner" />',
    roots: ["member-item"],
  },
  {
    name: "project-card",
    title: "Project card",
    category: "Organisms",
    description: "Project status, progress and a clear next action.",
    usage:
      '<ProjectCard name="Crafter UI" description="Your component library" onOpen={openProject} />',
    roots: ["project-card"],
  },
  {
    name: "notification-preferences",
    title: "Notification preferences",
    category: "Organisms",
    description: "Notification controls with async save and error feedback.",
    usage: "<NotificationPreferences onSave={savePreferences} />",
    roots: ["notification-preferences"],
  },
] as const;

export type ComponentName = (typeof catalog)[number]["name"];
export const componentNames = catalog.map((item) => item.name);
