import type { HTMLAttributes, ReactNode } from "react";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Vertical padding utility classes. Pass an empty string to disable. */
  padY?: string;
}

const HORIZONTAL_PADDING = "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10";

/**
 * The single source of truth for the application's horizontal page padding
 * and maximum content width. Every page and the navbar share this component
 * so content always lines up edge-to-edge across the app.
 */
export default function PageContainer({
  children,
  className = "",
  padY = "py-6 md:py-8 lg:py-10",
  ...rest
}: PageContainerProps) {
  return (
    <div className={[HORIZONTAL_PADDING, padY, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
