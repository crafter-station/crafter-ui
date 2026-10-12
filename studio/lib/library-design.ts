export function libraryDesign(name: string, homepage: string) {
  return `# Design with ${name}

Use this guide for UI work in an existing project. Preserve its framework, tooling and product requirements. This document describes the design language; it does not ask you to scaffold an app or redesign unrelated screens.

## Start with the task

Identify what the person needs to understand or do. Make that action and its supporting information easy to find. Choose the composition before selecting components. A settings page needs clear groups and labels; an inbox needs a scannable list and readable detail; a dashboard needs meaningful comparisons.

Use the existing shell and navigation. Keep a shared alignment grid across headings, controls, content and footers. Avoid placing every paragraph inside a card. Cards group an independent object or task; spacing can group related content without adding a border.

## Hierarchy and density

Crafter's voice is warm, editorial and calm: paper surfaces, dark ink, generous reading sizes and one yellow detail. Let typography and spacing carry the hierarchy before reaching for borders, rules or color.

Use Crafter Sans Display (family "Crafter Sans", Medium 500) for headings and Crafter Sans Text (Regular 400, Medium 500, SemiBold 600, Bold 700) for body, controls and metadata. Headings stay in sentence case at weight 500 with slightly tight tracking (about -0.035em); never set display type in bold or all caps. Short headings may end with a period (Craft. Ship. Repeat.). Use monospace only for code, commands and identifiers. Installing ${homepage}/r/theme.json sets the 16/14px scale (text-sm and text-xs), a font-heading token, the heading base style and an eyebrow utility. With Crafter Sans it also imports ${homepage}/fonts/crafter-sans.css. Crafter Sans is licensed under the SIL Open Font License 1.1 with Reserved Font Name "Crafter Sans" (${homepage}/fonts/OFL.txt): any project may use and ship it; a modified version must use another name. The text cuts are still preview builds.

Default body, buttons, menus, form controls and ordinary metadata to 16px. Main descriptions use 18px with 1.6 leading; secondary copy uses 16px with 1.65 leading. 14px is the floor, reserved for compact uppercase labels and small code details. Never set text below 14px, including decorative text in SVG or canvas; reflow a crowded layout instead of shrinking it. Page titles scale around clamp(40px, 5vw, 72px) and section titles around clamp(28px, 3.2vw, 44px). Routine app screens use a compact header and restrained headings; large display type belongs to a genuine introduction.

Eyebrows and small labels use the eyebrow utility: uppercase Crafter Sans Text at 14px with 0.04em tracking, led by a 7px accent square. Numbered labels read "01 / Foundation".

Start spacing from a 4px rhythm: 4–8px within a control group, 12–16px between related fields and 24–32px between sections; editorial sections breathe at about 64px. These are composition defaults, not overrides of component tokens. Make related items closer than unrelated items.

Align controls by their actual bounds. Buttons in one action row share height, padding and baseline. Put helper text below the row rather than beneath only one button. Keep the primary action next to its title and copy; secondary actions stay quieter, and links do not need repeated arrow decorations.

Good: two aligned actions, one primary, with a shared explanation below.
Avoid: buttons of different heights, disconnected labels and a tall header that crowds the task.

## Surfaces and tokens

Use semantic tokens from the installed theme: background/foreground, card/card-foreground, muted/muted-foreground, primary/primary-foreground, secondary/secondary-foreground, accent and destructive. Pair foregrounds with their intended surface.

Crafter's baseline palette:

| Role | Light | Dark |
| --- | --- | --- |
| Canvas (background) | #F7F7F2 | #191B17 |
| Surface (card) | #EFEFE8 | #22251F |
| Ink (foreground) | #20221D | #F3F3E9 |
| Muted text | #60635A | #B3B7A8 |
| Line (border) | #CFD1C8 | #41443A |
| Primary action | #20221D | #F8E9A4 |
| Accessible accent text (ring, chart-1) | #705400 | #F4D56D |
| Station yellow (brand detail) | #FFC107 | #FFC107 |
| Station soft (brand surface) | #F8E9A4 | #F8E9A4 |

Light mode leads with ink actions on warm paper; dark mode uses soft yellow actions on deep olive ink. Yellow is a brand surface or small detail, never small text on paper; use the accent text color when text must carry the accent. Never use pure white or pure black for canvas or text. Corners are softly rounded (radius 0.375rem) and controls are comfortable (control-height 2.75rem).

In a derived library, its theme.json is authoritative for palette, radius, typography and control-height. Never reintroduce Crafter's baseline over that library's chosen tokens.

Separate content with spacing, type and soft tonal surfaces rather than repeated horizontal rules. Use one fine border to establish an input boundary. Preserve visible keyboard focus through the component's focus treatment; avoid stacking extra outlines and shadows. Use elevation for overlapping surfaces such as popovers, rather than on every container. Illustrations may keep their own editorial colors in both themes; text surfaces always follow the tokens.

To feature one item on an inverted surface (an ink card in light mode, a paper card in dark mode), swap the token set for that subtree instead of recoloring its contents: give the container the opposite theme's semantic variables and its own background/foreground, so nested buttons, badges and inputs keep readable pairs. Never place outline or ghost controls on bg-primary directly; they inherit foreground colors meant for the page and disappear.

Good: a semantic muted surface with readable secondary text.
Avoid: arbitrary gray values, cold neutral grays, low-contrast disabled-looking labels or thick double focus borders.

## Voice and copy

Write like a community of builders talking to builders: short, warm, concrete and active. Prefer plain verbs ("Explore open source", "Save changes", "Create project") over marketing adjectives. Sentence case everywhere, including buttons and headings. Keep implementation notes about caches, fallbacks or endpoints out of interface copy, and never invent numbers, dates or claims the data does not support.

## Compose the library

Discover available components and source examples at ${homepage}/llms.txt. Reuse their APIs before adding a custom implementation. The component implementation uses React 19, Tailwind 4 and shadcn Base UI; check compatibility when installing code into an existing project.

Atoms express one focused control or value: button, field, badge, status.
Molecules combine controls around a small interaction: search field, member item, project card.
Organisms complete a workflow: settings group, notification preferences, command palette, or project form.

Choose boundaries by responsibility. Do not create a new component merely to wrap one visual detail. Keep product-specific compositions in the app; contribute reusable patterns to the shared library.

Install only missing components from ${homepage}/r/<component>.json with the project's tooling. Review existing components before replacing them. The shared theme is available at ${homepage}/r/theme.json.

## Forms and actions

Use persistent labels, not placeholders as labels. Keep field descriptions beside the relevant input, and errors directly associated with the field. Explain how to correct an error. Use appropriate input types and autocomplete.

Choose explicit action labels such as “Save changes” or “Create project”. Show pending state without changing button geometry. Prevent accidental duplicate submission. Confirm completion in context and keep user input when an operation fails.

Good: a stable Save changes button with pending and success feedback.
Avoid: vague action labels, layout shifts or resetting a failed form.

## Dates and times

Show event dates and times in the venue's time zone and label it (for example "6:30 PM GMT-5, Lima time"), not in the browser's zone. Use absolute dates; drive open/closed states from absolute timestamps.

## States and accessibility

Design loading, empty, error, success and disabled states with the same care as populated screens. Empty states explain what belongs here and offer a relevant next action. Skeletons should reflect the eventual layout.

Use semantic controls, accessible names and a logical heading hierarchy. Support keyboard navigation and visible focus. Dialogs need a title, sensible initial focus and focus restoration. Never rely on color alone to communicate status.

## Light, dark and responsive behavior

Use the light and dark semantic token sets, including syntax-* tokens for code. Do not invert colors mechanically. Inspect popovers, dialogs, borders, charts, disabled controls and code blocks in both modes.

On smaller screens, preserve reading order, stack action groups when necessary and keep touch targets usable. Compact visuals must not make controls hard to operate. Let code and wide tables scroll within their containers, never the whole page. Do not automatically turn every interaction into a drawer; choose a mobile treatment that fits its task.

## Check the finished screen

Verify the main action, keyboard focus, long labels, realistic data, narrow layouts and both themes. Check alignment and spacing in the rendered screen. Use the project's existing checks and browser tools. A successful build does not establish visual balance.

## Further reading

Component inventory: ${homepage}/llms.txt
Component catalog: ${homepage}/components
Create a separate design system: ${homepage}/create
Creation and maintenance workflow: ${homepage}/skill.md
`;
}
