## CrafterUI Registry

This project now includes a component registry powered by the shadcn registry format. The registry allows users to easily install components from this UI library in their own projects.

### Registry Structure

- `registry.json` - Main registry file that defines all available components
- `public/r/` - Directory containing individual registry item JSON files for each component
- `scripts/build-registry.js` - Script to generate the registry item files from the main registry.json
- `app/registry/` - Registry UI to browse and view components
- `app/registry/[component]/` - Individual component pages with preview and "Open in v0" button

### Adding to the Registry

1. Add your new component to `config/components.ts`
2. Add the component entry to `registry.json`
3. Run `npm run registry:generate` to generate the registry item files

### Using Components

Users can install components using the shadcn CLI:

```bash
npx shadcn@latest add https://crafterui.vercel.app/r/[component-name].json
```

### v0.dev Integration

Components include "Open in v0" buttons for easy customization on v0.dev.
