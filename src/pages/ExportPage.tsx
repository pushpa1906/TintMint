import { useMemo, useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import PageContainer from "../components/layout/PageContainer";
import { usePalette } from "../context/PaletteContext";
import { useClipboard } from "../hooks/useClipboard";

type Tab = "CSS" | "JSON" | "HEX";

export default function ExportPage() {
  const p = usePalette();
  const [tab, setTab] = useState<Tab>("CSS");
  const { copy, message } = useClipboard();

  const css = useMemo(() => `:root {
${Object.entries(p.roles).map(([key, value]) => `  --color-${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value.toLowerCase()};`).join("\n")}
}`, [p.roles]);

  const json = useMemo(() => JSON.stringify(p.roles, null, 2), [p.roles]);
  const hex = p.colors.join("\n");
  const output = tab === "CSS" ? css : tab === "JSON" ? json : hex;
  const query = new URLSearchParams(p.roles).toString();

  const download = () => {
    const extension = tab === "CSS" ? "css" : tab === "JSON" ? "json" : "txt";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tintmint-palette.${extension}`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <PageContainer>
        <PageHeader
          title="Export"
          description="Choose a format and copy or download your palette for use in your project."
        />

        <section className="overflow-hidden rounded-lg border border-field dark:border-field-dark">
          <div className="flex border-b border-line dark:border-line-dark" role="tablist" aria-label="Export format">
            {(["CSS","JSON","HEX"] as Tab[]).map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={[
                  "border-b-2 px-4 py-3 text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-canvas-dark",
                  tab === item
                    ? "border-ink text-ink dark:border-ink-dark dark:text-ink-dark"
                    : "border-transparent text-muted dark:text-muted-dark"
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-4 py-3 dark:border-line-dark">
            <strong className="text-base text-ink dark:text-ink-dark">{tab === "CSS" ? "CSS Variables" : tab}</strong>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" onClick={() => copy(output, tab)}>Copy</Button>
              <Button variant="ghost" size="sm" onClick={download}>Download</Button>
            </div>
          </div>

          <pre className="min-h-[260px] overflow-auto bg-surface p-5 font-mono text-sm leading-7 text-ink dark:bg-surface-dark dark:text-ink-dark">{output}</pre>
          <span className="sr-only" aria-live="polite">{message}</span>
        </section>

        <section className="mt-8 flex flex-col gap-4 border-y border-line py-5 dark:border-line-dark sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">Check accessibility with Contrastly</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted dark:text-muted-dark">
              Send your current UI role colors to the separate Contrastly project through URL query parameters.
            </p>
          </div>
          <a href={`https://contrastly.app/?${query}`} target="_blank" rel="noreferrer" className="shrink-0 text-[15px] font-semibold text-ink underline underline-offset-4 dark:text-ink-dark">
            Check in Contrastly →
          </a>
        </section>
      </PageContainer>
    </main>
  );
}
