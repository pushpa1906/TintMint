import { useState } from "react";
import { readableText } from "../../utils/color";

type Props = {
  colors: string[];
  locked: boolean[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  onLock?: (index: number) => void;
  onRemove?: (index: number) => void;
  onMove?: (from: number, to: number) => void;
  compact?: boolean;
};

export default function PaletteStrip({
  colors, locked, selectedIndex, onSelect, onLock, onRemove, onMove, compact = false
}: Props) {
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);

  return (
    <div
      aria-label="Current palette"
      className={[
        "flex w-full overflow-hidden overflow-x-auto rounded-md border border-line-strong dark:border-line-strong-dark",
        compact ? "min-h-20" : "min-h-[220px]"
      ].join(" ")}
    >
      {colors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          draggable={Boolean(onMove)}
          onDragStart={(event) => {
            setDragging(index);
            event.dataTransfer.setData("text/tintmint-color", color);
            event.dataTransfer.setData("text/tintmint-index", String(index));
            event.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(event) => {
            if (!onMove) return;
            event.preventDefault();
            setOver(index);
          }}
          onDragLeave={() => setOver(null)}
          onDrop={(event) => {
            event.preventDefault();
            const from = Number(event.dataTransfer.getData("text/tintmint-index"));
            if (onMove && Number.isFinite(from)) onMove(from, index);
            setDragging(null);
            setOver(null);
          }}
          onDragEnd={() => {
            setDragging(null);
            setOver(null);
          }}
          style={{ backgroundColor: color, color: readableText(color) }}
          className={[
            "group relative flex min-w-[145px] flex-1 flex-col border-r border-black/25 last:border-r-0",
            compact ? "min-h-20" : "min-h-[220px]",
            selectedIndex === index ? "ring-3 ring-inset ring-current/70" : "",
            dragging === index ? "opacity-50" : "",
            over === index && dragging !== index ? "outline-3 outline-offset-[-5px] outline-current/60" : ""
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={`Select ${color}`}
            className="flex flex-1 cursor-grab flex-col items-start justify-end p-3 text-left active:cursor-grabbing focus-visible:outline-3 focus-visible:outline-offset-[-5px] focus-visible:outline-current"
          >
            <span className={compact ? "text-xs font-semibold" : "font-mono text-base font-semibold"}>
              {color}
            </span>
          </button>

          {!compact && (
            <div className="flex min-h-10 items-center gap-4 border-t border-current/45 px-3 text-sm opacity-90">
              <span className="mr-auto opacity-75" aria-hidden="true">drag ↔</span>
              <button
                type="button"
                aria-pressed={locked[index]}
                onClick={() => onLock?.(index)}
                className="min-h-10 underline decoration-current/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                {locked[index] ? "Locked" : "Lock"}
              </button>
              {colors.length > 3 && (
                <button
                  type="button"
                  onClick={() => onRemove?.(index)}
                  className="min-h-10 underline decoration-current/50 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  Remove
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
