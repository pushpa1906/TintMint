import type { Roles } from "../../types/palette";

export default function UIPreview({
  roles, mode
}: { roles: Roles; mode: "desktop" | "mobile" }) {
  return (
    <div className={mode === "mobile" ? "mx-auto w-full max-w-[390px]" : "w-full"} aria-label={`${mode} live UI preview`}>
      <div className="min-h-[470px] overflow-hidden rounded-lg border border-line-strong dark:border-line-strong-dark" style={{ background: roles.background, color: roles.text }}>
        <nav className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: roles.border }}>
          <strong>Northstar</strong>
          <div className={mode === "mobile" ? "hidden" : "flex gap-5"}>
            <a style={{ color: roles.primary }}>Work</a>
            <a style={{ color: roles.mutedText }}>About</a>
          </div>
        </nav>

        <main className={mode === "mobile" ? "p-5" : "p-8 md:p-12"}>
          <p className="text-sm font-semibold" style={{ color: roles.secondary }}>Color in context</p>
          <h2 className={mode === "mobile"
            ? "mt-2 text-[38px] font-semibold leading-[1.05] tracking-[-0.04em]"
            : "mt-2 max-w-2xl text-[52px] font-semibold leading-[1.02] tracking-[-0.045em]"}>
            Design with confidence.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ color: roles.mutedText }}>
            See how your palette behaves before you move it into code.
          </p>

          <div className={mode === "mobile" ? "mt-6 flex flex-col gap-2" : "mt-6 flex gap-3"}>
            <button className="rounded-md px-4 py-3 font-semibold" style={{ background: roles.primary, color: roles.surface }}>Get started</button>
            <button className="rounded-md border px-4 py-3 font-semibold" style={{ borderColor: roles.secondary, color: roles.secondary }}>Learn more</button>
          </div>

          <section className="mt-7 max-w-xl rounded-lg border p-5" style={{ background: roles.surface, borderColor: roles.border }}>
            <label className="text-sm font-semibold">
              Email address
              <input
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-md border bg-transparent px-3 py-2.5 text-base"
                style={{ borderColor: roles.border, color: roles.text }}
              />
            </label>
            <a className="mt-4 block text-sm font-semibold underline" style={{ color: roles.primary }}>
              Read the documentation →
            </a>
            <div className="mt-5 border-t pt-4 text-sm" style={{ borderColor: roles.border, color: roles.mutedText }}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: roles.secondary }} />
              Palette ready
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
