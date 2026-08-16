interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeClasses: Record<"sm" | "md" | "lg", string> = {
  sm: "h-6 w-6",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

/** A small rounded color chip used wherever a color needs a simple visual reference. */
export default function ColorSwatch({ color, size = "md", label }: ColorSwatchProps) {
  return (
    <span
      role="img"
      aria-label={label ?? color}
      className={[
        "inline-block shrink-0 rounded-md border border-black/10 dark:border-white/15",
        sizeClasses[size],
      ].join(" ")}
      style={{ backgroundColor: color }}
    />
  );
}
