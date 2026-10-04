import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export async function CodeBlock({
  code,
  lang = "tsx",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      {filename && (
        <div className="flex items-center gap-2 border-b border-border bg-zinc-900 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
          </span>
          <span className="ml-1 font-mono text-xs text-zinc-400">
            {filename}
          </span>
        </div>
      )}
      <div
        className="overflow-x-auto bg-[#0d1117] [&_pre]:m-0 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
