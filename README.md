# Base Components

A dynamic component library for Next.js with a showcase site where you can preview each component live and copy its code straight into your project.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

The Next.js app is the showcase:

- **`/`** — home page with a grid of all components
- **`/showcase/[slug]`** — per-component page with:
  - a **live preview** rendered from the real component
  - a **requirements** section (Tailwind v4, npm dependencies, theme tokens)
  - the **full source code** (self-contained — `cn()` is inlined) with a **Copy** button

The user browses → picks a component → copies → pastes into their project. Done.

## Adding a new component

1. Create the component in `components/<Name>/<Name>.tsx` (self-contained styling via cva + `cn()` from `@/lib/utils`)
2. Register it in `lib/showcase.ts` (slug, name, description, default props for the preview, dependencies)
3. It appears automatically in the sidebar, home grid, and its showcase page

## Structure

```
app/
├── page.tsx                 ← home: component grid
└── showcase/[slug]/page.tsx ← per-component showcase page
components/
├── <Name>/<Name>.tsx        ← the actual components (source of truth)
└── showcase/                ← showcase site pieces (CopyButton, CodeBlock)
lib/
├── showcase.ts              ← component catalog
└── showcase-code.ts         ← reads source + inlines cn() for copy-paste
```

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- cva + clsx + tailwind-merge (component variants)
