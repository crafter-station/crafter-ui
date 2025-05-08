export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Documentation</h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <h2>Installation</h2>
          <p>
            You can use CrafterUI components in your project by installing them directly using the shadcn CLI.
          </p>

          <h3>Prerequisites</h3>
          <p>
            CrafterUI works with React projects that use Tailwind CSS. Make sure you have both set up in your project.
          </p>

          <h3>Installing Components</h3>
          <p>
            To install a component from the CrafterUI registry, use the shadcn CLI:
          </p>

          <pre className="rounded-md bg-zinc-950 p-4 text-white overflow-x-auto">
            <code>
              npx shadcn@latest add https://crafterui.vercel.app/r/[component-name].json
            </code>
          </pre>

          <p>For example, to install the primary button component:</p>

          <pre className="rounded-md bg-zinc-950 p-4 text-white overflow-x-auto">
            <code>
              npx shadcn@latest add https://crafterui.vercel.app/r/primary-button.json
            </code>
          </pre>

          <h3>Available Components</h3>
          <p>
            You can find all available components in the <a href="/registry" className="underline decoration-dotted">registry</a>.
          </p>

          <h2>Customization</h2>
          <p>
            All components can be customized to match your brand. The components are built with Tailwind CSS, so you can easily modify them by changing the classes or updating your Tailwind config.
          </p>

          <h2>Contributing</h2>
          <p>
            If you'd like to contribute to CrafterUI, please visit our GitHub repository.
          </p>
        </div>
      </div>
    </div>
  )
} 