import Link from "next/link";
import { RbcBadge } from "@/components/ui/rbc-badge";
import { RbcButton } from "@/components/ui/rbc-button";
import { studioNavItems } from "@/lib/navigation/studio-nav";

const workflow = [
  {
    title: "Define brand foundations",
    description: "Set naming, logo mark text, and palette values for the workspace.",
  },
  {
    title: "Tune validated tokens",
    description: "Adjust theme colors and radii through the token engine.",
  },
  {
    title: "Build reusable UI",
    description: "Configure components and design layouts on the canvas.",
  },
  {
    title: "Review generated artifacts",
    description: "Export brand, theme, component, and canvas code from one place.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_45%,#f8fafc_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.14),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_48%,#020617_100%)] dark:text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-[conic-gradient(from_180deg,#ff0080,#7928ca,#2afadf,#ff0080)] text-xs font-black text-white shadow-xl shadow-indigo-500/20">
            RBC
          </div>

          <div>
            <p className="text-sm font-black tracking-tight">RainbowCode</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Design-to-code workspace
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
          <a href="#workflow" className="hover:text-slate-950 dark:hover:text-white">
            Workflow
          </a>
          <a href="#studios" className="hover:text-slate-950 dark:hover:text-white">
            Studios
          </a>
        </nav>

        <Link href="/studio">
          <RbcButton variant="primary">Open Studio</RbcButton>
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-8 lg:pb-24 lg:pt-16">
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <RbcBadge variant="info">Production workspace</RbcBadge>
            <RbcBadge variant="neutral">Local-first state</RbcBadge>
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-[-0.06em] text-slate-950 dark:text-white sm:text-7xl">
            Build the design system and the codebase together.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            RainbowCode brings brand, theme, components, canvas layouts, and
            generated artifacts into one studio so the visual system and the
            exported code stay in sync.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/studio">
              <RbcButton variant="primary" className="min-h-12 px-6">
                Open Workspace
              </RbcButton>
            </Link>

            <a href="#studios">
              <RbcButton variant="secondary" className="min-h-12 px-6">
                Explore Studios
              </RbcButton>
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[42px] bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-slate-950 shadow-[0_34px_120px_rgba(15,23,42,0.28)] dark:border-white/10">
            <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.03] px-4">
              <div className="flex gap-2">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
              </div>

              <span className="text-xs font-semibold text-slate-400">
                rainbowcode studio
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[170px_minmax(0,1fr)]">
              <aside className="border-b border-white/10 bg-white/[0.02] p-4 lg:border-b-0 lg:border-r">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Studios
                </p>

                <div className="mt-4 space-y-2">
                  {studioNavItems.slice(1).map((item, index) => (
                    <div
                      key={item.href}
                      className={`rounded-2xl border px-3 py-2 text-sm ${
                        index === 3
                          ? "border-indigo-400/50 bg-indigo-500/20 text-white"
                          : "border-white/10 text-slate-400"
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-4">
                <div className="rounded-[28px] bg-white p-4">
                  <div className="relative h-[360px] overflow-hidden rounded-[22px] bg-slate-50">
                    <div className="absolute left-8 top-8 h-52 w-72 rounded-[28px] bg-indigo-600 shadow-xl" />
                    <div className="absolute left-14 top-16 h-8 w-52 rounded-xl bg-white/90" />
                    <div className="absolute left-14 top-32 h-5 w-44 rounded-xl bg-white/60" />
                    <div className="absolute left-14 top-48 h-12 w-36 rounded-2xl bg-slate-950" />
                    <div className="absolute right-8 bottom-8 h-40 w-48 rounded-[28px] border border-slate-200 bg-white shadow-xl" />
                    <div className="absolute right-14 bottom-28 h-5 w-28 rounded-xl bg-slate-200" />
                    <div className="absolute right-14 bottom-20 h-8 w-32 rounded-xl bg-indigo-100" />
                  </div>
                </div>

                <pre className="mt-4 max-h-52 overflow-auto rounded-[24px] border border-white/10 bg-black/40 p-4 text-xs leading-6 text-slate-200">
                  <code>{`export function RainbowCanvas() {
  return (
    <section className="rounded-3xl bg-[var(--color-primary)]">
      <h1>Design system workspace</h1>
    </section>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <div className="max-w-2xl">
          <RbcBadge variant="info">Workflow</RbcBadge>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            One workspace from visual system to export.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {workflow.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[30px] border border-white/70 bg-white/72 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
                {index + 1}
              </span>

              <h3 className="mt-5 text-base font-black text-slate-950 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="studios"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <RbcBadge variant="success">Studios</RbcBadge>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Each product area maps to a real route in the app.
            </h2>
          </div>

          <Link href="/studio">
            <RbcButton variant="primary">Open Studio</RbcButton>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {studioNavItems.map((studio) => (
            <article
              key={studio.href}
              className="rounded-[30px] border border-white/70 bg-white/72 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/60"
            >
              <RbcBadge variant={studio.studio === "overview" ? "neutral" : "info"}>
                {studio.label}
              </RbcBadge>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {studio.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
