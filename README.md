# Crafter UI

[Use Crafter UI](https://ui.crafter.run) · [Components](https://ui.crafter.run/components) · [Agent guide](https://ui.crafter.run/docs/agents) · [Style generator](https://ui.crafter.run/create)

76 components built on shadcn Base UI, with shared light/dark tokens and Crafter atoms, molecules and organisms.

## Start with your agent

Open [ui.crafter.run](https://ui.crafter.run), click **Use in my project**, and paste the prompt into your coding agent. It reads the [skill](https://ui.crafter.run/skill.md), inspects your project and sets up compatible components and tokens.

For a new app, the [starter ZIP](https://ui.crafter.run/starter.zip) includes the registry, theme and setup script. Extract it and run from its crafter-registry directory:

```sh
bun scripts/create-app.ts /absolute/path/to/my-app
```

The destination must be new. Existing projects should follow the skill to install selected components and review conflicts.

## Develop

The production app lives in [studio/](studio/README.md).

```sh
cd studio
bun install
bun run dev --port 4324
```

```sh
bun test lib
bun run check
bun run build
bun run typecheck
```

## Production

Vercel project: `crafter-station/crafter-ui`. Root directory: `studio`. Production branch: `main`. Install: `bun install --frozen-lockfile`. Build: `bun run build`.

The custom domain `ui.crafter.run` uses Spaceship DNS and Vercel HTTPS. Pushes to main deploy automatically. No application secrets are required for the library, registry or export routes. Theme drafts stay in the browser until exported.

The older application at the repository root is retained for reference; Vercel builds studio.
