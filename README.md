# Base Components

Dynamic component library for Next.js, documented with Storybook.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Component structure

Each component lives in its own folder with its story colocated next to it:

```
components/
  <Component>/
    <Component>.tsx
    <Component>.stories.tsx
    index.ts
```

Imports use the `@/*` alias (configured in `tsconfig.json`), for example `@/components/Button`.
