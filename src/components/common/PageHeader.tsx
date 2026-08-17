interface PageHeaderProps {
  title: string;
  description: string;
}

/** The large title + intro copy shown at the top of every page. */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl md:mb-10">
      <h1 className="text-[clamp(2.25rem,4vw,3.25rem)] font-[720] leading-[1.08] tracking-[-0.04em] text-ink dark:text-ink-dark">
        {title}
      </h1>
      <p className="mt-4 text-[17px] leading-[1.6] text-muted dark:text-muted-dark md:text-[19px]">
        {description}
      </p>
    </div>
  );
}
