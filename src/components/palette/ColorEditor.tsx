import { useEffect, useState } from "react";
import { generateShades, hexToHsl, hexToRgb, normalizeHex, readableText } from "../../utils/color";
import { useClipboard } from "../../hooks/useClipboard";
import Button from "../common/Button";
import ColorInput from "./ColorInput";

export default function ColorEditor({
  color, locked, onChange, onToggleLock, onRemove
}: {
  color: string;
  locked: boolean;
  onChange: (value: string) => void;
  onToggleLock: () => void;
  onRemove: () => void;
}) {
  const [draft, setDraft] = useState(color);
  const { copy, message } = useClipboard();
  const valid = normalizeHex(color) ?? "#08B8B2";
  const rgb = hexToRgb(valid);
  const hsl = hexToHsl(valid);
  const labels = ["50","100","200","300","400","500","600","700","800","900"];

  useEffect(() => setDraft(color), [color]);

  return (
    <section className="border-t border-line py-6 dark:border-line-dark">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold text-ink dark:text-ink-dark">Edit color</h2>
          <p className="mt-1 text-[15px] text-muted dark:text-muted-dark">
            Change it, copy it, or lock it before generating again.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <ColorInput
            label="Selected color"
            value={draft}
            onChange={(next) => {
              setDraft(next);
              const valid2 = normalizeHex(next);
              if (valid2) onChange(valid2);
            }}
          />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => copy(valid, valid)}>Copy</Button>
            <Button variant="ghost" size="sm" onClick={onToggleLock}>{locked ? "Unlock" : "Lock"}</Button>
            <Button variant="ghost" size="sm" onClick={onRemove}>Remove</Button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted dark:text-muted-dark">
        <span>RGB {rgb.r}, {rgb.g}, {rgb.b}</span>
        <span>HSL {Math.round(hsl.h)}°, {Math.round(hsl.s)}%, {Math.round(hsl.l)}%</span>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-ink dark:text-ink-dark">Shades</h3>
        <p className="mt-1 text-sm text-muted dark:text-muted-dark">
          Lighter and darker versions of this color. Click a shade to copy it.
        </p>

        <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-md border border-line-strong sm:grid-cols-5 dark:border-line-strong-dark">
          {generateShades(valid).map((shade, index) => (
            <button
              type="button"
              key={shade}
              onClick={() => copy(shade, `shade ${labels[index]}`)}
              aria-label={`Copy shade ${labels[index]} ${shade}`}
              style={{ backgroundColor: shade, color: readableText(shade) }}
              className="flex min-h-24 flex-col justify-between border-b border-r border-black/20 p-2 text-left last:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-current sm:[&:nth-child(5n)]:border-r-0 sm:[&:nth-child(n+6)]:border-b-0"
            >
              <strong className="text-sm">{labels[index]}</strong>
              <span className="font-mono text-xs">{shade}</span>
            </button>
          ))}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">{message}</span>
    </section>
  );
}
