import fs from "node:fs";
import path from "node:path";

const CN_INLINE = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

/**
 * Reads a component source file and returns self-contained code:
 * the "@/lib/utils" import is replaced with an inline cn() definition
 * so the user can paste a single file into their project.
 *
 * The path is statically scoped to the components/ folder so Next.js
 * only traces that subdirectory for the build output.
 */
export function getComponentCode(componentPath: string): string {
  const fullPath = path.join(process.cwd(), "components", componentPath);
  const source = fs.readFileSync(fullPath, "utf-8");

  return source.replace(
    /import\s*{\s*cn\s*}\s*from\s*["']@\/lib\/utils["'];?/,
    CN_INLINE
  );
}
