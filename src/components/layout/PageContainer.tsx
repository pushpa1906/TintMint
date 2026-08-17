import type { HTMLAttributes, ReactNode } from "react";

interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Vertical padding utility classes. Pass an empty string to disable. */
  padY?: string;
}

const HORIZONTAL_PADDING =
  "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 xl:px-12";

/**
 * The single source of truth for the application's horizontal page padding
 * and maximum content width. Every page and the navbar share this component
 * so content always lines up edge-to-edge across the app.
 */
export default function PageContainer({
  children,
  className = "",
  padY = "py-6 md:py-7 lg:py-8",
  ...rest
}: PageContainerProps) {
  return (
    <div className={[HORIZONTAL_PADDING, padY, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
