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
foundations.push(
  ...[
    {
      name: "accordion",
      title: "Accordion",
      description:
        "Accordion with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Accordion"],
    },
    {
      name: "alert",
      title: "Alert",
      description:
        "Alert with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Alert"],
    },
    {
      name: "alert-dialog",
      title: "Alert Dialog",
      description:
        "Alert Dialog with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Alert Dialog"],
    },
    {
      name: "aspect-ratio",
      title: "Aspect Ratio",
      description:
        "Aspect Ratio with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Aspect Ratio"],
    },
    {
      name: "attachment",
      title: "Attachment",
      description:
        "Attachment with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Attachment"],
    },
    {
      name: "avatar",
      title: "Avatar",
      description:
        "Avatar with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Avatar"],
    },
    {
      name: "breadcrumb",
      title: "Breadcrumb",
      description:
        "Breadcrumb with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Breadcrumb"],
    },
    {
      name: "bubble",
      title: "Bubble",
      description:
        "Bubble with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Bubble"],
    },
    {
      name: "button-group",
      title: "Button Group",
      description:
        "Button Group with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Button Group"],
    },
    {
      name: "calendar",
      title: "Calendar",
      description:
        "Calendar with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Calendar"],
    },
    {
      name: "carousel",
      title: "Carousel",
      description:
        "Carousel with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Carousel"],
    },
    {
      name: "chart",
      title: "Chart",
      description:
        "Chart with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Chart"],
    },
    {
      name: "checkbox",
      title: "Checkbox",
      description:
        "Checkbox with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Checkbox"],
    },
    {
      name: "collapsible",
      title: "Collapsible",
      description:
        "Collapsible with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Collapsible"],
    },
    {
      name: "combobox",
      title: "Combobox",
      description:
        "Combobox with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Combobox"],
    },
    {
      name: "command",
      title: "Command",
      description:
        "Command with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Command"],
    },
    {
      name: "context-menu",
      title: "Context Menu",
      description:
        "Context Menu with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Context Menu"],
    },
    {
      name: "data-table",
      title: "Data Table",
      description:
        "Data Table with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Data Table"],
    },
    {
      name: "date-picker",
      title: "Date Picker",
      description:
        "Date Picker with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Date Picker"],
    },
    {
      name: "direction",
      title: "Direction",
      description:
        "Direction with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Direction"],
    },
    {
      name: "drawer",
      title: "Drawer",
      description:
        "Drawer with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Drawer"],
    },
    {
      name: "dropdown-menu",
      title: "Dropdown Menu",
      description:
        "Dropdown Menu with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Dropdown Menu"],
    },
    {
      name: "empty",
      title: "Empty",
      description:
        "Empty with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Empty"],
    },
    {
      name: "field",
      title: "Field",
      description:
        "Field with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Field"],
    },
    {
      name: "hover-card",
      title: "Hover Card",
      description:
        "Hover Card with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Hover Card"],
    },
    {
      name: "input-group",
      title: "Input Group",
      description:
        "Input Group with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Input Group"],
    },
    {
      name: "input-otp",
      title: "Input OTP",
      description:
        "Input OTP with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Input OTP"],
    },
    {
      name: "item",
      title: "Item",
      description:
        "Item with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Item"],
    },
    {
      name: "kbd",
      title: "Kbd",
      description:
        "Kbd with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Kbd"],
    },
    {
      name: "label",
      title: "Label",
      description:
        "Label with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Label"],
    },
    {
      name: "marker",
      title: "Marker",
      description:
        "Marker with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Marker"],
    },
    {
      name: "menubar",
      title: "Menubar",
      description:
        "Menubar with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Menubar"],
    },
    {
      name: "message",
      title: "Message",
      description:
        "Message with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Message"],
    },
    {
      name: "message-scroller",
      title: "Message Scroller",
      description:
        "Message Scroller with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Message Scroller"],
    },
    {
      name: "native-select",
      title: "Native Select",
      description:
        "Native Select with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Native Select"],
    },
    {
      name: "navigation-menu",
      title: "Navigation Menu",
      description:
        "Navigation Menu with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Navigation Menu"],
    },
    {
      name: "pagination",
      title: "Pagination",
      description:
        "Pagination with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Pagination"],
    },
    {
      name: "popover",
      title: "Popover",
      description:
        "Popover with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Popover"],
    },
    {
      name: "progress",
      title: "Progress",
      description:
        "Progress with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Progress"],
    },
    {
      name: "questionnaire",
      title: "Questionnaire",
      description:
        "Questionnaire with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Questionnaire"],
    },
    {
      name: "radio-group",
      title: "Radio Group",
      description:
        "Radio Group with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Radio Group"],
    },
    {
      name: "resizable",
      title: "Resizable",
      description:
        "Resizable with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Resizable"],
    },
    {
      name: "scroll-area",
      title: "Scroll Area",
      description:
        "Scroll Area with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Scroll Area"],
    },
    {
      name: "select",
      title: "Select",
      description:
        "Select with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Select"],
    },
    {
      name: "sheet",
      title: "Sheet",
      description:
        "Sheet with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Sheet"],
    },
    {
      name: "sidebar",
      title: "Sidebar",
      description:
        "Sidebar with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Sidebar"],
    },
    {
      name: "skeleton",
      title: "Skeleton",
      description:
        "Skeleton with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Skeleton"],
    },
    {
      name: "slider",
      title: "Slider",
      description:
        "Slider with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Slider"],
    },
    {
      name: "switch",
      title: "Switch",
      description:
        "Switch with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Switch"],
    },
    {
      name: "table",
      title: "Table",
      description:
        "Table with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Table"],
    },
    {
      name: "tabs",
      title: "Tabs",
      description:
        "Tabs with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Tabs"],
    },
    {
      name: "textarea",
      title: "Textarea",
      description:
        "Textarea with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Textarea"],
    },
    {
      name: "toast",
      title: "Toast",
      description:
        "Toast with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Toast"],
    },
    {
      name: "toggle",
      title: "Toggle",
      description:
        "Toggle with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Toggle"],
    },
    {
      name: "toggle-group",
      title: "Toggle Group",
      description:
        "Toggle Group with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Toggle Group"],
    },
    {
      name: "tooltip",
      title: "Tooltip",
      description:
        "Tooltip with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Tooltip"],
    },
    {
      name: "typography",
      title: "Typography",
      description:
        "Typography with Crafter styling. Explore the live example and use the source in your project.",
      usage: "",
      parts: ["Typography"],
    },
  ],
);
foundations.sort((a, b) => a.title.localeCompare(b.title));
const anatomy: Record<
  ComponentName,
  { level: DocumentationEntry["level"]; parts: string[] }
> = {
  "status-indicator": { level: "Atoms", parts: ["Badge"] },
  "keyboard-shortcut": { level: "Atoms", parts: ["Kbd"] },
  "search-field": { level: "Molecules", parts: ["Input group"] },
  "member-item": { level: "Molecules", parts: ["Avatar", "Badge"] },
  "project-card": {
    level: "Organisms",
    parts: ["Card", "Status indicator", "Progress", "Button"],
  },
  "notification-preferences": {
    level: "Organisms",
    parts: ["Card", "Field", "Switch", "Action button"],
  },
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
