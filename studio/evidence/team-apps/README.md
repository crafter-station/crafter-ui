# Team CTA and three isolated apps

The homepage action "Use in my project" copies an origin-aware setup prompt. Verified browser feedback: "Prompt copied". The skill includes separate new-app and existing-project paths, preserves unrelated changes and avoids automatic overwrites in existing apps. `/starter.zip` packages source, tokens, the project skill and the setup command.

Three independent Next.js apps were created from that ZIP in `/Users/raillyhugo/Programming/crafter-station/crafter-ui-dogfood/`. Each has its own dependencies and build output. Their production servers remain local:

| App | URL | Browser verification |
| --- | --- | --- |
| Sprint | http://localhost:4341 | Created "Review launch checklist", reloaded, advanced it to In progress; saved task stage was 1. |
| Support | http://localhost:4342 | Saved a local reply, resolved conversation 2041, reloaded and verified both reply and status. |
| Expenses | http://localhost:4343 | Added a $25.50 expense, reloaded, approved it; totals updated. Theme preference also survived reload. |

All three passed production builds and Biome. Browser checks found no JavaScript exceptions. At 390px, all three have document width 390px; the Support mobile grid overflow found during testing was fixed. Each is open in a visible Chrome tab titled Crafter Sprint, Crafter Support and Crafter Expenses.

These are functional local product prototypes with fixture data and localStorage persistence, not connected multi-user services. They send no email and perform no payments.

Studio validation: 49 tests / 745 assertions, TypeScript and build passed. The two new tests verify the prompt's current-origin skill link and the actual starter ZIP contents, including all 76 components plus theme/starter entries.

The screenshots alongside this report show the common Crafter theme across three different product layouts.
