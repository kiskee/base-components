import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";
import { components } from "@/lib/showcase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Base Components",
  description:
    "Dynamic component library for Next.js — browse, preview, and copy code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen">
          <aside className="hidden w-64 shrink-0 border-r border-border p-6 md:block">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
            >
              Base Components
            </Link>
            <nav className="mt-8 space-y-1">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Components
              </p>
              {components.map((c) => (
                <Link
                  key={c.slug}
                  href={`/showcase/${c.slug}`}
                  className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
            <div className="mt-10 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Copy &amp; paste components into your Next.js project. Requires
                Tailwind CSS v4.
              </p>
            </div>
          </aside>
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
