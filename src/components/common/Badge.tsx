import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-surface text-muted dark:bg-surface-dark dark:text-muted-dark",
  success: "bg-accent/10 text-accent dark:bg-accent-dark/15 dark:text-accent-dark",
};

/** Small status pill, e.g. "Palette applied" or a relationship/theme tag. */
export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        toneClasses[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
