import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import PageContainer from "../components/layout/PageContainer";
import PaletteCard from "../components/palette/PaletteCard";
import { usePalette } from "../context/PaletteContext";

export default function SavedPage({ onOpen }: { onOpen: () => void }) {
  const p = usePalette();
  const [name, setName] = useState("My palette");

  return (
    <main>
      <PageContainer>
        <PageHeader
          title="Saved palettes"
          description="Palettes are saved only in this browser. No account is required."
        />

        <div className="flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input label="Palette name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <Button variant="primary" onClick={() => p.savePalette(name)}>
            Save current palette
          </Button>
        </div>

        <section className="mt-8 border-t border-line-strong pt-6 dark:border-line-strong-dark">
          {p.saved.length === 0 ? (
            <div className="py-12">
              <strong className="text-lg text-ink dark:text-ink-dark">No saved palettes yet.</strong>
              <p className="mt-1 text-[15px] text-muted dark:text-muted-dark">Name the current palette above and save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {p.saved.map((item) => (
                <PaletteCard
                  key={item.id}
                  palette={item}
                  onOpen={() => { p.openPalette(item.id); onOpen(); }}
                  onDelete={() => p.deletePalette(item.id)}
                />
              ))}
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
