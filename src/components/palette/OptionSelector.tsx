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

/**
 * Generic labeled option picker with an inline explanation of the selected
 * choice. Powers both the Relationship and Theme selectors on the Create
 * page — they differ only in their data, not their behavior.
 */
export default function OptionSelector<T extends string>({
  legend,
  description,
  options,
  value,
  onChange,
}: OptionSelectorProps<T>) {
  const selected = options.find((option) => option.name === value) ?? options[0];

  return (
    <fieldset className="border-0 p-0">
      <legend className="text-lg font-semibold text-ink dark:text-ink-dark">{legend}</legend>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted dark:text-muted-dark">{description}</p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {options.map((option) => (
          <button
            type="button"
            key={option.name}
            aria-pressed={value === option.name}
            onClick={() => onChange(option.name)}
            className={[
              "rounded-t-sm border-b-2 pb-1 text-base font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              value === option.name
                ? "border-ink text-ink dark:border-ink-dark dark:text-ink-dark"
                : "border-transparent text-muted hover:border-line-strong hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark",
            ].join(" ")}
          >
            {option.name}
          </button>
        ))}
      </div>

      <div className="mt-4 max-w-2xl border-l-2 border-line-strong pl-4 dark:border-line-strong-dark" aria-live="polite">
        <p className="text-base font-semibold text-ink dark:text-ink-dark">{selected.name}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-muted dark:text-muted-dark">{selected.meaning}</p>
      </div>
    </fieldset>
  );
}
