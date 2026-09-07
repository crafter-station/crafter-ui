import { type ComponentName, catalog } from "@/lib/catalog";

export type DocumentationEntry = {
  name: string;
  title: string;
  family: "shadcn" | "crafter";
  level: "Primitives" | "Atoms" | "Molecules" | "Organisms";
  description: string;
  usage: string;
  parts: string[];
};
const foundations: Omit<DocumentationEntry, "family" | "level">[] = [
  {
    name: "button",
    title: "Button",
    description:
      "The base action primitive, with variants, sizes, and keyboard interaction.",
    usage: '<Button variant="outline">Continue</Button>',
    parts: ["Base UI Button"],
  },
  {
    name: "input",
    title: "Input",
    description:
      "A native input styled with the shared theme. Pair it with a visible label.",
    usage: '<Input aria-label="Project name" placeholder="My project" />',
    parts: ["Native input"],
  },
  {
    name: "badge",
    title: "Badge",
    description: "Compact labels for status, metadata, and categories.",
    usage: '<Badge variant="secondary">In progress</Badge>',
    parts: ["Variants"],
  },
  {
    name: "card",
    title: "Card",
    description:
      "A composable surface with explicit header, content, and footer slots.",
    usage:
      "<Card>\n  <CardHeader><CardTitle>Workspace</CardTitle></CardHeader>\n  <CardContent>Your content</CardContent>\n</Card>",
    parts: ["CardHeader", "CardContent", "CardFooter"],
  },
  {
    name: "dialog",
    title: "Dialog",
    description:
      "A focused overlay with keyboard dismissal and focus restoration.",
    usage:
      "<Dialog>\n  <DialogTrigger render={<Button />}>Open</DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>A little focus</DialogTitle>\n      <DialogDescription>Make room for one decision.</DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>",
    parts: ["Base UI Dialog", "Button"],
  },
  {
    name: "separator",
    title: "Separator",
    description: "A quiet visual boundary between related sections.",
    usage: "<Separator />",
    parts: ["Base UI Separator"],
  },
  {
    name: "spinner",
    title: "Spinner",
    description: "An accessible loading indicator for an action in progress.",
    usage: "<Spinner />",
    parts: ["Lucide Loader2"],
  },
];
const anatomy: Record<
  ComponentName,
  { level: DocumentationEntry["level"]; parts: string[] }
> = {
  "action-button": { level: "Atoms", parts: ["Button", "Spinner"] },
  "copy-button": {
    level: "Molecules",
    parts: ["Button", "Clipboard feedback"],
  },
  "text-field": {
    level: "Molecules",
    parts: ["Field", "Label", "Input", "Description", "Error"],
  },
  "section-heading": {
    level: "Molecules",
    parts: ["Heading", "Description", "Action slot"],
  },
  "empty-state": {
    level: "Organisms",
    parts: ["Empty", "Icon", "Heading", "Action slot"],
  },
  "settings-card": {
    level: "Organisms",
    parts: ["Card", "Text field", "Action button", "Form feedback"],
  },
};
export const documentation: DocumentationEntry[] = [
  ...foundations.map((entry) => ({
    ...entry,
    family: "shadcn" as const,
    level: "Primitives" as const,
  })),
  ...catalog.map((entry) => ({
    ...entry,
    family: "crafter" as const,
    ...anatomy[entry.name],
  })),
];
export function componentHref(
  entry: Pick<DocumentationEntry, "family" | "name">,
) {
  return `/components/${entry.family}/${entry.name}`;
}
export const documentationGroups = [
  "Primitives",
  "Atoms",
  "Molecules",
  "Organisms",
] as const;
