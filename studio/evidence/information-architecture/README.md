# Library information architecture

Local iteration requested after the first release. Not pushed or deployed.

- `/`: showcase home with working primitive and Crafter examples.
- `/docs`: introduction, atomic-design model, installation and ownership.
- `/components`: searchable sidebar and grouped index.
- `/components/shadcn/{name}`: seven installed Base UI primitives.
- `/components/crafter/{name}`: six Crafter components, grouped into atoms, molecules and organisms.
- `/create`: the existing library builder and ZIP download.
- `/extract`: standalone local extractor.

Component pages include preview, usage, actual source, install command, composition links, theme comparison, dark mode, reset, and adjacent navigation. Classification describes responsibility, not DOM-node count. Templates and pages are described as future compositions, not empty catalog categories.

References: the supplied shadcn home screenshot and live ui.kitze.io documentation sidebar. Crafter monochrome styling is retained. Upstream Base UI documentation URLs were checked through shadcn 4.21.0 docs.

Verification: all 13 component routes prerender in the production build. Existing 34 tests pass, as do TypeScript and Biome. Browser checks covered mobile sidebar opening/search/navigation/closing, actual source display, theme changes, dark dialog portal styling, Escape dismissal, and ZIP download from `/create`. Code panes scroll internally at 390px without widening the page. Desktop and mobile component-page axe checks show 0 violations, 37 passing rules, and 0 incomplete rules.
