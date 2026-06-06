export function Workspace() {
  return (
    <main className="min-h-0 flex-1 overflow-auto bg-white p-6 dark:bg-slate-950">
      <section
        aria-label="Main editing workspace"
        className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            RainbowCode Workspace
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
            This canvas region will power visual editing for logos, themes,
            components, pages, and design systems.
          </p>
        </div>
      </section>
    </main>
  );
}