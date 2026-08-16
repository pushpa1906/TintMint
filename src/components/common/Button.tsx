import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const boxSize: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[15px]",
  lg: "h-12 px-6 text-base",
};

const ghostTextSize: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-[15px]",
  lg: "text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-ink/85 dark:bg-ink-dark dark:text-canvas-dark dark:hover:bg-white",
  secondary:
    "border border-field bg-panel text-ink hover:bg-surface dark:border-field-dark dark:bg-panel-dark dark:text-ink-dark dark:hover:bg-surface-dark",
  ghost:
    "h-auto min-h-9 bg-transparent px-0 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink dark:text-ink-dark dark:decoration-line-strong-dark dark:hover:decoration-ink-dark",
};

/**
 * The single reusable button used throughout TintMint. Three variants cover
 * every call to action in the app: primary (main actions), secondary
 * (bordered, lower emphasis) and ghost (inline text links).
 */
export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-canvas-dark",
        "disabled:cursor-not-allowed disabled:opacity-40",
        variant === "ghost" ? ghostTextSize[size] : boxSize[size],
        variantClasses[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
