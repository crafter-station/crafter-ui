# Full component catalog, local preview

Reference checked September 7, 2026: https://ui.shadcn.com/docs/components

All 64 entries from the official component index have local documentation routes, real React examples, usage and source. Includes the new chat components and Questionnaire. Date Picker, Data Table and Typography are documented compositions, with their example source shown directly. The upstream registry was installed with the shadcn CLI using Base UI, preserving existing components. Adapted examples came from the corresponding official registry example items. The upstream MIT license is in THIRD_PARTY_LICENSES.md.

Crafter now includes 12 components. Additions: Status Indicator and Keyboard Shortcut (atoms), Search Field and Member Item (molecules), Project Card and Notification Preferences (organisms). They are included in the registry exporter and source dependency collection.

Input focus uses one 1px ring instead of a 3px ring plus a global outline. Site, previews, charts, sidebar and exported styles share Crafter tokens. Portalled previews inherit the dark preview palette. Sidebar groups can be collapsed.

Verification: all 64 foundation pages opened in the browser. Message Scroller's missing provider was found and fixed. The 76 component routes prerender. Mobile checks at 390px covered Calendar, Chart, Combobox, Data Table, Date Picker, Drawer, Navigation Menu, Questionnaire, Sidebar, Table and Message Scroller. Navigation Menu overflow was found and fixed. Notification Preferences saves successfully and passes axe with zero violations. Dark Select popup renders rgb(28, 28, 28) with square corners. 36 tests pass, including the official catalog inventory and portable export dependency checks. Biome and TypeScript pass.

Local only. No deployment or push.
