interface PageHeaderProps {
  title: string;
  description: string;
}

/** The large title + intro copy shown at the top of every page. */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 max-w-3xl md:mb-10">
      <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-ink dark:text-ink-dark sm:text-[32px] md:text-[38px]">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted dark:text-muted-dark md:text-[17px]">
        {description}
      </p>
    </div>
  );
}
