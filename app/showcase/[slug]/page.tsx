import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CodeBlock } from "@/components/showcase/CodeBlock";
import { CopyButton } from "@/components/showcase/CopyButton";
import { getComponentCode } from "@/lib/showcase-code";
import { components, getComponent, THEME_TOKENS } from "@/lib/showcase";

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) return { title: "Not found" };
  return {
    title: `${comp.name} — Base Components`,
    description: comp.description,
  };
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) notFound();

  const code = getComponentCode(comp.filePath);
  const installCommand = `npm install ${comp.dependencies.join(" ")}`;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{comp.name}</h1>
          <p className="mt-2 text-muted-foreground">{comp.description}</p>
        </div>
        <CopyButton code={code} />
      </div>

      {/* Live preview — all variations */}
      <section className="mt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Preview
        </h2>
        <div className="mt-3 space-y-8 rounded-lg border border-border bg-muted/30 p-8">
          {comp.demos.map((demo) => (
            <div key={demo.title}>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                {demo.title}
              </p>
              <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
                {demo.items.map((item) => {
                  const ItemComponent = comp.component;
                  return (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-2"
                    >
                      <ItemComponent {...item.props} />
                      <span className="text-xs text-muted-foreground">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="mt-8">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Requirements
        </h2>
        <div className="mt-3 space-y-4 rounded-lg border border-border bg-muted/20 p-4">
          <p className="text-sm">
            ⚠️ <strong>Tailwind CSS v4</strong> is required for styling.
          </p>
          <div>
            <p className="mb-2 text-sm font-medium">1. Install dependencies</p>
            <CodeBlock code={installCommand} lang="bash" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">
              2. Add theme tokens to your global CSS
            </p>
            <CodeBlock code={THEME_TOKENS} lang="css" filename="globals.css" />
          </div>
        </div>
      </section>

      {/* Source code */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Code
          </h2>
          <CopyButton code={code} />
        </div>
        <div className="mt-3">
          <CodeBlock
            code={code}
            lang="tsx"
            filename={`${comp.slug}.tsx`}
          />
        </div>
      </section>

      {/* Usage example */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Usage
          </h2>
          <CopyButton code={comp.usage} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Import the component and use it in your page:
        </p>
        <div className="mt-3">
          <CodeBlock
            code={comp.usage}
            lang="tsx"
            filename="app/page.tsx"
          />
        </div>
      </section>
    </div>
  );
}
