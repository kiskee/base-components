# Base Components

Dynamic component library for Next.js, documented with Storybook.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Storybook

This project uses [Storybook 10](https://storybook.js.org/) with the `@storybook/nextjs-vite` framework (the official builder for Next.js 16).

```bash
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # static build in storybook-static/
```

### How it's set up

- `.storybook/main.ts` — framework, addons, and story globs pointing to `components/**`
- `.storybook/preview.tsx` — imports `app/globals.css` so **Tailwind v4** works inside stories
- Addons: docs, accessibility (a11y), vitest, MCP, Chromatic
- Testing: Vitest + Playwright are configured (`vitest.config.ts`) — write `play` functions in stories and run them headless with `npx vitest storybook`

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

Storybook picks up new stories automatically — just restart `npm run storybook` if it was already running when you created the file.
