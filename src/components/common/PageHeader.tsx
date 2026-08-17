interface PageHeaderProps {
  title: string;
  description: string;
}

/** The large title + intro copy shown at the top of every page. */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl md:mb-10">
      <h1 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] text-ink dark:text-ink-dark sm:text-[34px] md:text-[40px]">
        {title}
      </h1>

      <p className="mt-3 text-base leading-[1.6] text-muted dark:text-muted-dark md:text-[17px]">
        {description}
      </p>
    </div>
  );
}
