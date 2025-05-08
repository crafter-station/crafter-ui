# CrafterUI Registry

CrafterUI is a collection of reusable UI components built with React, Tailwind CSS, and shadcn/ui.

## Using Components

You can use any component from the CrafterUI registry in your project by adding it via the shadcn CLI:

```bash
npx shadcn@latest add https://crafter-ui.vercel.app/r/<component-name>.json
```

For example, to add the Primary Button component:

```bash
npx shadcn@latest add https://crafter-ui.vercel.app/r/primary-button.json
```

## Available Components

Our registry includes the following components:

### Buttons
- `primary-button`: Main call-to-action button
- `secondary-button`: Alternative action button
- `neobrutalist-button`: Button with neobrutalist design style
- `loading-button`: Button with loading spinner
- `destructive-button`: Dangerous action button
- `bookmark-button`: Interactive bookmark button with state
- `icon-button-with-text`: Button with leading icon and text
- `copy-button`: Copy to clipboard with feedback
- `icon-only-button`: Button with only an icon
- `search-mode-button`: Toggle global search mode
- `voice-mode-button`: Toggle voice input mode
- `download-button`: Button for downloading files
- `link-button`: Button that looks like a link
- `suggested-teams-button`: Button with suggested teams
- `notification-button`: Button with notification badge
- `print-button`: Button for print action
- `filter-button`: Filter button with dropdown indicator
- `view-toggle-button`: Toggle between different view layouts
- `toggle-button`: Toggle switch button
- `property-button`: Property tag button with icon

### Login Buttons
- `apple-login-button`: Apple login button with icon
- `twitter-login-button`: Twitter/X login button with icon
- `github-login-button`: GitHub login button with icon
- `facebook-login-button`: Facebook login button with icon
- `google-login-button`: Google login button with icon
- `linkedin-login-button`: LinkedIn login button with icon
- `microsoft-login-button`: Microsoft login button with icon
- `twitch-login-button`: Twitch login button with icon

### Command Menus
- `raycast-command-menu`: Command menu with Raycast style
- `linear-command-menu`: Command menu with Linear style
- `vercel-command-menu`: Command menu with Vercel style
- `supabase-command-menu`: Command menu with Supabase style

## Integrating with v0.dev

All components in this registry can be opened directly in v0.dev for customization. Look for the "Open in v0" button when viewing a component.

## Contributing

If you'd like to contribute to CrafterUI, please visit our GitHub repository.

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui 