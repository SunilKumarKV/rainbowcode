import { ThemeDemo } from "@/components/theme-demo/theme-demo";

export function Workspace() {
  return (
    <main className="min-h-full bg-slate-100 p-4 dark:bg-slate-950 md:p-6">
      <section
        aria-label="Main editing workspace"
        className="min-h-[620px] rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6"
      >
        <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Canvas
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              RainbowCode Workspace
            </h1>
          </div>

          <div className="flex gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
              1440 × 900
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
              Live Preview
            </span>
          </div>
        </div>

        <div className="grid min-h-[500px] place-items-center rounded-3xl border border-dashed border-slate-300 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] p-6 dark:border-slate-700 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]">
          <ThemeDemo />
        </div>
      </section>
    </main>
  );
}