import { useId } from "react";
import { normalizeHex } from "../../utils/color";

interface ColorInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Accessible label describing what this color controls, e.g. "Starting color". */
  label: string;
  fallback?: string;
  size?: "sm" | "md";
}

/**
 * A paired native color-picker swatch and HEX text field. Used anywhere a
 * person needs to choose or type an exact color (Create's starting color,
 * adding a new color, editing a selected color).
 */
export default function ColorInput({ value, onChange, label, fallback = "#08B8B2", size = "md" }: ColorInputProps) {
  const id = useId();
  const valid = normalizeHex(value) ?? fallback;
  const swatchSize = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const fieldHeight = size === "sm" ? "h-10" : "h-12";
  const textWidth = size === "sm" ? "w-28" : "w-36";

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={`${id}-picker`}>
        {label} picker
      </label>
      <input
        id={`${id}-picker`}
        type="color"
        value={valid.toLowerCase()}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        className={[
          "cursor-pointer rounded-md border border-field bg-panel dark:border-field-dark dark:bg-panel-dark",
          swatchSize,
        ].join(" ")}
      />

      <label className="sr-only" htmlFor={`${id}-hex`}>
        {label} HEX
      </label>
      <input
        id={`${id}-hex`}
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        onBlur={(event) => {
          const next = normalizeHex(event.target.value);
          if (next) onChange(next);
        }}
        className={[
          "rounded-md border border-field bg-panel px-3 font-mono text-base font-semibold uppercase text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "dark:border-field-dark dark:bg-panel-dark dark:text-ink-dark",
          fieldHeight,
          textWidth,
        ].join(" ")}
      />
    </div>
  );
}
