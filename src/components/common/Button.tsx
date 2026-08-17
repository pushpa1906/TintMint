import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[15px]",
  lg: "h-12 px-6 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  /* Main teal button */
  primary: [
    "border border-transparent",
    "bg-accent text-white",

    /* Default shadow */
    "shadow-[0_2px_6px_rgba(8,184,178,0.24)]",

    /* Hover */
    "enabled:hover:-translate-y-0.5",
    "enabled:hover:bg-accent-hover",
    "enabled:hover:shadow-[0_6px_14px_rgba(8,184,178,0.32)]",

    /* Active/pressed */
    "enabled:active:translate-y-0",
    "enabled:active:scale-[0.98]",
    "enabled:active:bg-accent-active",
    "enabled:active:shadow-[0_1px_3px_rgba(8,184,178,0.22)]",

    /* Dark theme */
    "dark:bg-accent-dark",
    "dark:text-canvas-dark",
    "dark:shadow-[0_2px_8px_rgba(31,208,202,0.20)]",

    /* Dark-theme hover */
    "dark:enabled:hover:bg-accent-dark-hover",
    "dark:enabled:hover:shadow-[0_6px_16px_rgba(31,208,202,0.28)]",

    /* Dark-theme active */
    "dark:enabled:active:bg-accent-dark-active",
    "dark:enabled:active:shadow-[0_1px_4px_rgba(31,208,202,0.18)]",
  ].join(" "),

  /* Neutral secondary button */
  secondary: [
    "border border-field",
    "bg-panel text-ink",

    /* Default shadow */
    "shadow-[0_1px_3px_rgba(34,34,34,0.10)]",

    /* Hover */
    "enabled:hover:-translate-y-0.5",
    "enabled:hover:border-line-strong",
    "enabled:hover:bg-surface",
    "enabled:hover:shadow-[0_4px_10px_rgba(34,34,34,0.14)]",

    /* Active/pressed */
    "enabled:active:translate-y-0",
    "enabled:active:scale-[0.98]",
    "enabled:active:bg-line",
    "enabled:active:shadow-[0_1px_2px_rgba(34,34,34,0.10)]",

    /* Dark theme */
    "dark:border-field-dark",
    "dark:bg-panel-dark",
    "dark:text-ink-dark",
    "dark:shadow-[0_1px_4px_rgba(0,0,0,0.28)]",

    /* Dark-theme hover */
    "dark:enabled:hover:border-line-strong-dark",
    "dark:enabled:hover:bg-surface-dark",
    "dark:enabled:hover:shadow-[0_4px_12px_rgba(0,0,0,0.36)]",

    /* Dark-theme active */
    "dark:enabled:active:bg-line-dark",
    "dark:enabled:active:shadow-[0_1px_3px_rgba(0,0,0,0.24)]",
  ].join(" "),

  /* Transparent button with a visible border */
  ghost: [
    "border border-line-strong",
    "bg-transparent text-ink",

    /* Subtle default shadow */
    "shadow-[0_1px_3px_rgba(34,34,34,0.08)]",

    /* Hover */
    "enabled:hover:-translate-y-0.5",
    "enabled:hover:border-ink",
    "enabled:hover:bg-surface",
    "enabled:hover:shadow-[0_4px_10px_rgba(34,34,34,0.13)]",

    /* Active/pressed */
    "enabled:active:translate-y-0",
    "enabled:active:scale-[0.98]",
    "enabled:active:border-ink",
    "enabled:active:bg-line",
    "enabled:active:shadow-[0_1px_2px_rgba(34,34,34,0.08)]",

    /* Dark theme */
    "dark:border-line-strong-dark",
    "dark:text-ink-dark",
    "dark:shadow-[0_1px_4px_rgba(0,0,0,0.24)]",

    /* Dark-theme hover */
    "dark:enabled:hover:border-ink-dark",
    "dark:enabled:hover:bg-surface-dark",
    "dark:enabled:hover:shadow-[0_4px_12px_rgba(0,0,0,0.34)]",

    /* Dark-theme active */
    "dark:enabled:active:border-ink-dark",
    "dark:enabled:active:bg-line-dark",
    "dark:enabled:active:shadow-[0_1px_3px_rgba(0,0,0,0.22)]",
  ].join(" "),
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        /* Basic button layout */
        "inline-flex items-center justify-center gap-2",
        "rounded-md font-semibold",

        /* Interaction animation */
        "transition-[transform,background-color,border-color,box-shadow,color]",
        "duration-200 ease-out",

        /* Visible keyboard focus */
        "focus-visible:outline-none",
        "focus-visible:ring-[3px]",
        "focus-visible:ring-focus",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-canvas",
        "dark:focus-visible:ring-focus-dark",
        "dark:focus-visible:ring-offset-canvas-dark",

        /* Disabled button */
        "disabled:cursor-not-allowed",
        "disabled:opacity-45",
        "disabled:shadow-none",

        /* Reduced-motion accessibility */
        "motion-reduce:transform-none",
        "motion-reduce:transition-none",

        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
} 