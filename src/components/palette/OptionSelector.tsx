interface Option<T extends string> {
  name: T;
  meaning: string;
}

interface OptionSelectorProps<T extends string> {
  legend: string;
  description: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function OptionSelector<T extends string>({
  legend,
  description,
  options,
  value,
  onChange,
}: OptionSelectorProps<T>) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-lg font-semibold text-ink dark:text-ink-dark">
        {legend}
      </legend>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted dark:text-muted-dark">
        {description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const isSelected = value === option.name;

          return (
            <button
              type="button"
              key={option.name}
              aria-pressed={isSelected}
              onClick={() => onChange(option.name)}
              className={[
                /* Compact outlined card */
                "min-h-12 rounded-lg border px-4 py-3",
                "text-center text-[15px] font-semibold",

                /* Smooth interaction */
                "transition-[transform,border-color,background-color,box-shadow,color]",
                "duration-200 ease-out",

                /* Keyboard focus */
                "focus-visible:outline-none",
                "focus-visible:ring-[3px]",
                "focus-visible:ring-focus",
                "focus-visible:ring-offset-2",
                "focus-visible:ring-offset-canvas",
                "dark:focus-visible:ring-focus-dark",
                "dark:focus-visible:ring-offset-canvas-dark",

                /* Selected card */
                isSelected
                  ? [
                      "border-accent bg-[#e7f3f3] text-ink",
                      "shadow-[0_1px_4px_rgba(21,111,120,0.12)]",
                      "dark:border-accent-dark dark:bg-[#193539] dark:text-ink-dark",
                      "dark:shadow-none",
                    ].join(" ")
                  : [
                      "border-line bg-panel text-muted",
                      "enabled:hover:-translate-y-px",
                      "enabled:hover:border-line-strong",
                      "enabled:hover:bg-surface",
                      "enabled:hover:text-ink",

                      "dark:border-line-dark dark:bg-panel-dark dark:text-muted-dark",
                      "dark:enabled:hover:border-line-strong-dark",
                      "dark:enabled:hover:bg-surface-dark",
                      "dark:enabled:hover:text-ink-dark",
                    ].join(" "),

                /* Pressed state */
                "enabled:active:translate-y-0",
                "enabled:active:scale-[0.98]",

                /* Respect reduced-motion preference */
                "motion-reduce:transform-none",
                "motion-reduce:transition-none",
              ].join(" ")}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
