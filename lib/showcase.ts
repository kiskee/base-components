import { Button } from "@/components/Button";
import type { ComponentType } from "react";

export interface ShowcaseDemoItem {
  label: string;
  props: Record<string, unknown>;
}

export interface ShowcaseDemo {
  title: string;
  items: ShowcaseDemoItem[];
}

export interface ShowcaseComponent {
  slug: string;
  name: string;
  description: string;
  component: ComponentType<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  demos: ShowcaseDemo[];
  filePath: string;
  dependencies: string[];
  /** Code example showing how to import and use the component in a Next.js app */
  usage: string;
}

export const THEME_TOKENS = `@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.145 0 0);
  --color-primary: oklch(0.205 0 0);
  --color-primary-foreground: oklch(0.985 0 0);
  --color-secondary: oklch(0.97 0 0);
  --color-secondary-foreground: oklch(0.205 0 0);
  --color-accent: oklch(0.97 0 0);
  --color-accent-foreground: oklch(0.205 0 0);
  --color-destructive: oklch(0.577 0.245 27.325);
  --color-destructive-foreground: oklch(0.985 0 0);
  --color-input: oklch(0.922 0 0);
  --color-ring: oklch(0.708 0 0);
  --radius: 0.5rem;
}`;

export const components: ShowcaseComponent[] = [
  {
    slug: "button",
    name: "Button",
    description:
      "A versatile button with multiple variants, sizes, loading state, and full form support.",
    component: Button,
    defaultProps: {
      children: "Button",
      variant: "primary",
      size: "md",
    },
    demos: [
      {
        title: "Variants",
        items: [
          {
            label: "Primary",
            props: { children: "Primary", variant: "primary" },
          },
          {
            label: "Secondary",
            props: { children: "Secondary", variant: "secondary" },
          },
          { label: "Ghost", props: { children: "Ghost", variant: "ghost" } },
          {
            label: "Destructive",
            props: { children: "Destructive", variant: "destructive" },
          },
          {
            label: "Outline",
            props: { children: "Outline", variant: "outline" },
          },
        ],
      },
      {
        title: "Sizes",
        items: [
          { label: "Small", props: { children: "Small", size: "sm" } },
          { label: "Medium", props: { children: "Medium", size: "md" } },
          { label: "Large", props: { children: "Large", size: "lg" } },
        ],
      },
      {
        title: "States",
        items: [
          {
            label: "Loading",
            props: { children: "Saving...", loading: true },
          },
          {
            label: "Disabled",
            props: { children: "Disabled", disabled: true },
          },
        ],
      },
    ],
    filePath: "Button/Button.tsx",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    usage: `import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex gap-2">
      <Button>Click me</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive" onClick={() => console.log("Deleted!")}>
        Delete
      </Button>
      <Button type="submit" loading={false}>
        Save
      </Button>
    </div>
  );
}`,
  },
];

export function getComponent(slug: string): ShowcaseComponent | undefined {
  return components.find((c) => c.slug === slug);
}
