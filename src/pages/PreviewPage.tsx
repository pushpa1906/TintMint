import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import PageContainer from "../components/layout/PageContainer";
import PaletteStrip from "../components/palette/PaletteStrip";
import AddColor from "../components/palette/AddColor";
import UIPreview from "../components/palette/UIPreview";
import RoleEditor from "../components/palette/RoleEditor";
import { usePalette } from "../context/PaletteContext";
import { suggestRoles } from "../utils/color";
import type { RoleKey, Roles } from "../types/palette";

export default function PreviewPage({ onNext }: { onNext: () => void }) {
  const p = usePalette();
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [appliedRoles, setAppliedRoles] = useState<Roles | null>(null);
  const [appliedSignature, setAppliedSignature] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const signature = p.colors.join("|");
  const changed = Boolean(appliedRoles) && signature !== appliedSignature;

  const apply = () => {
    const next = suggestRoles(p.colors);
    setAppliedRoles(next);
    p.setRoles(next);
    setAppliedSignature(signature);
  };

  const changeRole = (key: RoleKey, value: string) => {
    setAppliedRoles((current) => current ? { ...current, [key]: value } : current);
    p.setRoles((current) => ({ ...current, [key]: value }));
  };

  return (
    <main>
      <PageContainer>
        <PageHeader
          title="Preview your palette"
          description="Adjust your working palette first. When you're ready, apply it to see the colors in an example interface."
        />

        <section className="border-t border-line-strong pt-5 dark:border-line-strong-dark">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-ink-dark">Working palette</h2>
              <p className="mt-1 text-[15px] text-muted dark:text-muted-dark">Drag colors to rearrange them. Add, reorder or generate again before applying.</p>
            </div>
            <p className="text-sm font-medium text-muted dark:text-muted-dark">
              {appliedRoles ? (changed ? "Palette changed since last applied." : "✓ Palette applied.") : "Palette hasn't been applied yet."}
            </p>
          </div>

          <div className="mt-4">
            <PaletteStrip colors={p.colors} locked={p.locked} onSelect={p.setSelectedIndex} onLock={p.toggleLock} onRemove={p.removeColor} onMove={p.moveColor} />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
            <AddColor onAdd={p.addColor} disabled={p.colors.length >= 8} />
            <Button variant="ghost" size="sm" onClick={p.reorderLightToDark}>Reorder light → dark</Button>
            <Button variant="ghost" size="sm" onClick={p.generate}>Generate</Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 dark:border-line-dark">
            <p className="text-sm text-muted dark:text-muted-dark">{p.relationship} · {p.theme}</p>
            <Button variant="primary" onClick={apply}>
              {changed ? "Apply changes" : "Apply palette"}
            </Button>
          </div>
        </section>
      </PageContainer>

      <section className="border-y border-line bg-surface dark:border-line-dark dark:bg-surface-dark">
        <PageContainer padY="py-7 md:py-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-ink-dark">Example</h2>
              <p className="mt-1 text-sm text-muted dark:text-muted-dark">The example changes only when you apply the working palette.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setMode("desktop")} className={mode === "desktop" ? "border-b-2 border-current pb-1 text-sm font-semibold text-ink dark:text-ink-dark" : "pb-1 text-sm text-muted dark:text-muted-dark"}>Desktop</button>
              <button onClick={() => setMode("mobile")} className={mode === "mobile" ? "border-b-2 border-current pb-1 text-sm font-semibold text-ink dark:text-ink-dark" : "pb-1 text-sm text-muted dark:text-muted-dark"}>Mobile</button>
            </div>
          </div>

          {appliedRoles ? (
            <UIPreview roles={appliedRoles} mode={mode} />
          ) : (
            <div className="grid min-h-[300px] place-content-center rounded-lg border border-dashed border-line-strong bg-panel p-8 text-center dark:border-line-strong-dark dark:bg-panel-dark">
              <strong className="text-lg text-ink dark:text-ink-dark">No palette applied yet.</strong>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted dark:text-muted-dark">Use "Apply palette" above when you're ready to see your colors on the example website.</p>
            </div>
          )}
        </PageContainer>
      </section>

      {appliedRoles && (
        <PageContainer padY="py-7 md:py-8">
          <button
            onClick={() => setShowRoles((value) => !value)}
            aria-expanded={showRoles}
            className="flex w-full items-center justify-between border-t border-line py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-line-dark"
          >
            <span>
              <strong className="block text-base text-ink dark:text-ink-dark">Customize color roles</strong>
              <small className="text-sm text-muted dark:text-muted-dark">Choose which applied color is used for Primary, Background, Text and more.</small>
            </span>
            <span className="text-xl text-ink dark:text-ink-dark" aria-hidden="true">{showRoles ? "−" : "+"}</span>
          </button>

          {showRoles && <RoleEditor roles={appliedRoles} colors={p.colors} onChange={changeRole} />}

          <button
            onClick={() => setShowBalance((value) => !value)}
            aria-expanded={showBalance}
            className="flex w-full items-center justify-between border-y border-line py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-line-dark"
          >
            <span>
              <strong className="block text-base text-ink dark:text-ink-dark">60 / 30 / 10</strong>
              <small className="text-sm text-muted dark:text-muted-dark">A common guideline for dominant, supporting and accent color.</small>
            </span>
            <span className="text-xl text-ink dark:text-ink-dark" aria-hidden="true">{showBalance ? "−" : "+"}</span>
          </button>

          {showBalance && (
            <div className="py-5">
              <p className="mb-3 text-sm text-muted dark:text-muted-dark">60/30/10 is a design guideline, not a strict requirement.</p>
              <div className="flex h-28 overflow-hidden rounded-lg border border-line-strong dark:border-line-strong-dark">
                <div className="flex w-[60%] flex-col justify-between border-r border-black/20 p-3" style={{ background: appliedRoles.background }}><strong>60%</strong><span className="text-xs">Dominant</span></div>
                <div className="flex w-[30%] flex-col justify-between border-r border-black/20 p-3" style={{ background: appliedRoles.secondary }}><strong>30%</strong><span className="text-xs">Supporting</span></div>
                <div className="flex w-[10%] flex-col justify-between p-2" style={{ background: appliedRoles.primary }}><strong>10%</strong><span className="text-[10px] [writing-mode:vertical-rl]">Accent</span></div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[15px] text-muted dark:text-muted-dark">Next: export the palette for development.</p>
            <Button variant="ghost" onClick={onNext}>Go to Export →</Button>
          </div>
        </PageContainer>
      )}
    </main>
  );
}
