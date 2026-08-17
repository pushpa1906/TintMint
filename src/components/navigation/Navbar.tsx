import PageContainer from "../layout/PageContainer";
import ThemeToggle from "./ThemeToggle";

export type Page = "create" | "mix" | "preview" | "saved" | "export";

const pages: { id: Page; label: string }[] = [
  { id: "create", label: "Create" },
  { id: "mix", label: "Mix" },
  { id: "preview", label: "Preview" },
  { id: "saved", label: "Saved" },
  { id: "export", label: "Export" },
];

interface NavbarProps {
  page: Page;
  onNavigate: (page: Page) => void;
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  page,
  onNavigate,
  dark,
  onToggleTheme,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-sm dark:border-line-dark dark:bg-canvas-dark/95">
      <PageContainer padY="">
        <div className="flex h-16 items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate("create")}
            aria-label="TintMint home"
            className="flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-canvas-dark"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-sm font-extrabold tracking-tight text-white shadow-sm dark:bg-accent-dark dark:text-canvas-dark">
              TM
            </span>

            <span className="text-xl font-bold tracking-[-0.02em]">
              <span className="text-ink dark:text-ink-dark">Tint</span>
              <span className="text-accent dark:text-accent-dark">Mint</span>
            </span>
          </button>

          <nav
            className="ml-auto hidden h-full items-center gap-6 md:flex"
            aria-label="Main navigation"
          >
            {pages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={page === item.id ? "page" : undefined}
                className={[
                  "flex h-full items-center border-b-2 px-0.5 text-base font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:focus-visible:ring-offset-canvas-dark",
                  page === item.id
                    ? "border-ink text-ink dark:border-ink-dark dark:text-ink-dark"
                    : "border-transparent text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center md:ml-0">
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          </div>
        </div>
      </PageContainer>

      <PageContainer padY="" className="md:hidden">
        <nav
          className="flex gap-5 overflow-x-auto border-t border-line py-2 dark:border-line-dark"
          aria-label="Mobile navigation"
        >
          {pages.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={page === item.id ? "page" : undefined}
              className={[
                "whitespace-nowrap py-1 text-[15px]",
                page === item.id
                  ? "font-semibold text-ink dark:text-ink-dark"
                  : "font-medium text-muted dark:text-muted-dark",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </PageContainer>
    </header>
  );
}
