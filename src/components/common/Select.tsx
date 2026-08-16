import { useId } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  children: ReactNode;
}

export default function Select({
  label,
  hideLabel = false,
  helperText,
  id,
  className = "",
  children,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className={hideLabel ? "sr-only" : "text-sm font-medium text-ink dark:text-ink-dark"}
      >
        {label}
      </label>
      <select
        id={selectId}
        aria-describedby={helperId}
        className={[
          "h-11 rounded-md border border-field bg-panel px-3 text-base text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "dark:border-field-dark dark:bg-panel-dark dark:text-ink-dark",
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </select>
      {helperText && (
        <p id={helperId} className="text-sm text-muted dark:text-muted-dark">
          {helperText}
        </p>
      )}
    </div>
  );
}
