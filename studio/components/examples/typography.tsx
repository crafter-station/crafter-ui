export default function Preview() {
  return (
    <div className="grid gap-5">
      <h1 className="text-3xl font-semibold tracking-tight">Good defaults.</h1>
      <h2 className="text-xl font-medium">Your fingerprints.</h2>
      <p className="text-sm leading-7">
        A shared type scale gives every component a familiar voice. Build
        something small, then make it your own.
      </p>
      <blockquote className="border-l-2 pl-4 text-muted-foreground">
        The details make the difference.
      </blockquote>
      <code className="rounded bg-muted px-2 py-1 text-sm">bun run dev</code>
      <small className="text-muted-foreground">Made at Crafter Station</small>
    </div>
  );
}
