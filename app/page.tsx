import Link from "next/link";

import { components } from "@/lib/showcase";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">Base Components</h1>
      <p className="mt-2 text-muted-foreground">
        A dynamic component library for Next.js. Browse components, preview
        them live, and copy the code straight into your project.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((c) => {
          const Preview = c.component;
          return (
            <Link
              key={c.slug}
              href={`/showcase/${c.slug}`}
              className="group rounded-lg border border-border p-6 transition-colors hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex h-28 items-center justify-center rounded-md bg-muted/40 p-4">
                <Preview {...c.defaultProps} />
              </div>
              <h2 className="mt-4 font-semibold transition-colors group-hover:text-primary">
                {c.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {c.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="font-semibold">How to use</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Pick a component and open its page — you&apos;ll see a live preview
            and the full source code.
          </li>
          <li>
            Check the requirements section: install the npm dependencies and add
            the theme tokens to your CSS.
          </li>
          <li>
            Hit <strong className="text-foreground">Copy</strong> and paste the
            code into your project. Done!
          </li>
        </ol>
      </div>
    </div>
  );
}
