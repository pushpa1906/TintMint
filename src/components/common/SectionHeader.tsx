import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  as?: "h2" | "h3";
  action?: ReactNode;
}

/**
 * A consistent title + description pattern used to introduce a section of a
 * page (e.g. "Start color", "Your palette"). Optionally accepts an action
 * (like a button) aligned to the right.
 */
export default function SectionHeader({ title, description, as = "h2", action }: SectionHeaderProps) {
  const Heading = as;
  const headingClass =
    as === "h2"
      ? "text-[21px] font-semibold leading-[1.3] tracking-[-0.025em] text-ink dark:text-ink-dark md:text-[25px]"
      : "text-lg font-semibold text-ink dark:text-ink-dark";

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <Heading className={headingClass}>{title}</Heading>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-muted dark:text-muted-dark">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
