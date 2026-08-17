import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import PageContainer from "../components/layout/PageContainer";
import ColorPicker from "../components/palette/ColorPicker";
import RelationshipSelector from "../components/palette/RelationshipSelector";
import ThemeSelector from "../components/palette/ThemeSelector";
import PaletteStrip from "../components/palette/PaletteStrip";
import AddColor from "../components/palette/AddColor";
import ColorEditor from "../components/palette/ColorEditor";
import RelationshipPreview from "../components/palette/RelationshipPreview";
import { usePalette } from "../context/PaletteContext";

export default function CreatePage({ onNext }: { onNext: () => void }) {
  const p = usePalette();
  const [showEditor, setShowEditor] = useState(false);
  const selected = p.colors[p.selectedIndex];

  const randomColor = () => {
    const next = `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()}`;
    p.setBaseColor(next);
  };

  return (
    <main>
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-180">
            <PageHeader
              title="Create a palette"
              description="Start with one color. Choose a relationship and a theme, then generate a palette you can adjust."
            />

            <section className="py-5">
              <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">
                Start color
              </h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted dark:text-muted-dark">
                Pick a color or enter a HEX value.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <ColorPicker value={p.baseColor} onChange={p.setBaseColor} />
                <Button variant="ghost" onClick={randomColor}>
                  Random
                </Button>
              </div>
            </section>

            <section className="border-t border-line py-5 dark:border-line-dark">
              <RelationshipSelector
                value={p.relationship}
                onChange={p.setRelationship}
              />
            </section>

            <section className="border-t border-line py-5 dark:border-line-dark">
              <ThemeSelector value={p.theme} onChange={p.setTheme} />
            </section>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-5 dark:border-line-dark">
              <p className="text-sm text-muted dark:text-muted-dark">
                {p.relationship} · {p.theme}
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <RelationshipPreview
              baseColor={p.baseColor}
              relationship={p.relationship}
              theme={p.theme}
              onGenerate={p.generate}
            />
          </aside>
        </div>

        <section className="mt-7 border-t border-line-strong pt-6 dark:border-line-strong-dark">
          <SectionHeader
            title="Your palette"
            description="Drag colors to rearrange them. Click a color to edit it."
          />

          <div className="mt-4">
            <PaletteStrip
              colors={p.colors}
              locked={p.locked}
              selectedIndex={showEditor ? p.selectedIndex : undefined}
              onSelect={(index) => {
                p.setSelectedIndex(index);
                setShowEditor(true);
              }}
              onLock={p.toggleLock}
              onRemove={p.removeColor}
              onMove={p.moveColor}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
            <AddColor onAdd={p.addColor} disabled={p.colors.length >= 8} />
            <Button variant="ghost" size="sm" onClick={p.reorderLightToDark}>
              Reorder light → dark
            </Button>
            <Button variant="ghost" size="sm" onClick={p.generate}>
              Regenerate
            </Button>
          </div>
        </section>

        {showEditor && selected && (
          <ColorEditor
            color={selected}
            locked={p.locked[p.selectedIndex]}
            onChange={(value) => p.editColor(p.selectedIndex, value)}
            onToggleLock={() => p.toggleLock(p.selectedIndex)}
            onRemove={() => {
              p.removeColor(p.selectedIndex);
              setShowEditor(false);
            }}
          />
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 dark:border-line-dark">
          <p className="text-[15px] text-muted dark:text-muted-dark">
            Next: mix two colors from your palette.
          </p>
          <Button variant="ghost" onClick={onNext}>
            Go to Mix →
          </Button>
        </div>
      </PageContainer>
    </main>
  );
}
