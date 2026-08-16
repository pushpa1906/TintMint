import type { HTMLAttributes, ReactNode } from "react";

type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

/**
 * A subtly bordered panel used only where grouping content actually helps
 * (e.g. a saved palette). Not used as a wrapper for every element — most of
 * TintMint's layout relies on spacing and dividers instead of cards.
 */
export default function Card({ children, padding = "md", className = "", ...rest }: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-line bg-panel dark:border-line-dark dark:bg-panel-dark",
        paddingClasses[padding],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
