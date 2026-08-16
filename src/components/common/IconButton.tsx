import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible name — IconButton has no visible text. */
  label: string;
  children: ReactNode;
  size?: "sm" | "md";
}

const dimensions: Record<"sm" | "md", string> = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
};

/**
 * Accessible icon-only button. Used for the theme toggle, copy, delete,
 * regenerate and other small toolbar actions.
 */
export default function IconButton({
  label,
  children,
  size = "md",
  className = "",
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-md text-ink transition-colors",
        "hover:bg-surface dark:text-ink-dark dark:hover:bg-surface-dark",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-canvas-dark",
        "disabled:cursor-not-allowed disabled:opacity-40",
        dimensions[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
