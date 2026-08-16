import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Visually hide the label while keeping it available to screen readers. */
  hideLabel?: boolean;
  helperText?: string;
  errorText?: string;
}

export default function Input({
  label,
  hideLabel = false,
  helperText,
  errorText,
  id,
  className = "",
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className={hideLabel ? "sr-only" : "text-sm font-medium text-ink dark:text-ink-dark"}
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={Boolean(errorText) || undefined}
        className={[
          "h-11 w-full rounded-md border bg-panel px-3 text-base text-ink placeholder:text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-panel-dark dark:text-ink-dark dark:placeholder:text-muted-dark",
          errorText ? "border-red-500 dark:border-red-400" : "border-field dark:border-field-dark",
          className,
        ].join(" ")}
        {...rest}
      />
      {helperText && !errorText && (
        <p id={helperId} className="text-sm text-muted dark:text-muted-dark">
          {helperText}
        </p>
      )}
      {errorText && (
        <p id={errorId} className="text-sm font-medium text-red-600 dark:text-red-400">
          {errorText}
        </p>
      )}
    </div>
  );
}
