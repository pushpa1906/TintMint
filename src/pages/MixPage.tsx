import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Button from "../components/common/Button";
import PageContainer from "../components/layout/PageContainer";
import PaletteStrip from "../components/palette/PaletteStrip";
import { usePalette } from "../context/PaletteContext";
import { mixColors, readableText } from "../utils/color";

export default function MixPage({ onNext }: { onNext: () => void }) {
  const p = usePalette();
  const [a, setA] = useState(p.colors[0]);
  const [b, setB] = useState(p.colors[Math.min(3, p.colors.length - 1)]);
  const [percent, setPercent] = useState(50);
  const result = mixColors(a, b, percent);

  const drop = (setter: (value: string) => void) => (event: React.DragEvent) => {
    event.preventDefault();
    const color = event.dataTransfer.getData("text/tintmint-color");
    if (color) setter(color);
  };

  return (
    <main>
      <PageContainer>
        <PageHeader
          title="Mix colors"
          description="Drag two palette colors into the mixer, or choose them manually. Adjust the slider to control the blend."
        />

        <section>
          <h2 className="text-lg font-semibold text-ink dark:text-ink-dark">Your palette</h2>
          <p className="mt-1 text-sm text-muted dark:text-muted-dark">Drag a swatch into Color A or Color B.</p>
          <div className="mt-3">
            <PaletteStrip colors={p.colors} locked={p.locked} compact />
          </div>
        </section>

        <section className="mt-7 grid overflow-hidden rounded-lg border border-line-strong dark:border-line-strong-dark md:grid-cols-[1fr_320px_1fr]">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={drop(setA)}
            style={{ background: a, color: readableText(a) }}
            className="flex min-h-[260px] flex-col justify-between p-5"
          >
            <span className="text-sm font-semibold">Color A</span>
            <strong className="font-mono text-[26px]">{a}</strong>
            <input aria-label="Mixer color A" type="color" value={a.toLowerCase()} onChange={(event) => setA(event.target.value.toUpperCase())} className="h-11 w-11 rounded-md" />
            <span className="text-sm opacity-75">Drop a palette color here</span>
          </div>

          <div className="flex flex-col justify-center border-y border-line-strong bg-canvas p-6 text-center dark:border-line-strong-dark dark:bg-canvas-dark md:border-x md:border-y-0">
            <label htmlFor="mix-range" className="text-base font-semibold text-ink dark:text-ink-dark">How much Color B?</label>
            <strong className="mt-1 text-[28px] text-ink dark:text-ink-dark">{percent}%</strong>
            <input id="mix-range" type="range" min="0" max="100" value={percent} onChange={(event) => setPercent(Number(event.target.value))} className="mt-3 w-full accent-accent" />
            <div className="mt-1 flex justify-between text-sm text-muted dark:text-muted-dark"><span>100% A</span><span>100% B</span></div>

            <div className="mt-6 flex min-h-28 flex-col justify-between rounded-md border border-line-strong p-3 text-left dark:border-line-strong-dark" style={{ background: result, color: readableText(result) }}>
              <span className="text-sm font-semibold">Result</span>
              <strong className="font-mono text-xl">{result}</strong>
            </div>

            <Button variant="primary" className="mt-4" onClick={() => p.addColor(result)}>
              + Add to palette
            </Button>
          </div>

          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={drop(setB)}
            style={{ background: b, color: readableText(b) }}
            className="flex min-h-[260px] flex-col justify-between p-5"
          >
            <span className="text-sm font-semibold">Color B</span>
            <strong className="font-mono text-[26px]">{b}</strong>
            <input aria-label="Mixer color B" type="color" value={b.toLowerCase()} onChange={(event) => setB(event.target.value.toUpperCase())} className="h-11 w-11 rounded-md" />
            <span className="text-sm opacity-75">Drop a palette color here</span>
          </div>
        </section>

        <details className="mt-5 text-sm text-muted dark:text-muted-dark">
          <summary className="cursor-pointer font-medium text-ink dark:text-ink-dark">How does mixing work?</summary>
          <p className="mt-2 max-w-2xl leading-relaxed">TintMint interpolates the RGB values of both digital colors according to the selected percentage. It is not a simulation of physical paint mixing.</p>
        </details>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 dark:border-line-dark">
          <p className="text-[15px] text-muted dark:text-muted-dark">Next: apply your palette to an example interface.</p>
          <Button variant="ghost" onClick={onNext}>Go to Preview →</Button>
        </div>
      </PageContainer>
    </main>
  );
}
